import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import districts from '../data/malawianDistricts.js'
import axios from 'axios';
// import redirect from '../helpers/redirect.jsx';


const SignUp = () => {

    const navigate = useNavigate();
    
    // form data
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('');
    const [ district, setDistrict ] = useState('Balaka');
    const [ phone, setPhone ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ gender, setGender ] = useState('Male');
    const [ birthDate, setBirthDate ] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    // create a new user
    const invokeSignUpRequest = async (userInfo) => {
        try{
            setIsLoading(true)
            const user = await axios.post('http://127.0.0.1:8000/api/users/add', userInfo)
            if(user.status === 200){
                navigate('/signin');
            }
        }catch(e){
            console.log('error', e);
        }finally{
            setIsLoading(false);
        }
    }

    // clean phone number
    const parsePhoneNumber = (phone) => {
        // removing the '-' from the input phone and joining back together
        // from -> 000-000-0000 to 0000000000
        let parsedPhone = phone;
        parsedPhone = parsedPhone.split('-');
        parsedPhone = parsedPhone[0].concat(parsedPhone[1]).concat(parsedPhone[2]);

        return parsedPhone
    }



    // sign up handle
    const signUpHandler = async (e) => {
        e.preventDefault();

        const parsedPhone = parsePhoneNumber(phone);

        const userInfo = {
            firstName: firstName,
            lastName: lastName,
            district: district,
            phone: parsedPhone,
            email: email,
            password: password,
            gender: gender,
            birthDate: birthDate,
            role: 'farmer'
        }
        
        invokeSignUpRequest(userInfo);    
    }

    const genderData = ["Male", "Female", "Others"];

  return (
    <div className='container'>
        <div className='form-container'>
            <div className='bg-white shadow-lg rounded px-4 py-3'>
                <h2 className='form-header font-bold mb-5 text-center'>Create an Account</h2>

                <form onSubmit={signUpHandler}>
                    {/* first and last name */}
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='firstName' className='text-muted'>First Name</label>
                                <input id='firstName' value={firstName} onChange={ (e) => setFirstName(e.target.value) } type='text' placeholder='John' className='form-control' />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='lastName' className='text-muted'>Last Name</label>
                                <input id='lastName' value={lastName} onChange={ (e) => setLastName(e.target.value) } type='text' placeholder='Doe' className='form-control' />
                            </div>
                        </div>
                    </div>

                    {/* district and phone*/}
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor="district" className='text-muted'>Where are you located ?</label>
                                <select id='district' value={district} onChange={ (e) => setDistrict(e.target.value) } className='form-control'>
                                    {
                                        districts.map((district) => (
                                            <option value={district} key={district}>{district}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-2'>
                                <label htmlFor='firstName' className='text-muted'>Phone</label>
                                <input type='tel' value={phone} onChange={ (e) => setPhone(e.target.value) } pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' placeholder='Enter your phone number' className='form-control' />
                                <small className='text-warning'>* Format: 099-456-2003</small>
                            </div>
                        </div>
                    </div>

                    {/* email */}
                    <div className='mb-3'>
                        <label htmlFor="email" className='text-muted'>Email</label>
                        <input type='email' value={email} onChange={ (e) => setEmail(e.target.value) } id='email' placeholder='johndoe@gmail.com' className='form-control' />
                    </div>
                    
                    {/* password and confirm password */}
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='password' className='text-muted'>Password</label>
                                <input id='password' value={password} onChange={ (e) => setPassword(e.target.value) } type='password' placeholder='**********' className='form-control' />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='confirmPassword' className='text-muted'>Repeat Password</label>
                                <input id='confirmPassword' value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value) } type='password' placeholder='**********' className='form-control' />
                            </div>
                        </div>
                    </div>

                    {/* gender and birth date */}
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='gender' className='text-muted'>Gender</label>
                                <select id="gender" value={gender} onChange={ (e) => setGender(e.target.value) } className='form-control'>
                                    {
                                        genderData.map((gender) => (
                                            <option value={gender} key={gender}>{gender}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='birthDate' className='text-muted'>Birth Date</label>
                                <input id='birthDate' value={birthDate} onChange={ (e) => setBirthDate(e.target.value) } type='date' className='form-control' />
                            </div>
                        </div>
                    </div>

                    {/* submit button */}
                    {
                        isLoading 
                        ?   <div className="mx-auto d-block spinner-border mt-5 text-info" role="status">
                                <span className="visually-hidden">Registering...</span>
                            </div>
                        :   <button type='submit' className='btn btn-primary mt-3 m-auto d-block mb-3'>Register</button>

                    }
                </form>
                <small className='text-muted'>Arleady have an account ? <a href='/signin'>Login Here</a></small>
            </div>
        </div>
    </div>
  )
}

export default SignUp