import { Link, useLocation } from 'react-router-dom';
import { sideRoutes } from './data/routes';
import {  FiHome , FiUser , FiUsers , FiActivity, FiInfo, FiArrowDown, FiArrowUp, FiChevronDown, FiChevronUp } from 'react-icons/fi' 
import { FaEuroSign } from 'react-icons/fa';
import { useState } from 'react';

const Sidebar = () => {
    const location = useLocation()    
    const [showDrop , setShowDrop] = useState<boolean>(false)

    return (
        <div className='w-1/6 bg-fond min-h-screen p-3 pt-14 text-white'>
            <div>
            <Link to={'/dashboard'}>
                <div className={`rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${location.pathname == '/dashboard' && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                    <FiHome /> <span className='ml-2'>Dashboard</span>
                </div>
            </Link>    
            <Link to={'/profile'}>
                <div className={`rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${location.pathname == '/profile' && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                    <FiUser /> <span className='ml-2'>Compte</span>
                </div>
            </Link>    
            <div onClick={()=> setShowDrop(!showDrop)} className={`rounded-md cursor-pointer flex justify-between items-center text-md my-2 font-bold w-full p-2 ${(location.pathname == '/employees/current' || location.pathname == '/employees/leaved' || location.pathname.includes('detail'))  && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                <div className='flex items-start'>
                <FiUsers /> <span className='ml-2'>Salariés</span>
                </div>
                <span className='text-xl'>
                    {showDrop ? 
                    <FiChevronUp />
                    : <FiChevronDown />
                }
                </span>
            </div>
            { showDrop && <div className='ml-3'>
                <Link to={'/employees/current'}>
                    <div className={`rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${(location.pathname == '/employees/current' || location.pathname.includes('detail'))  && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                        <FiUsers /> <span className='ml-2'>Salariés actuels</span>
                    </div>
                </Link>
                <Link to={'/employees/leaved'}>
                    <div className={`rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${(location.pathname == '/employees/leaved' )  && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                        <FiUsers /> <span className='ml-2'>Anciens salariés</span>
                    </div>
                </Link>
            </div> }
            <Link to={'/paiements'}>
                <div className={`rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${location.pathname == '/paiements' && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                    <FaEuroSign /> <span className='ml-2'>Paiements</span>
                </div>
            </Link>    
            <Link to={'/metiers'}>
                <div className={`rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${location.pathname == '/metiers' && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                    <FiActivity /> <span className='ml-2'>Metiers</span>
                </div>
            </Link>    
            <Link to={'/guides'}>
                <div className={`rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${location.pathname == '/guides' && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                    <FiInfo /> <span className='ml-2'>Guide</span>
                </div>
            </Link>    
            </div>
        </div>
    );
};

export default Sidebar;