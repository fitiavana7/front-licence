import React from 'react';
import LoginForm from '../modules/guest/LoginForm';

const Login = () => {
    return (
        <div className='w-full acceuil min-h-screen flex justify-center items-center'>
            <div className='w-1/4 min-h-fit bg-fond p-3 rounded-md'>
                <h3 className='text-2xl text-white font-bold text-center'>SE CONNECTER</h3>
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;