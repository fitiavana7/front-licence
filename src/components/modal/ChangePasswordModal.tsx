import {  FaSave, FaUser } from 'react-icons/fa' 
import { ThreeDots } from 'react-loader-spinner';
import { FiCalendar, FiLock, FiMail, FiMap, FiPhone, FiUser, FiUserCheck } from 'react-icons/fi';
import { Card } from 'antd';
import { FormEvent, useState } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import useAuth from '../../hooks/useAuth';
import { ICompany } from '../../types';
import { showRequestError, showSuccessMessage } from '../../helpers';
import { ControlledDatePicker, ControlledInput, ControlledInputPassword } from '../ui/ControlledInput';
import MaskScreen from '../ui/MaskScreen';

interface EditEmployeePropsType {
    close : ()=> void ,
}

const ChangePasswordModal : React.FC<EditEmployeePropsType> = (props) => {
    const {close} = props

    const {user} = useCurrentUser()
    const {changePassword} = useAuth()

    const [password ,setPassword] = useState<string>('')
    const [pwd1 ,setPwd1] = useState<string>('')
    const [pwd2 ,setPwd2] = useState<string>('')

    const [pwdError ,setPwdError] = useState<string>('')
    const [pwd1Error ,setPwd1Error] = useState<string>('')
    const [pwd2Error ,setPwd2Error] = useState<string>('')
    const [isLoading , setIsLoading] = useState<boolean>(false)

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const pwdErr = password.length < 6
        const pwd1Err = pwd1.length < 6
        const pwd2Err = pwd2 !== pwd1
        setPwdError(pwdErr ?'mot de passe invalide' : '') 
        setPwd1Error(pwd1Err ? 'mot de passe invalide' : '') 
        setPwd2Error(pwd2Err ? 'le mot de passe doit être identique' : '') 
        const invalid = pwdErr || pwd1Err || pwd2Err
        if(!invalid){
            setIsLoading(true)
            const data = {
                password ,
                newPassword : pwd1
            }
            changePassword( user?._id || '' ,data).then((e:any)=>{
                showSuccessMessage()
                close()
                setIsLoading(false)
            }).catch((err:any)=> {
                showRequestError('Mot de passe actuel incorrect')
                setIsLoading(false)
            })
        }
    }

    return (
        <>
        <div className='z-50 w-full min-h-screen fixed top-0 left-0 flex justify-center items-center bg-[#000000c7]' onClick={close}>
            <Card className={`animate-fadeIn w-1/3 bg-fond`} onClick={(e : any)=>e.stopPropagation()}>
                <div className='flex justify-center text-primary items-center'>
                    <FaUser className='text-xl mr-2'/>
                    <h4 className='font-bold text-xl'> CHANGER DE MOT DE PASSE</h4>
                </div>
                <form onSubmit={handleSubmit} method='post' className='mt-5'>
                    <div className='grid grid-cols-1 gap-2'>
                        <ControlledInputPassword
                            label='Mot de passe actuel:'
                            value={password}
                            placeholder='mot de passe actuel'
                            onChange={setPassword}
                            errorMessage={pwdError}
                            icon={<FiLock/>}
                        />
                        <ControlledInputPassword
                            label='Nouveau mot de passe'
                            value={pwd1}
                            placeholder='nouveau mot de passe'
                            onChange={setPwd1}
                            errorMessage={pwd1Error}
                            icon={<FiLock/>}
                        />
                        <ControlledInputPassword
                            label='Confirmer mot de passe'
                            value={pwd2}
                            placeholder='confirmer mot de passe'
                            onChange={setPwd2}
                            errorMessage={pwd2Error}
                            icon={<FiLock/>}
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

export default ChangePasswordModal;