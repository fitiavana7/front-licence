import React, { FunctionComponent, useState , useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaBars , FaUser , FaArrowRight, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa' 
import useAuth from '../hooks/useAuth';
import { showSuccessMessage } from '../helpers';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { Button } from 'antd';
import { FiHome, FiUser } from 'react-icons/fi';

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

    function goTo(link : string) {
        navigate(link , {replace : true})
        setShowMenu(false)
    }

    function handleLogout() {
        logout()
        navigate('/login' , {replace : true})
        setShowMenu(!showMenu)
        showSuccessMessage('Vous vous êtes deconnecté !')
    }

    return (
        <>
            <div className='z-30 flex px-5 justify-between items-center fixed top-0 left-0 w-full h-10 bg-fond'>
                <h3 className='font-bold text-md text-primary'>SALAIRES</h3>
                { user &&
                <div className='relative'>
                    <button onClick={()=> setShowMenu(!showMenu)} className='outline-none focus:outline-blue-500 p-1 rounded-md bg-transparent text-blue-500'>
                        <FiUser />
                    </button> 
                    { showMenu &&
                    <div className='absolute top-9 right-0 bg-fond text-white rounded-md p-3 w-60 border border-white'>
                        <div className='w-full grid grid-cols-1 my-2'>
                            <button onClick={()=>goTo('/profile')} className='hover:bg-slate-200 hover:text-fond flex items-center justify-start outline-none focus:outline-none p-2 '>
                                <span className='mr-2 text-blue-500 text-sm'><FaUser/></span>
                                <h3 className='text-md font-bold'>{user?.name}</h3>
                            </button>
                            <button onClick={()=>goTo('/dashboard')} className='hover:bg-slate-200 hover:text-fond flex items-center justify-start outline-none focus:outline-none p-2 '>
                                <span className='mr-2 text-blue-500 text-sm'><FiHome/></span>
                                <h3 className='text-md font-bold'>Tableau de bord</h3>
                            </button>
                            <button onClick={handleLogout} className='hover:bg-slate-200 hover:text-fond flex items-center justify-start outline-none focus:outline-none p-2 '>
                                <span className='text-red-500 text-md mr-2'><FaSignOutAlt/></span> 
                                <h3 className='text-md font-bold'>se deconnecter</h3>
                            </button>
                        </div>
                    </div>
                    }
                </div>
                }
                { !user && 
                    <Button onClick={()=>goTo('/login')} type='primary' className={`py-1 px-2 bg-blue-500 flex items-center`}>
                        <FaSignInAlt className='mr-2'/>se connecter
                    </Button>            
                }
            </div>
            <Outlet />
        </>
    );
};

export default Layout;