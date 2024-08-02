import React from 'react';
import Chart from 'react-apexcharts'

const UserChart = () => {
    const options = {
        xaxis : { categories : ['2020' , '2021' , '2022' , '2023']},
        title : { text  : 'Sales annualy'}
    }
    const series = [{
        name : 'Sales' ,
        data : [20 , 30 , 10 , 60]
    }]
    return (
        <div className='py-9'>
            <Chart options={options} series={series} type='bar' width={500} />
        </div>
    );
};

export default UserChart;