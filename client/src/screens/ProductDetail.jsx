import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import SideNavBar from '../components/SideNavBar'
import Product from '../components/Product'

const ProductDetail = () => {

    const [ product, setProduct ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    
    const product_id = useParams();

    useEffect(() => {
        const getOneProduct = async () => {
            try{
                setIsLoading(true)
                const product = await axios.get(`http://127.0.0.1:8000/api/products/${product_id.id}`)

                if(product.status === 200){
                    console.log(product)
                    setProduct(product.data.product)
                }
            }catch(err){
                setError(true)
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }

        getOneProduct()
    }, [])

  return (
    <>
        <Navbar />
        
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'>
                    <SideNavBar />
                </div>
                <div className='col-md-9'>

                    {
                        isLoading && 
                        <div className='text-center'>
                            <div className="spinner-border mt-5 text-info" role="status">
                                <span className="visually-hidden">Fetching product...</span>
                            </div>
                        </div> ||
                        error && <div className='mt-5'>Error getting product, check your internet connection or try to refresh the page!</div> ||
                        isLoading === false && error === false && <Product product={product} page='productDetail' />
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default ProductDetail