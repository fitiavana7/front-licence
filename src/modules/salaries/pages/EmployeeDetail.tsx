import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useEmployee from '../../../hooks/useEmployee';
import { IEmployee, ISalary } from '../../../types';
import ProfileEmployee from '../components/ProfileEmployee';
import SalaryEmployee from '../components/SalaryEmployee';
import PayerEmployee from '../components/PayerEmployee';
import { FiCheckCircle, FiCreditCard, FiUser, FiUserCheck } from 'react-icons/fi';

const EmployeeDetail = () => {

    const {id} = useParams()

    const {getEmployeeDetails} = useEmployee()

    const [employee , setEmployee] = useState<IEmployee>()
    const [activePage , setActivePage] = useState<number>(0)

    const refetch = ()=>{
        getEmployeeDetails(id as string || '').then((e)=>{
            setEmployee(e.data)
        }).catch((err:any)=>{})
    }
    useEffect(()=>{
        refetch()
    },[])

    return (
        <>
        <div className='w-[75%] z-20 fixed top-20 text-sm flex justify-between'>
            <div className='text-white flex items-center'>
                <FiUser className='text-xl'/> <span className='font-bold ml-2'>{`${employee?.firstName.toLocaleUpperCase()} ${employee?.lastName}`} </span>
            </div>
            <div className='py-2 flex items-center text-md text-white'>
                <span 
                    className={`flex mx-2 items-center cursor-pointer font-bold p-2
                        ${activePage === 0 ? 'text-blue-500  hover:text-blue-600 border-blue-500 border-b-2' : 'hover:text-blue-600'}  
                    `}
                    onClick={()=> setActivePage(0)}
                >
                    <FiUserCheck className='mr-2'/> profile
                </span>
                <span 
                    className={`flex mx-2 items-center cursor-pointer font-bold p-2
                        ${activePage === 1 ? 'text-blue-500  hover:text-blue-600 border-blue-500 border-b-2' : 'hover:text-blue-600'}  
                    `}
                    onClick={()=> setActivePage(1)}
                >
                    <FiCreditCard className='mr-2'/> salaire
                </span>
                <span 
                    className={`flex mx-2 items-center cursor-pointer font-bold p-2
                        ${activePage === 2 ? 'text-blue-500  hover:text-blue-600 border-blue-500 border-b-2' : 'hover:text-blue-600'}  
                    `}
                    onClick={()=> setActivePage(2)}
                >
                    <FiCheckCircle className='mr-2'/> payer
                </span>
            </div>
        </div>
        <div className='mt-24'>
            { activePage === 0 && employee && <ProfileEmployee 
                employee={employee}
            /> }
            { activePage === 1 && <SalaryEmployee
                employeeId={id as string}
            /> }
            { activePage === 2 && employee && <PayerEmployee
                employee={employee}
            />}
        </div>
        </>
    );
};

export default EmployeeDetail;