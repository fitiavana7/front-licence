import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../components/data/backend';
import { showRequestError } from '../helpers';

const AuthGuard = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem(TOKEN_KEY)
        if(!token){
            showRequestError(`Vous devez d'abord vous connecter`)
            navigate('/login' , {replace : true})
        }
    })
    return (
        <Outlet/>
    );
};

export default AuthGuard;