import React from 'react';
import { useState, useEffect } from 'react';
import './inputs.css';
const InputsForm = () => {
    const initialValues = { username: "", email: "", password: "", cpass: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit]= useState(false);

    const handleChange = (e) => {
        // console.log(e.target);
        const {name, value}=e.target;
        setFormValues({...formValues, [name]: value})
        // console.log(formValues)

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    useEffect(() =>{
        console.log(formErrors);
       if(Object.keys(formErrors).length === 0 && isSubmit){
        console.log(formValues);
       }
    }, [formErrors]);
    const validate = (values) => {
       const errors = {};
       const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
       if(!values.username){
        errors.username = "username is not empty!";
       }
       if(!values.email){
        errors.email = "email is not empty!";
       }
       else if(!regex.test(values.email)){
        errors.email ="This is not a valid email!"
       }
       if(!values.password){
        errors.password = "password is not empty!";
       }
       else if(values.password.length<4){
        errors.password = "password must be more than 4 characters!"
       }
       else if(values.password.length>10){
        errors.password = "password cannot exceed more than 10 characters!"
       }
       if(values.cpass!== values.password){
        errors.cpass = "password don't match!";
       }
       return errors;
    }
    return (
        <>
            <div className='container'>
                <p id='heading'>SignUp</p>
                
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type='text' name='username' id='username' placeholder='Full Name' value={formValues.username} onChange={handleChange} autoComplete='off'/>
                    </div>
                    <p>{formErrors.username}</p>
                    <div>
                        <input type='email' name='email' id='email' placeholder='Email' value={formValues.email} onChange={handleChange} autoComplete='off' />
                    </div>
                    <p>{formErrors.email}</p>

                    <div>
                        <input type='password' name='password' id='password' placeholder='Password' value={formValues.password} onChange={handleChange} autoComplete='off' />
                    </div>
                    <p>{formErrors.password}</p>

                    <div>
                        <input type='password' name='cpass' id='cpass' placeholder='Confirm Password' value={formValues.cpassword} onChange={handleChange} autoComplete='off' />
                    </div>
                    <p>{formErrors.cpass}</p>

                    {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='msg'>Successfullly Signed Up!</div>) : (<pre>{JSON.stringify(formValues, undefined, 2)}</pre>)}

                    <button>SignUp</button>
                </form>
            </div>

        </>
    )
}

export default InputsForm