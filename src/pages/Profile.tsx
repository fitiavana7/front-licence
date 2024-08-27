import React from 'react';
import {Card} from 'antd' 
import { FaBuilding, FaCalendar, FaInfo, FaLocationArrow, FaMailBulk, FaPhone, FaUser } from 'react-icons/fa'
import { useCurrentUser } from '../hooks/useCurrentUser';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FiCalendar, FiInfo, FiMail, FiMap, FiPhone, FiUserCheck } from 'react-icons/fi';

const Profile = () => {
    const { user } = useCurrentUser()
    return (
        <>
            <Card className='p-2 my-2 text-lg'>
                <div className='flex justify-start items-center py-3'>
                    <FiInfo className='text-lg text-blue-500'/>
                    <h4 className='ml-2 text-blue-500 font-bold text-lg'>PROFILE</h4>
                </div>
                <div className='grid grid-cols-3 gap-3 text-sm'>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiUserCheck className='mr-2' /> Nom</h3>
                        <span className='font-bold'>{user?.name.toLocaleUpperCase()}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiMap className='mr-2' /> Location</h3>
                        <span className='font-bold'>{user?.location}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiCalendar className='mr-2' /> Date de création</h3>
                        <span className='font-bold'>
                        {user?.creationDate && format(user?.creationDate, 'dd MMMM yyyy', { locale: fr })}
                        </span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiMail className='mr-2' />Mail </h3>
                        <span className='font-bold'>{user?.mail}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiPhone className='mr-2' /> Téléphone</h3>
                        <span className='font-bold'>{user?.phone}</span>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default Profile;