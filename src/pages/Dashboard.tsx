import React from 'react';
import { FiBarChart, FiUser } from 'react-icons/fi';
import { useCurrentUser } from '../hooks/useCurrentUser';
import NumberStat from '../modules/dashboard/component/NumberStat';
import SalariesChart from '../modules/dashboard/component/SalariesChart';
import UserChart from '../modules/dashboard/component/UserChart';

const Dashboard = () => {
    const { user } = useCurrentUser()
    return (
        <>
            <div className='flex justify-between items-center w-full py-3'>
                <h3 className='text-lg flex items-center font-bold text-primary'>
                    <FiBarChart  className='mr-2'/>
                    TABLEAU DE BORD
                </h3>
                <div className='flex justify-start items-center p-1 bg-green-400 px-3 rounded-md text-lg text-white'>
                    <FiUser />
                    <span className='ml-2'>{user?.name}</span>
                </div>
            </div>
            <NumberStat/>
            <div className='flex justify-between items-start'>
                <UserChart/>
                <SalariesChart/>
            </div>
        </>
    );
};

export default Dashboard;