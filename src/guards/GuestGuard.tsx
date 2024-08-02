import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../components/data/backend';
import { showRequestError } from '../helpers';

const GuestGuard = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem(TOKEN_KEY)
        if(token){
            navigate('/' , {replace : true})
        }
    })
    return (
        <Outlet/>
    );
};

export default GuestGuard;