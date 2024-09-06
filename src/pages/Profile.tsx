import React, { useState } from 'react';
import {Card} from 'antd' 
import { FaBuilding, FaCalendar, FaInfo, FaLocationArrow, FaMailBulk, FaPhone, FaUser } from 'react-icons/fa'
import { useCurrentUser } from '../hooks/useCurrentUser';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FiCalendar, FiEdit, FiFacebook, FiInfo, FiLock, FiMail, FiMap, FiPhone, FiUser, FiUserCheck } from 'react-icons/fi';
import EditUserModal from '../components/modal/EditUserModal';
import ChangePasswordModal from '../components/modal/ChangePasswordModal';

const Profile = () => {
    const { user } = useCurrentUser()
    const [isModifying , setIsModifying] = useState<boolean>(false)
    const [isChangePwd , setIsChangePwd] = useState<boolean>(false)
    return (
        <>
            { isModifying && <EditUserModal close={()=> setIsModifying(false)}/> }
            { isChangePwd && <ChangePasswordModal close={()=> setIsChangePwd(false)}/> }
            <Card className='p-2 my-2 text-lg'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <FiUser className='text-7xl' />
                        <div className=''>
                            <span className='text-2xl font-bold text-blue-500'>{user?.name.toLocaleUpperCase()}</span>
                            <h4 className='font-bold text-xl'>7 salariés</h4>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <button 
                            className='text-lg hover:bg-orange-600 flex justify-center items-center text-white border bg-orange-500 px-3 py-1 rounded-md'
                            onClick={()=> setIsChangePwd(true)}
                        >
                            <FiLock/> <span>Changer mot de passe</span>
                        </button>
                        <button 
                            className='text-lg ml-2 hover:bg-blue-600 flex justify-center items-center text-white border bg-blue-500 px-3 py-1 rounded-md'
                            onClick={()=> setIsModifying(true)}
                        >
                            <FiEdit/> <span>Modifier</span>
                        </button>
                    </div>
                </div>
                <div className='flex justify-start items-center py-3 mt-10'>
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