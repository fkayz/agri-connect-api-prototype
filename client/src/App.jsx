import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import About from './screens/About'
import SignUp from './screens/SignUp'
import Martketplace from './screens/Marketplace'
import SignIn from './screens/SignIn'
import Groups from './screens/Groups'
import Profile from './screens/Profile'
import ProductDetail from './screens/ProductDetail'
import AddProduct from './screens/AddProduct'
import Cart from './screens/Cart'
import GroupChat from './screens/GroupChat'
import { Saved } from './screens/Saved'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const App = () => {

  return (
    <>
      <PayPalScriptProvider>
        <Router>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/signup" element={<SignUp />} ></Route>
              <Route exact path="/marketplace" element={<Martketplace />}></Route>
              <Route exact path='/signin' element={<SignIn />}></Route>
              <Route exact path="/groups" element={<Groups />}></Route>
              <Route exact path="/profile" element={<Profile />}></Route>
              <Route exact path="/marketplace/product/:id" element={<ProductDetail />}></Route>
              <Route exact path="/product/add" element={<AddProduct />}></Route>
              <Route exact path="/product/cart" element={<Cart />}></Route>
              <Route exact path="/groups/chat/:id" element={<GroupChat />}></Route>
              <Route exact path="/posts/saved/:id" element={<Saved />}></Route>
            </Routes>
        </Router>
      </PayPalScriptProvider>
    </>
  )
}

export default App
