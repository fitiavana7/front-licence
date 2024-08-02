import React from 'react';
import LoginForm from '../modules/guest/LoginForm';

const Login = () => {
    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            <div className='w-1/4 min-h-fit'>
                <h3 className='text-2xl font-bold text-center'>SE CONNECTER</h3>
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;