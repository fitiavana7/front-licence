import React from 'react';
import NumberStat from '../modules/dashboard/component/NumberStat';
import SalariesChart from '../modules/dashboard/component/SalariesChart';
import UserChart from '../modules/dashboard/component/UserChart';

const Dashboard = () => {
    return (
        <>
            <NumberStat/>
            <div className='flex justify-between items-start'>
                <UserChart/>
                <SalariesChart/>
            </div>
        </>
    );
};

export default Dashboard;