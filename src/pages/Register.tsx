import React from 'react';
import RegisterForm from '../modules/guest/RegisterForm';

const Register = () => {
    return (
        <div className='w-full acceuil min-h-screen flex justify-center items-center'>
            <div className='w-1/4 min-h-fit bg-fond p-3 rounded-md'>
                <h3 className='text-2xl font-bold text-center'>CREER UNE COMPTE</h3>
                <RegisterForm/>
            </div>
        </div>
    );
};

export default Register;