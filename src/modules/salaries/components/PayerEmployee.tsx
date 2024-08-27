import { Card } from 'antd';
import React, { FC } from 'react';
import { FaInfo } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';
import { IEmployee } from '../../../types';
import PaimentCalendar from './PaimentCalendar';

type ProfileEmployeeProps = {
    employee : IEmployee
}
const PayerEmployee : FC<ProfileEmployeeProps> = ({employee}) => {
    return (
        <Card className='p-2 my-2'>
                <div className='flex justify-start items-center mb-2'>
                    <FiInfo className='text-md text-blue-500'/>
                    <h4 className='ml-2 text-blue-500 font-bold text-md'>PAIEMENT SALAIRE</h4>
                </div>
                <div className='w-full'>
                    <PaimentCalendar employee={employee}/>
                </div>
        </Card>
    );
};

export default PayerEmployee;