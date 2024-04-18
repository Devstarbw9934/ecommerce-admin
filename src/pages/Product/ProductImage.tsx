import axios from 'axios';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { downloadExcel } from 'react-export-table-to-excel';
import { useDispatch } from 'react-redux';

import CreateProductModal from '../../components/Product/CreateProductModal';
import EditProductImage from '../../components/Product/EditProductImage';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';
import IconPlus from '../../components/Icon/IconPlus';
import IconGallery from '../../components/Icon/IconGallery';
import { apiURL, imageURL } from '../../components/Utile/urls';

const col = ['Product Number', 'Name', 'Description', 'Price', 'Width', 'Weight', 'Fit', 'Thickness', 'Eternity', 'Diamond Weight', 'Diamond Clarity', 'idunique'];

const ProductImage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Export Table'));
    });
    const [rowData, setRowData] = useState([]);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [totalCount, setTotalCount] = useState(1);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'productNumber'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isUModalVisible, setUModalVisible] = useState(false);
    const [updateItem, setUpdateItem] = useState({});

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'productNumber', direction: 'asc' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('aAuthToken');

                if(token) {
                    const config = {
                        params: {
                            currentPage: 1,
                            pageSize: 5
                        },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                    const res = await axios.get(`${apiURL}/Product/ProductList?currentPage=${page}&pageSize=${pageSize}&search=${search}&orderColumn=${sortStatus.columnAccessor}&orderBy=${sortStatus.direction}`, config);
                     
                    setRowData(res.data.data);
                    setTotalCount(res.data.recordsFiltered);
                    setInitialRecords(res.data.data);
                } else {
                    console.error('No token available');
                }
            } catch(err) {
                console.error('Error fetching data', err);
            }
        }

        fetchData();
        
        
        return () => {
        };
    }, [isModalVisible, isUModalVisible, page, pageSize, sortStatus, search])


    useEffect(() => {
        setPage(1);
    }, [pageSize, search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);
    const header = ['ProductNumber', '', 'Lastname', 'Email', 'Start Date', 'Phone No.', 'Age', 'Company'];

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    function handleDownloadExcel() {
        downloadExcel({
            fileName: 'table',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: rowData,
            },
        });
    }

    const exportTable = (type: any) => {
        let columns: any = col;
        let records = rowData;
        let filename = 'table';

        let newVariable: any;
        newVariable = window.navigator;

        if (type === 'csv') {
            let coldelimiter = ';';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                // eslint-disable-next-line array-callback-return
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type === 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            // eslint-disable-next-line array-callback-return
            columns.map((d: any) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';

            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                rowhtml += '<tr>';
                // eslint-disable-next-line array-callback-return
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
        } else if (type === 'txt') {
            let coldelimiter = ',';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            // eslint-disable-next-line array-callback-return
            records.map((item: any) => {
                // eslint-disable-next-line array-callback-return
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/txt/i) && !newVariable.msSaveOrOpenBlob) {
                var data1 = 'data:application/txt;charset=utf-8,' + encodeURIComponent(result);
                var link1 = document.createElement('a');
                link1.setAttribute('href', data1);
                link1.setAttribute('download', filename + '.txt');
                link1.click();
            } else {
                var blob1 = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob1, filename + '.txt');
                }
            }
        }
    };

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

    const closeUModal = () => {
        setUModalVisible(false)
    };

    const updateProduct = (item: object) => {
        setUpdateItem(item);
        setUModalVisible(!isUModalVisible);
    }

    return (
        <div>  
            <div className="panel">
                <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                    <div className="flex items-center flex-wrap">
                        <button type="button"  className="btn btn-primary btn-sm m-1">
                            <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                            <NavLink to="/product/list" className="main-logo flex items-center shrink-0">PRODUCTS</NavLink>
                        </button>
                    </div>

                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => {setSearch(e.target.value)}} />
                </div>
                <div className="datatables">
                    <DataTable
                        withBorder={false} // or false, depending on your needs
                        highlightOnHover={true}
                        className="whitespace-nowrap table-hover"
                        records={initialRecords}
                        columns={[
                            { accessor: 'productNumber', title: 'Product Number', sortable: true },
                            { accessor: 'productName', title: 'Product Name', sortable: true },
                            { accessor: 'productImages', title: 'Images', sortable: true, 
                                render: ({ productImages } : any) =>(<div className='flex flex-row gap-2'>{productImages.map((a : any) => {
                                    return(<img src={`${imageURL}/${a.imageName}`} width="100px" height="100px" className='w-[100px] h-[100px]' />)
                                })}</div>)  
                            },
                        ]}
                        totalRecords={totalCount}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => {setPage(p)}}
                        recordsPerPageOptions={PAGE_SIZES}
                        sortStatus={sortStatus}
                        onRecordsPerPageChange={setPageSize}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        onRowClick={updateProduct}
                    />
                </div>
            </div>
            {isUModalVisible && <EditProductImage closeUModal={closeUModal} item={updateItem}/>}
        </div>
    );
};

export default ProductImage;
