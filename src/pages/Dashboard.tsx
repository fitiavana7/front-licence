import React from 'react';
import { FiBarChart, FiUser } from 'react-icons/fi';
import { useCurrentUser } from '../hooks/useCurrentUser';
import NumberStat from '../modules/dashboard/component/NumberStat';

const Dashboard = () => {
    return (
        <>
            <div className='flex justify-between items-center w-full py-3'>
                <h3 className='text-lg flex items-center font-bold text-primary'>
                    <FiBarChart  className='mr-2'/>
                    TABLEAU DE BORD
                </h3>
            </div>
            <NumberStat/>
        </>
    );
};

export default Dashboard;