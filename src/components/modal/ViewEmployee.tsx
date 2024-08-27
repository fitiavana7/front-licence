import React , {FormEvent, useState} from 'react';
import {  FaSave, FaSortNumericDownAlt, FaUser } from 'react-icons/fa' 
import { FiCalendar, FiHeart, FiMail, FiMap, FiPhone, FiUser, FiUserCheck } from 'react-icons/fi';
import { Card } from 'antd';
import { IEmployee } from '../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { ToastContainer, toast } from "react-toastify";

interface EditEmployeePropsType {
    close : ()=> void ,
    employee : IEmployee
}

const ViewEmployeeModal : React.FC<EditEmployeePropsType> = (props) => {
    const {close , employee} = props
    toast.success("Success Notification !");    
    return (
        <>
        <div className='z-50 w-full min-h-screen fixed top-0 left-0 flex justify-center items-center bg-[#000000c7]' onClick={close}>
            <Card className={`animate-fadeIn w-1/2 bg-fond`} onClick={(e : any)=>e.stopPropagation()}>
                <div className='flex justify-center text-primary items-center'>
                    <FaUser className='text-xl mr-2'/>
                    <h4 className='font-bold text-xl'> DETAIL D'UN SALARIÉ</h4>
                </div>
                    <div className='grid grid-cols-2 gap-2 my-5'>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FiUser className='mr-2' /> Nom</h3>
                            <span className='font-bold'>{employee?.firstName.toLocaleUpperCase()}</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FiUser className='mr-2' /> Prénoms</h3>
                            <span className='font-bold'>{employee?.lastName}</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FaSortNumericDownAlt className='mr-2' /> Age</h3>
                            <span className='font-bold'>{employee?.age}</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FiPhone className='mr-2' /> Télephone</h3>
                            <span className='font-bold'>{employee?.phone}</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FiMail className='mr-2' /> Mail</h3>
                            <span className='font-bold'>{employee?.mail}</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FiUser className='mr-2' /> Adresse</h3>
                            <span className='font-bold'>{employee?.adress}</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FiUser className='mr-2' /> Genre</h3>
                            <span className='font-bold'>{employee?.gender}</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FiHeart className='mr-2' /> Situation matrimoniale</h3>
                            <span className='font-bold'>{employee?.matrimoniale}</span>
                        </div>
                        { employee.hiringDate &&
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FiCalendar className='mr-2' /> Date d'embauche</h3>
                            <span className='font-bold'>
                                {format(employee?.hiringDate, 'dd MMMM yyyy', { locale: fr })}
                            </span>
                        </div> }
                        { employee.leavingDate &&
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FiCalendar className='mr-2' /> Date de depart</h3>
                            <span className='font-bold'>
                                {format(employee?.leavingDate, 'dd MMMM yyyy', { locale: fr })}
                            </span>
                        </div> }
                    </div>
                    <div className='flex justify-end items-center py-5'>
                    </div>
            </Card>
        </div>
        </>
    );
};

export default ViewEmployeeModal;