import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import RecentOrders from './Dashboard/RecentOrders';
import TopSellingProduct from './Dashboard/TopSellingProduct';

const Index = () => {
    const dispatch = useDispatch();
    
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);    
    const [autheticated, setautheticated] = useState(false);
    const navigate = useNavigate(); 

    if(!autheticated){
        const storedName = localStorage.getItem('aAuthToken');
        if (storedName != "") {
            setautheticated(true);
            //const decoded = jwtDecode(storedName);            
            // if(userId == 0){
            //     setUserData(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            // }
        } 
    }
    
    useEffect(() => {
        dispatch(setPageTitle('Sales Admin'));
        if(!autheticated){
            navigate('/auth');
        }
    });
    
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                {/* <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Sales</span>
                </li> */}
            </ul>
            

            <div className="pt-5">
                {/* <div className="grid xl:grid-cols-3 gap-6 mb-6">
                    <Revenue></Revenue>
                    <SalesbyCategory></SalesbyCategory>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                   <DailySales></DailySales>
                    <Summary></Summary>
                    <TotalOrderChart></TotalOrderChart>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                    <RecentActivities></RecentActivities>
                    <Transactions></Transactions>
                    <WalletBalance></WalletBalance>
                </div> */}

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    <RecentOrders></RecentOrders>
                    <TopSellingProduct></TopSellingProduct>
                </div>
            </div>
        </div>
    );
};

export default Index;
