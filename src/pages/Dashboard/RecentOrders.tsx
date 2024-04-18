import { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import Dropdown from "../../components/Dropdown";
import IconHorizontalDots from "../../components/Icon/IconHorizontalDots";
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "../../store";
import { Link, useNavigate } from 'react-router-dom';

const RecentOrders = () => {
    const dispatch = useDispatch();
    
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [loading] = useState(false); 

     
    
    return ( 
        <div className="panel h-full w-full">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Recent Orders</h5>
                        </div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">Customer</th>
                                        <th>Product</th>
                                        <th>Invoice</th>
                                        <th>Price</th>
                                        <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-6.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Luke Ivory</span>
                                            </div>
                                        </td>
                                        <td className="text-primary">Headphone</td>
                                        <td>
                                            <Link to="/apps/invoice/preview">#46894</Link>
                                        </td>
                                        <td>$56.07</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-7.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Andy King</span>
                                            </div>
                                        </td>
                                        <td className="text-info">Nike Sport</td>
                                        <td>
                                            <Link to="/apps/invoice/preview">#76894</Link>
                                        </td>
                                        <td>$126.04</td>
                                        <td>
                                            <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Shipped</span>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-8.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Laurie Fox</span>
                                            </div>
                                        </td>
                                        <td className="text-warning">Sunglasses</td>
                                        <td>
                                            <Link to="/apps/invoice/preview">#66894</Link>
                                        </td>
                                        <td>$56.07</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-9.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Ryan Collins</span>
                                            </div>
                                        </td>
                                        <td className="text-danger">Sport</td>
                                        <td>
                                            <Link to="/apps/invoice/preview">#75844</Link>
                                        </td>
                                        <td>$110.00</td>
                                        <td>
                                            <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Shipped</span>
                                        </td>
                                    </tr>
                                    <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="text-black dark:text-white">
                                            <div className="flex items-center">
                                                <img className="w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 object-cover" src="/assets/images/profile-10.jpeg" alt="avatar" />
                                                <span className="whitespace-nowrap">Irene Collins</span>
                                            </div>
                                        </td>
                                        <td className="text-secondary">Speakers</td>
                                        <td>
                                            <Link to="/apps/invoice/preview">#46894</Link>
                                        </td>
                                        <td>$56.07</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
    );
}

export default RecentOrders;