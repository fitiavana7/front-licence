import {  FaSave, FaUser } from 'react-icons/fa' 
import { ThreeDots } from 'react-loader-spinner';
import { FiCalendar, FiMail, FiMap, FiPhone, FiUser, FiUserCheck } from 'react-icons/fi';
import { Card } from 'antd';
import { FormEvent, useState } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import useAuth from '../../hooks/useAuth';
import { ICompany } from '../../types';
import { isValidEmail, isValidHireDate, showRequestError, showSuccessMessage } from '../../helpers';
import { ControlledDatePicker, ControlledInput } from '../ui/ControlledInput';
import MaskScreen from '../ui/MaskScreen';

interface EditEmployeePropsType {
    close : ()=> void ,
}

const EditUserModal : React.FC<EditEmployeePropsType> = (props) => {
    const {close} = props

    const {user} = useCurrentUser()
    const {update} = useAuth()

    const [nom ,setNom] = useState<string>(user?.name || '')
    const [location ,setLocation] = useState<string>(user?.location || '')
    const [mail ,setMail] = useState<string>(user?.mail || '')
    const [phone ,setPhone] = useState<string>(user?.phone || '')
    const [creationDate ,setCreationDate] = useState<Date>(user?.creationDate || new Date())

    const [dateError ,setDateError] = useState<string>('')
    const [nomError ,setNomError] = useState<string>('')
    const [locationError ,setLocationError] = useState<string>('')
    const [phoneNumberError ,setPhoneNumberError] = useState<string>('')
    const [mailError ,setMailError] = useState<string>('')
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const { setUser } = useCurrentUser()
    const { getCurrentUser } = useAuth()

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const nomErr = nom.length < 2 || nom.length > 50 
        setNomError(nomErr ?'nom invalide' : '')
        const locErr = location.length < 3 || location.length > 100 
        setLocationError(locErr? 'location invalide' : '') 
        const phonErr = phone.length != 10
        setPhoneNumberError(phonErr?'telephone invalide' : '') 
        const mailErr = !isValidEmail(mail)
        setMailError(mailErr?'mail invalide' : '') 
        const dErr = !isValidHireDate(creationDate) 
        setDateError(dErr?'date invalide': '') 

        const invalid = nomErr || locErr || phonErr || mailErr || dErr
        if(!invalid){
            setIsLoading(true)
            const data : ICompany = {
                name : nom ,
                creationDate,
                location,
                phone , 
                mail
            }
            update( user?._id || '' ,data).then(async(e:any)=>{
                showSuccessMessage()
                close()
                const req = await getCurrentUser()
                setUser(req)            
                setIsLoading(false)
            }).catch((err:any)=> {
                showRequestError()
                setIsLoading(false)
            })
        }
    }

    return (
        <>
        <div className='z-50 w-full min-h-screen fixed top-0 left-0 flex justify-center items-center bg-[#000000c7]' onClick={close}>
            <Card className={`animate-fadeIn w-1/2 bg-fond`} onClick={(e : any)=>e.stopPropagation()}>
                <div className='flex justify-center text-primary items-center'>
                    <FaUser className='text-xl mr-2'/>
                    <h4 className='font-bold text-xl'> MODIFIER LES INFORMATIONS DU COMPTE</h4>
                </div>
                <form onSubmit={handleSubmit} method='post' className='mt-5'>
                    <div className='grid grid-cols-2 gap-2'>
                        <ControlledInput
                            label='Nom:'
                            value={nom}
                            placeholder='nom'
                            onChange={setNom}
                            errorMessage={nomError}
                            icon={<FiUser/>}
                        />
                        <ControlledInput
                            label='Location:'
                            value={location}
                            placeholder='location'
                            onChange={setLocation}
                            errorMessage={locationError}
                            icon={<FiMap/>}

                        />
                        <ControlledInput
                            label='Téléphone:'
                            value={phone}
                            placeholder='téléphone'
                            onChange={setPhone}
                            errorMessage={phoneNumberError}
                            icon={<FiPhone/>}

                        />
                        <ControlledInput
                            label='Mail:'
                            value={mail}
                            placeholder='mail'
                            onChange={setMail}
                            errorMessage={mailError}
                            icon={<FiMail/>}

                        />
                        <ControlledDatePicker
                            value={creationDate}
                            errorMessage={dateError}
                            icon={<FiCalendar/>}
                            label="Date de création:"
                            onChange={setCreationDate}
                        />
                    </div>
                    <div className='flex justify-end items-center py-5'>
                        <button 
                            type='submit' 
                            className='text-lg hover:bg-green-600 flex justify-center items-center text-white border bg-green-500 px-3 py-1 rounded-md'
                        >
                        {isLoading ? 
                            <ThreeDots
                                color='white'
                                height={20}
                                wrapperClass='py-2 px-4'
                            /> :
                            <><FaSave /> <span className='ml-1'>enregistrer</span></>
                        }
                        </button>
                    </div>

                </form>
            </Card>
        </div>
        {isLoading && <MaskScreen/>}
        </>
    );
};

export default EditUserModal;