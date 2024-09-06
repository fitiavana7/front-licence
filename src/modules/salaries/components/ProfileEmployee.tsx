import { Card } from 'antd';
import React, { FC } from 'react';
import { FaInfo, FaLocationArrow, FaMailBulk, FaPhone, FaUser } from 'react-icons/fa';
import { FiCalendar, FiDatabase, FiHeart, FiInfo, FiMail, FiMap, FiPhone, FiUser, FiUserCheck } from 'react-icons/fi';
import { IEmployee } from '../../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type ProfileEmployeeProps = {
    employee : IEmployee
}

const ProfileEmployee : FC<ProfileEmployeeProps> = ({employee}) => {
    return (
        <Card className='p-1 my-2 z-0'>
                <div className='flex items-start'>
                    <FiUser className='text-6xl' />
                    <div className=''>
                        <span className='text-2xl font-bold text-blue-500'>{employee?.firstName.toLocaleUpperCase()} {employee?.lastName}</span>
                    </div>
                </div>
                <div className='flex justify-start items-center mb-2 mt-10'>
                    <FiInfo className='text-lg text-blue-500'/>
                    <h4 className='ml-2 text-blue-500 font-bold text-sm'>INFORMATIONS PERSONNELLES</h4>
                </div>
                <div className='grid grid-cols-3 gap-3 text-sm'>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiUser className='mr-2' /> Nom</h3>
                        <span className='font-bold'>{employee?.firstName.toLocaleUpperCase()}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiUserCheck className='mr-2' /> Prénom</h3>
                        <span className='font-bold'>{employee?.lastName}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiCalendar className='mr-2' /> Age</h3>
                        <span className='font-bold'>{employee?.age}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiDatabase className='mr-2' /> Sexe</h3>
                        <span className='font-bold'>{employee?.gender}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiMap className='mr-2' /> Adrèsse</h3>
                        <span className='font-bold'>{employee?.adress}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiHeart className='mr-2' /> Situation matrimoniale</h3>
                        <span className='font-bold'>{employee?.matrimoniale}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiMail className='mr-2' /> Mail</h3>
                        <span className='font-bold'>{employee?.mail}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiPhone className='mr-2' /> Téléphone</h3>
                        <span className='font-bold'>{employee?.phone}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiCalendar className='mr-2' /> Date d'embauche</h3>
                        <span className='font-bold'>
                            { employee.hiringDate ? format(employee?.hiringDate, 'dd MMMM yyyy', { locale: fr }) : ''}
                        </span>
                    </div>
                </div>
            </Card>
    );
};

export default ProfileEmployee;