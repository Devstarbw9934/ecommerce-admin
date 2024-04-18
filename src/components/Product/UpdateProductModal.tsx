import react, {useState, useEffect} from 'react';
import axios from 'axios';

import IconPlus from '../Icon/IconPlus';
import { apiURL, imageURL } from '../Utile/urls';

const UpdateProductModal = ({ closeUModal, item}: any) => {
    const [updateItem, setUpdateItem] = useState(item);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUpdateItem((prevData: object) => ({...prevData, [name]: value}));
    }

    const updateProduction = () => {
        const update = async () => {
            try {
                const token = localStorage.getItem('aAuthToken');

                if(token) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                    const res = await axios.put(`${apiURL}/Product/Update`, updateItem, config);

                    closeUModal();
                } else {
                    console.error('No token available');
                }
            } catch(err) {
                console.error('Error fetching data', err);
            }
        }
        
        update();
    }

    const deleteProduction = () => {
        const deleteItem = async () => {
            try {
                const token = localStorage.getItem('aAuthToken');

                if(token) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                    const res = await axios.delete(`${apiURL}/Product/Delete?uniqueID=${item.idunique}`, config);

                    closeUModal();
                } else {
                    console.error('No token available');
                }
            } catch(err) {
                console.error('Error fetching data', err);
            }
        }
        
        deleteItem();
    }

    return (
        <>
            <div className='fixed top-0 left-0 z-[2000] bg-[#06060696] w-[100vw] overflow-auto py-9 h-[100vh]'>
                <div className='max-w-[70vw] rounded-[7px] mx-auto p-9 bg-[#ffffff]'>
                    <div className='border-b-1'>
                        <p className='text-[20px] '>Update Product</p>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="productNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                Number
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="productNumber"
                                id="productNumber"
                                value={updateItem.productNumber}
                                onChange={handleChange}
                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="productName"
                                id="productName"
                                value={updateItem.productName}
                                onChange={handleChange}
                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="productDescription" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                id="productDescription"
                                name="productDescription"
                                rows={3}
                                value={updateItem.productDescription}
                                onChange={handleChange}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="sellPrice" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="sellPrice"
                                id="sellPrice"
                                value={updateItem.sellPrice}
                                onChange={handleChange}
                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="width" className="block text-sm font-medium leading-6 text-gray-900">
                                Width
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="width"
                                id="width"
                                value={updateItem.width}
                                onChange={handleChange}
                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                                Weight
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="weight"
                                id="weight"
                                value={updateItem.weight}
                                onChange={handleChange}
                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="fit" className="block text-sm font-medium leading-6 text-gray-900">
                                Fit
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="fit"
                                id="fit"
                                value={updateItem.fit}
                                onChange={handleChange}
                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="thickness" className="block text-sm font-medium leading-6 text-gray-900">
                                Thickness
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="thickness"
                                id="thickness"
                                value={updateItem.thickness}
                                onChange={handleChange}
                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="diamondWeight" className="block text-sm font-medium leading-6 text-gray-900">
                                Diamond Weight
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="diamondWeight"
                                id="diamondWeight"
                                value={updateItem.diamondWeight}
                                onChange={handleChange}
                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="diamondClarity" className="block text-sm font-medium leading-6 text-gray-900">
                                Diamond Clarity
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="diamondClarity"
                                id="diamondClarity"
                                value={updateItem.diamondClarity}
                                onChange={handleChange}
                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* <div className="sm:col-span-3">
                            <label className='sm:mt-10'>
                                <input type="checkbox"/> Eternity
                            </label>
                        </div> */}
                        <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Status</label>
                            <select id="status" name="status" value={updateItem.status} onChange={handleChange} className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="">--Please choose an option--</option>
                                <option value="Active">Active</option>
                                <option value="Deactive">Deactive</option>
                            </select>
                        </div>
                        <div className="sm:col-span-3 hidden">
                            <label htmlFor="idunique" className="block text-sm font-medium leading-6 text-gray-900">
                                idunique
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="idunique"
                                id="idunique"
                                value={updateItem.idunique}
                                onChange={handleChange}
                                className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-6 flex flex-row justify-between">
                            <div className='flex flex-row gap-2'>
                                <button type="button" onClick={updateProduction} className="btn btn-primary btn-sm m-1">
                                    Update Product
                                </button>
                                <button type="button" onClick={deleteProduction} className="btn btn-danger btn-sm m-1">
                                    Delete Product
                                </button>
                            </div>
                            <button type="button" onClick={closeUModal} className="btn btn-primary btn-sm m-1">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProductModal;