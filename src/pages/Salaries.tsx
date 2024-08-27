import { useEffect, useState } from 'react';
import { InputControlled } from '../components/ui/InputControlled';
import TitleSection from '../components/ui/TitleSEction';
import EmployeeTable from '../modules/salaries/components/EmployeeTable';
import { IEmployee } from '../types';
import { useCurrentUser } from '../hooks/useCurrentUser';
import useEmployee from '../hooks/useEmployee';
import { FiUsers } from 'react-icons/fi';
import NewEmployeeModal from '../modules/salaries/components/NewEmployeeModal';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Salaries = () => {
    const location = useLocation()    
    return (
        <>
            <div className='py-2 flex justify-start items-center'>
                <Link to={'/employees/current'} 
                    className={`flex mx-2 items-center cursor-pointer font-bold p-2 rounded-md
                    ${location.pathname == '/employees/current' && 'bg-primary text-white' }
                    `}
                >
                    <FiUsers /> <span className='ml-2'>Salariés actuels</span>
                </Link>
                <Link to={'/employees/leaved'}
                    className={`flex mx-2 items-center cursor-pointer font-bold p-2 rounded-md
                    ${location.pathname == '/employees/leaved' && 'bg-primary text-white' }
                    `}
                >
                    <FiUsers /> <span className='ml-2'>Anciens salariés</span>
                </Link>
            </div>
            <Outlet />
        </>
    );
};

export default Salaries;