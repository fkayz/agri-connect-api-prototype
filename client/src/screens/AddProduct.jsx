import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import SideNavBar from '../components/SideNavBar'
import getCookie from '../hooks/getCookie'



const AddProduct = () => {

    const [ productName, setProductName ] = useState('')
    const [ productDescription, setProductDescription ] = useState('')
    const [ productPrice, setProductPrice ] = useState('')

    const [ currentUser, setCurrentUser ] = useState(JSON.parse(getCookie('currentUser')))

    const navigate = useNavigate()


    const createProductHandle = async (event) => {
        event.preventDefault()
        try{
            const productData = {
                product_owner_id: currentUser.id,
                product_status_id: 1,
                name: productName,
                description: productDescription,
                price: productPrice,
                productImage: 'https://img.freepik.com/free-vector/organic-flat-farming-profession-illustration_23-2148897363.jpg?w=1380&t=st=1700387349~exp=1700387949~hmac=a0114fe47105d5f0c64fab56568ef71675fab65fdf07179cb112ede6cda3e731'
            }
            const product = await axios.post('http://127.0.0.1:8000/api/products/add', productData)

            if(product.status === 200){
                navigate('/marketplace')
            }
        }catch(err){
            alert('error creating product, try again')
            console.log('erro  creating product', err)
        }
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
                        <div className='bg-white p-4 rounded'>
                            <form onSubmit={createProductHandle}>
                                <div className='mb-3'>
                                    <input value={productName} onChange={(e) => setProductName(e.target.value)} type='text' placeholder='Enter product name' className='form-control' />
                                </div>

                                <div className='mb-3'>
                                    <textarea  value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className='form-control' placeholder='Enter product description'></textarea>
                                </div>

                                <div className='mb-3'>
                                    <input  value={productPrice} onChange={(e) => setProductPrice(e.target.value)} type='number' placeholder='Enter product price' className='form-control' />
                                </div>

                                <div className='mb-3'>
                                    <button type='submit' className='create-product-btn btn btn-success mx-auto d-block mt-3'>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct