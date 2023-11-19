import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import setCookie from '../hooks/setCookie';
import removeCookie from '../hooks/removeCookie';
// import redirect from '../helpers/redirect.jsx';


const SignIn = () => {

    const navigate = useNavigate();
    
    // form data
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         const errorDiv = document.querySelector('.error-div');
    //         console.log(errorDiv);
    //         setTimeout(() => {
    //             errorDiv.style.opacity = 0;
    //             setTimeout(() => {
    //                 // errorDiv.remove();
    //             }, 1000)
    //         }, 3000)
    //     }, 3000)
    // }, [error])


    // create a new user
    const invokeSignInRequest = async (userInfo) => {
        try{
            setIsLoading(true)
            const user = await axios.post('http://127.0.0.1:8000/api/users/login', userInfo)
            if(user.status === 200){
                removeCookie('jwt');
                removeCookie('currentUser');
                setCookie('jwt', user.data.token, 3);
                console.log(user.data)
                setCookie('currentUser', JSON.stringify(user.data.user), 3)
                navigate('/');
                console.log('User login successfully!');
                console.log('Data',user.data);
            }

        }catch(e){
            setError(e.response.data.error)
            console.log('error', e);
        }finally{
            setIsLoading(false);
        }
    }

    // sign up handle
    const SignInHandler = async (e) => {
        e.preventDefault();

        const userInfo = {
            password: password,
            email: email,
        }
        
        invokeSignInRequest(userInfo);   
    }


  return (
    <div className='container'>

        {
            error 
            && 
            <div className='error-div mx-auto text-center alert alert-danger'>
                { error } 
            </div>
        }

        <div className='form-container mt-5'>
            <div className='bg-white shadow-lg rounded px-4 py-3'>
                <h2 className='form-header font-bold mb-5 text-center'>Login Here</h2>

                <form onSubmit={SignInHandler}>
                    {/* first and last name */}
                    <div className='mb-3'>
                        <label htmlFor='email' className='text-muted'>Email</label>
                        <input id='email' value={email} onChange={ (e) => setEmail(e.target.value) } type='text' placeholder='example@gmail.com' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='text-muted'>Password</label>
                        <input id='password' value={password} onChange={ (e) => setPassword(e.target.value) } type='password' placeholder='***********' className='form-control' />
                    </div>

                    {
                        isLoading 
                        ?   <div className="mx-auto d-block spinner-border mt-5 text-info" role="status">
                                <span className="visually-hidden">Logging in...</span>
                            </div>
                        :   <button type='submit' className='btn btn-primary mt-3 m-auto d-block mb-3'>Login</button>

                    }
                </form>
                <small className='text-muted'>Don't have an account ? <a href='/signup'>Register Here</a></small>
            </div>
        </div>
    </div>
  )
}

export default SignIn