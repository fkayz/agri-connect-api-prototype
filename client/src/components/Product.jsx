import React from 'react'
import Paypal from '../components/Paypal'
const Product = (props) => {

    console.log('product', props.product)

    const product_link = `/marketplace/product/${props.product.id}`
    let short_description = ''
    
    if(new String(props.product.description).length <= 50){
        short_description = props.product.description
    }else{
        short_description = new String(props.product.description).slice(0, 50).concat('...')
    }

  return (
    <div className='bg-white mb-3 p-3 rounded' height={30}>
        {/* top part */}
        <div className='top-part'>
            <img className='product-user-profile' src={props.product.user?.profilePic} height={50} width={50} />
            <div className='product-user-info'>
                <p className='product-user-name mb-0'>{`${props.product.user?.firstName} ${props.product.user?.lastName}`}</p>
                <small>{new Date(props.product.createdAt).toDateString()}</small>
            </div>      
        </div>
        {/* product content part */}
        <p className='mt-3'>
            {
                props.page === 'marketplace'
                ? short_description
                : props.product.description
            }
        </p>
        {/* product image */}
        {
            props.page === 'productDetail' 
            ? <img src={props.product.productImage} width='100%' className='product-img rounded' />
            : <img src={props.product.productImage} width={435} height={300} className='product-img rounded' />
        }
        
        <p className='product-name text-muted mt-3'>{props.product?.name}</p>

        {
            props.product.product_status?.status === 'new' && <div className='product-status-badge bg-success text-white p-2'>New</div> ||
            props.product.product_status?.status === 'sold' && <div className='product-status-badge bg-danger p-2'>Sold</div> ||
            props.product.product_status?.status === 'available' && <div className='product-status-badge bg-info text-white p-2'>Available</div>
        }

        <p className='mt-2'><b>MWK</b> { props.product?.price }</p>
        {
            props.page === 'productDetail' 
            ? props.product.product_status?.status !== 'sold' ? <div className='paypal-buttons'><Paypal product={props.product} /></div> : ''
            : <a href={product_link} className='btn btn-warning mx-auto d-block mt-3'>Purchase Product</a>

        }

    </div>
  )
}

export default Product