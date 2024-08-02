import React from 'react';
import {Card} from 'antd' 
import { FaBuilding, FaCalendar, FaInfo, FaLocationArrow, FaMailBulk, FaPhone, FaUser } from 'react-icons/fa'
import { useCurrentUser } from '../hooks/useCurrentUser';

const Profile = () => {
    const { user } = useCurrentUser()
    return (
        <>
            <Card className='p-2 my-2 text-lg'>
                <div className='flex justify-start items-center py-3'>
                    <FaInfo className='text-lg text-blue-500'/>
                    <h4 className='ml-2 text-blue-500 font-bold text-lg'>PROFILE</h4>
                </div>
                <div className='grid grid-cols-3 gap-3'>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaBuilding className='mr-2' /> Nom</h3>
                        <span className='font-bold'>{user?.name.toLocaleUpperCase()}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaLocationArrow className='mr-2' /> Location</h3>
                        <span className='font-bold'>{user?.location}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaCalendar className='mr-2' /> Date de création</h3>
                        <span className='font-bold'>{user?.creationDate}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaMailBulk className='mr-2' />Mail </h3>
                        <span className='font-bold'>{user?.mail}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FaPhone className='mr-2' /> Téléphone</h3>
                        <span className='font-bold'>{user?.phone}</span>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default Profile;