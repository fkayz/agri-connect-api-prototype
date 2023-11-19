import React from 'react';
import Navbar from '../components/Navbar';
import SideNavBar from '../components/SideNavBar';

const Cart = () => {


return (
    <>
        <Navbar />

        <div className='container'>
            <div className='row'>
                <div className='col-md-3'>
                    <SideNavBar />
                </div>

                <div className='col-md-9'>
                    <article>
            <div className="cart_box">
                <div className='cart_img'>
                    {/* <img src={maize} ></img> */}
                    <p>The titile goes here</p>
                </div>
                <div>
                    
            
                </div>
                <div>
                    <span>2000 MK</span>
                    <button>Remove</button>
                </div>

            
            </div>

            <div className="cart_box">
                <div className='cart_img'>
                    {/* <img src={maize} ></img> */}
                    <p>The titile goes here</p>
                </div>
                <div>
                    
            
                </div>
                <div>
                    <span>2000 MK</span>
                    <button>Remove</button>
                </div>

            
            </div>

            <div className="cart_box">
                <div className='cart_img'>
                    {/* <img src={maize} ></img> */}
                    <p>The titile goes here</p>
                </div>
                <div>
            
                </div>
                <div>
                    <span>2000 MK</span>
                    <button>Remove</button>
                </div>

            
            </div>


            <div className='total'>
                <span>Total Price of your cart</span>
                <span>Mk- 0.00</span>
            </div>

            <div  className='subit-button'>
                <button>Check out</button>
            </div>
                    </article>
                </div>
            </div>
        </div>
    </>
    

)}

export default Cart;












// Css code for the cart page 

/*

article{
    width: 60;
    margin: auto;
}
.cart_box img{
    width: 50px;
    height: 50;
}
.cart_img{
    display: flex;
    width: 400px;

}
.cart_img p{
    font-weight: bold;
    margin-left: 10px;  
}

.cart_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    border-bottom: 2px solid skyblue;
    padding-bottom:5px ;

}
.cart_box div:nth-child(2) button{
    padding: 5px 10px;
    font-weight: bold;
    margin-right: 5px;

}


.cart_box div:nth-child(3) button{
    padding: 5px 10px;
    font-weight: bold;
    letter-spacing: 2px;
    border: none;
    outline: none;
    color: white;
    background-color: #1E90FF;
    border-radius: 5px;
    cursor: pointer;

}

.cart_box div:nth-child(3) span{
    padding-right: 50px;
}
.cart_box div:nth-child(3) button:hover{
    background-color: red;
}
.cart_box div:nth-child(3)span{
    background-color: lightgreen;
    padding: 5px 10px ;
    border-radius:5px;
    margin-right:10px ;

}
.total{
    display: flex;
    justify-content: space-between;

}

.total span:nth-child(1){
    font-size: 2rem;
    color: skyblue;
    font-weight: bold;
    letter-spacing: 2px;
}
.total span:nth-child(2){
    font-size: 2rem;
    color: green;
    font-weight: bold;

}

.subit-button button{
   align-items: center;
   margin-bottom: 50px ;
   margin-top: 100px;
   margin-left: 550px;
   font-size: 18px;
   font-weight: bold;
   background-color: #1E90FF;
   border:none;
   width:160px;
   padding: 15px;
   text-decoration:none ;
   text-transform:uppercase ;
   color: white;
   border-radius: 5px;
   cursor: pointer;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   -webkit-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -webkit-transition-property:box-shadow,transform ;
   transition-property:box-shadow,transform ;
}


.subit-button button:hover, .subit-button button:focus, .subit-button button:active{
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);

}



*/