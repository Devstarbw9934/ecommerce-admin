import React, {useState, useEffect} from 'react';
import axios from 'axios';

import IconPlus from '../Icon/IconPlus';
import IconFolderMinus from '../Icon/IconFolderMinus';
import ProductImage from '../../pages/Product/ProductImage';
import { blob } from 'stream/consumers';
import { apiURL, imageURL } from '../Utile/urls';

const EditProductImage = ({ closeUModal, item}: any) => {
    const [updateItem, setUpdateItem] = useState(item);
    const [updatedImages, setUpdatedImages]: any = useState([]);
    const [images, setImages] = useState([]);
    const [uFiles, setUFiles] = useState(new FormData());

    useEffect(() => {
        let uploadedImages = item.productImages.map((i: any) => i.imageName );
        setUpdatedImages(uploadedImages);
    }, [])

    const handleChange = (e: any) => {
        // const { name, value } = e.target;
        // setUpdateItem((prevData: object) => ({...prevData, [name]: value}));
    }

    const updateProduction = () => {
        const update = async () => {
            try {
                const token = localStorage.getItem('aAuthToken');

                if(token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }

                    let data = uFiles;
                    data.append('ProductNumber', updateItem.productNumber);
                    data.append('ExistingImageNameList', updatedImages);
                    data.append('Status', 'Active');
                    data.append('ImageDesc', 'desc');
                    data.append('ImageName', 'a');
                    
                    const res = await axios.post(`${apiURL}/ProductImage/Create`, data, config);

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

    const concatFormData = (formData1: any, formData2: any) => {
        const concatenatedFormData = new FormData();
        
        // Append entries from the first FormData object
        for (const [key, value] of formData1.entries()) {
            concatenatedFormData.append(key, value);
        }

        // Append entries from the second FormData object
        for (const [key, value] of formData2.entries()) {
            concatenatedFormData.append(key, value);
        }

        return concatenatedFormData;
    }

    const handleImageChange = (e: any) => {
        const files = e.target.files;
        const imagesArray: any = [];
        const formData = new FormData(); // create a FromData object to store the files

        for (let i = 0; i < files.length; i++) {
        formData.append('Files', files[i]);
        const reader = new FileReader();
            reader.onload = (event: any) => {
                imagesArray.push({
                    imgBase: event.target.result,
                    file: files[i] 
                });
                if (imagesArray.length === files.length) {
                    setImages((prevData) => (prevData.concat(imagesArray)));
                    setUFiles((prevFormData) => (concatFormData(prevFormData, formData)));
                }
            };
            reader.readAsDataURL(files[i]);
        }
    };

    const removeUpdatedImage = (i: any) => {
        const newImagesArray = updatedImages.filter((item: any) => item !== i);
        setUpdatedImages(newImagesArray);
    }

    function removeFileByContent(formData: any, fileToRemove: any) {
        const newFormData = new FormData();
        
        for (const [key, value] of formData.entries()) {
            // Check if the value is a File object and if it matches the fileToRemove by content
            if (value instanceof File && filesAreEqual(value, fileToRemove)) {
                continue;
            }
            // For other types of data or files not matching the fileToRemove, append them to the new FormData object
            newFormData.append(key, value);
        }
    
        return newFormData;
    }
    
    // Function to check if two files are equal based on their content
    function filesAreEqual(file1: any, file2: any) {
        return file1.name === file2.name && file1.size === file2.size && file1.type === file2.type;
    }

    const removeImage = (i: any) => {
        const newImagesArray = images.filter(item => item !== i);
        setImages(newImagesArray);
        const newFormData = removeFileByContent(uFiles, i.file);
        setUFiles(newFormData);
    }

    return (
        <>
            <div className='fixed top-0 left-0 z-[2000] bg-[#06060696] w-[100vw] overflow-auto py-9 h-[100vh]'>
                <div className='max-w-[70vw] rounded-[7px] mx-auto p-9 bg-[#ffffff]'>
                    <div className='border-b-1'>
                        <p className='text-[20px] '>Update Images</p>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
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
                        <div className="sm:col-span-4">
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
                        <div className='sm:col-span-6'>
                            <input type="file" accept="image/*" multiple onChange={handleImageChange} className='mb-[10px]'/>
                            <div className='grid grid-cols-12 gap-2'>
                                {updatedImages.map((image: any, index: any) => (
                                    <div className='m-auto pr-1 col-span-4 flex flex-row border-solid border-[1px] rounded-[5px] border-[#d1d5db]'>
                                        <img className='col-span-3' key={index} src={`${imageURL}/${image}`} alt={`Image ${index}`} style={{ width: '210px', height: '210px', margin: '5px' }} />
                                        <div><p className='cursor-pointer' onClick={()=>removeUpdatedImage(image)}>X</p></div>
                                    </div>
                                ))}
                                {images.map((image: any, index) => (
                                    <div className='m-auto pr-1 col-span-4 flex flex-row border-solid border-[1px] rounded-[5px] border-[#d1d5db]'>
                                        <img className='' src={image.imgBase} alt={`Image ${index}`} style={{ width: '210px', height: '210px', margin: '5px' }} />
                                        <div><p className='cursor-pointer' onClick={()=>removeImage(image)}>X</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sm:col-span-6 flex flex-row justify-between">
                            <div className='flex flex-row gap-2'>
                                <button type="button" onClick={updateProduction} className="btn btn-primary btn-sm m-1">
                                    Update Images
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

export default EditProductImage;