import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import axios from 'axios'
import Navbar from '../components/Navbar'
import SideNavBar from '../components/SideNavBar'
import getCookie from '../hooks/getCookie'
import addProductImg from '../assets/add_product.png'
import { storage } from '../firebaseConfig'


const AddProduct = () => {

    const [ productName, setProductName ] = useState('')
    const [ productDescription, setProductDescription ] = useState('')
    const [ productPrice, setProductPrice ] = useState('')
    const [ productImg, setProductImg ] = useState('')
    const [ uploadingToFirebase, setUploadingToFirebase ] = useState(false)
    const [ savingToDB, setSavingToDB ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ productImgUploadPrg, setProductImgUploadPrg ] = useState(0)

    const [ currentUser, setCurrentUser ] = useState(JSON.parse(getCookie('currentUser')))

    const navigate = useNavigate()

    const saveChanges = async (productImgLink) => {
        try{
            const productData = {
                product_owner_id: currentUser.id,
                product_status_id: 3,
                name: productName,
                description: productDescription,
                price: productPrice,
                productImage: productImgLink
            }
            setSavingToDB(true)
            const product = await axios.post('http://127.0.0.1:8000/api/products/add', productData)

            if(product.status === 200){
                navigate('/marketplace')
            }
        }catch(err){
            setError(true)
            alert('error creating product, try again')
            console.log('error  creating product', err)
        }finally{
            setSavingToDB(false)
        }
    }

    const uploadProductImageToFirebase = (img) => {
        setUploadingToFirebase(true)
        const storageRef = ref(storage, `/uploaded_files/product/image/${img.name}`)
        const uploadTask = uploadBytesResumable(storageRef, img)
        console.log('okay stage 1')
        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProductImgUploadPrg(progress)
            },
            (err) => { return alert('failed to upload img. try again', err) },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                    console.log('uploaded')
                    setUploadingToFirebase(false)
                    saveChanges(url);
                })
            }
        )
    }

    const saveToDB = (event) => {
        event.preventDefault()
        uploadProductImageToFirebase(productImg)
    }

    const previewProductImage = (img) => {
        const reader = new FileReader()
        const imgPreview = document.querySelector('#imgPreview')

        reader.onload = (e) => {
            imgPreview.src = e.target.result
            setProductImg(img.files[0])
        }

        reader.readAsDataURL(img.files[0])
    }

    const uploadProductImage = (e) => {
        previewProductImage(e.target)
    }

    return (
        <>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    <div className='col-md-3'>
                        <SideNavBar />
                    </div>

                    <div className='col-md-9'>
                        <h3 className='text-muted mb-2'>Add New Product</h3>
                        
                        <div className='row mt-5'>
                            <div className='col-md-3'>
                                <div>
                                    <img src={addProductImg} id='imgPreview' width='100%' className='product-img rounded' alt='product image' />
                                    {/* <h3 contentEditable id='productNameEditable'>Enter product name</h3> */}
                                </div>
                            </div>

                            <div className='col-md-9'>
                                <div className='p-4 rounded px-4'>
                                    <form onSubmit={saveToDB}>
                                        <div className='mb-2'>
                                            <input value={productName} onChange={(e) => setProductName(e.target.value)} type='text' placeholder='Enter product name' className='add-product-inpt form-control' />
                                        </div>

                                        <div className='mb-2'>
                                            <textarea  value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className='add-product-inpt form-control' placeholder='Enter product description'></textarea>
                                        </div>

                                        <div className='mb-3'>
                                            <input  value={productPrice} onChange={(e) => setProductPrice(e.target.value)} type='number' placeholder='Enter product price' className='add-product-inpt form-control' />
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor="productImg">Upload product image</label>
                                            <input type='file' id='productImg' onChange={uploadProductImage} className='add-product-inpt form-control' />
                                        </div>

                                        <div className='mb-3'>
                                            {
                                                uploadingToFirebase
                                                ? <button className='create-product-btn btn btn-success mx-auto d-block mt-3' disabled>
                                                    {
                                                        savingToDB ? 'Saving...' : `Creating...${productImgUploadPrg}%`
                                                    }
                                                </button>
                                                : <button type='submit' className='create-product-btn btn btn-success mx-auto d-block mt-3'>Create</button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct