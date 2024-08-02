import React, { FunctionComponent, useState , useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import { FaBars , FaUser , FaArrowRight } from 'react-icons/fa' 
import useAuth from '../hooks/useAuth';
import { showSuccessMessage } from '../helpers';
import { useCurrentUser } from '../hooks/useCurrentUser';
const Layout : FunctionComponent = () => {
    const { setUser , logout , user } = useCurrentUser()
    const { getCurrentUser } = useAuth()

    useEffect(() => {
        async function getUser() {
            const req = await getCurrentUser()
            setUser(req)            
        }
        getUser()
    }, [setUser]);

    const navigate = useNavigate()
    const [showMenu , setShowMenu] = useState<boolean>(false)

    function handleLogout() {
        logout()
        navigate('/login' , {replace : true})
        setShowMenu(!showMenu)
        showSuccessMessage('Vous vous êtes deconnecté !')
    }

    return (
        <>
            <div className='flex px-5 justify-between items-center fixed top-0 left-0 w-full h-16 bg-fond'>
                <h3 className='font-bold text-xl text-primary'>SALAIRES</h3>
                { user &&
                <div className='relative'>
                    <button onClick={()=> setShowMenu(!showMenu)} className='outline-none focus:outline-blue-500 p-2 rounded-md bg-transparent text-blue-500'>
                        <FaBars />
                    </button> 
                    { showMenu &&
                    <div className='absolute top-9 right-0 bg-white rounded-md p-3 w-48'>
                        <div className='flex items-center p-2'>
                            <span className='mr-2 text-blue-500 text-lg'><FaUser/></span>
                            <h3 className='text-md font-bold'>{user?.name}</h3>
                        </div>
                        <div className='w-full grid grid-cols-1 my-2'>
                            <button onClick={handleLogout} className='hover:bg-slate-200 flex items-center justify-start outline-none focus:outline-none p-2 '>
                                <span className='text-red-500 text-lg mr-2'><FaArrowRight/></span> 
                                <h3 className='text-md font-bold'>se deconnecter</h3>
                            </button>
                        </div>
                    </div>
                    }
                </div>
                }
                { !user && <Button label='se connecter' type='primary' onClick={()=>navigate('/login' , {replace : true})}/> }
            </div>
            <Outlet />
        </>
    );
};

export default Layout;