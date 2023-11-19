import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SideNavBar from '../components/SideNavBar';
import Product from '../components/Product'


const Martketplace = () => {

    const [ products, setProducts ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ errors, setErrors ] = useState(false);

    // request for products from, agri-connect-api

    useEffect(() => {
        const getProducts = async () => {
            try{
                setIsLoading(true)
                const products = await axios.get('http://127.0.0.1:8000/api/products')
                
                if(products.status === 200){
                    setProducts(products.data.products);
                    console.log(products);
                }
            }catch(error){
                setErrors(true)
                console.log(error)
            }finally{
                setIsLoading(false)
            }
        }
        getProducts();
    }, []);

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className="row">
                    <div className='col-md-3'>
                        <SideNavBar />
                    </div>

                    <div className='col-md-9 p-3'>
                        <h1 className='text-muted mb-4'>Market Place</h1>
                        <a href='/product/add' className='btn btn-success mb-3'>Create New Product</a>
                        <div className='row'>
                            {
                                isLoading && 
                                <div className='mx-2'>
                                    <div className="spinner-border mt-5 text-info" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div> ||
                                errors && <div className='mt-5 mx-2'>Error getting products, check your internet connection or try to refresh the page!</div> ||
                                isLoading === false && errors === false && products.map((product) => (
                                    <div className='col-md-6'>
                                        <Product product={product} page='marketplace' key={product.id} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Martketplace;