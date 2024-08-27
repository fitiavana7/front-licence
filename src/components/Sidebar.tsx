import { Link, useLocation } from 'react-router-dom';
import { sideRoutes } from './data/routes';
import {  FiHome , FiUser , FiUsers , FiActivity, FiInfo } from 'react-icons/fi' 

const Sidebar = () => {
    const location = useLocation()    

    return (
        <div className='w-1/6 bg-fond min-h-screen p-3 pt-14'>
            <div>
            <Link to={'/'}>
                <div className={`text-dark rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${location.pathname == '/' && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                    <FiHome /> <span className='ml-2'>Dashboard</span>
                </div>
            </Link>    
            <Link to={'/profile'}>
                <div className={`text-dark rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${location.pathname == '/profile' && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                    <FiUser /> <span className='ml-2'>Compte</span>
                </div>
            </Link>    
            <Link to={'/employees/current'}>
                <div className={`text-dark rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${(location.pathname == '/employees/current' || location.pathname == '/employees/leaved' )  && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                    <FiUsers /> <span className='ml-2'>Salariés</span>
                </div>
            </Link>    
            <Link to={'/metiers'}>
                <div className={`text-dark rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${location.pathname == '/metiers' && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                    <FiActivity /> <span className='ml-2'>Metiers</span>
                </div>
            </Link>    
            <Link to={'/guides'}>
                <div className={`text-dark rounded-md flex justify-start items-center text-md my-2 font-bold w-full p-2 ${location.pathname == '/guides' && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                    <FiInfo /> <span className='ml-2'>Guide</span>
                </div>
            </Link>    
            </div>
        </div>
    );
};

export default Sidebar;