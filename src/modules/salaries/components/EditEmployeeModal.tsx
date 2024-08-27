import React , {FormEvent, useState} from 'react';
import { GenreData, MatrimonialeData } from '../../../components/data';
import Button from '../../../components/ui/Button';
import { InputControlled, SelectControlled, TextareaControlled } from '../../../components/ui/InputControlled';
import { inputStyles, showRequestError, showSuccessMessage } from '../../../helpers';
import useEmployee from '../../../hooks/useEmployee';
import { IEmployee } from '../../../types';
import { Step , Stepper} from 'react-form-stepper'
import {  FaSave, FaUser } from 'react-icons/fa' 
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { ControlledDatePicker, ControlledInput, ControlledInputNumber, ControlledSelect } from '../../../components/ui/ControlledInput';
import MaskScreen from '../../../components/ui/MaskScreen';
import { ThreeDots } from 'react-loader-spinner';
import { FiCalendar, FiMail, FiMap, FiPhone, FiUser, FiUserCheck } from 'react-icons/fi';
import { Card } from 'antd';

interface EditEmployeePropsType {
    close : ()=> void ,
    employee : IEmployee
}

const EditEmployeeModal : React.FC<EditEmployeePropsType> = (props) => {
    const {close , employee} = props

    const [nom ,setNom] = useState<string>(employee.firstName)
    const [prenoms ,setPrenoms] = useState<string>(employee.lastName)
    const [age ,setAge] = useState<number>(employee.age)
    const [adress ,setAdress] = useState<string>(employee.adress)
    const [phoneNumber ,setPhoneNumber] = useState<string>(employee.phone)
    const [gender ,setGender] = useState<string>(employee.gender)
    const [matrimoniale ,setMatrimoniale] = useState<string>(employee.matrimoniale)
    const [mail ,setMail] = useState<string>(employee.mail)
    const [hiringDate ,setHiringDate] = useState<Date>(new Date())

    const [dateError ,setDateError] = useState<string>('')
    const [nomError ,setNomError] = useState<string>('')
    const [prenomsError ,setPrenomsError] = useState<string>('')
    const [ageError ,setAgeError] = useState<string>('')
    const [adressError ,setAdressError] = useState<string>('')
    const [phoneNumberError ,setPhoneNumberError] = useState<string>('')
    const [mailError ,setMailError] = useState<string>('')
    const [isLoading , setIsLoading] = useState<boolean>(false)

    const {create} = useEmployee()
    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const nomErr = nom.length < 2 || nom.length > 50 
        setNomError(nomErr ?'nom invalide' : '')
        const ageErr = age < 18 || age > 100 
        setAgeError(ageErr? 'age invalide' : '') 
        const addrErr = adress.length < 3 || adress.length > 100 
        setAdressError(addrErr? 'adresse invalide' : '') 
        const phonErr = phoneNumber.length != 10
        setPhoneNumberError(phonErr?'telephone invalide' : '') 
        const mailErr = mail.length < 2 || mail.length > 50
        setMailError(mailErr?'mail invalide' : '') 

        const invalid = nomErr || ageErr || addrErr || phonErr || mailErr
        if(!invalid){
            setIsLoading(true)
            const data : IEmployee = {
                firstName : nom , hiringDate, isCurrentEmployee : true , lastName :  prenoms , gender , age , adress , phone : phoneNumber , matrimoniale , mail
            }
            create(data).then((e:any)=>{
                showSuccessMessage()
                close()
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
                    <h4 className='font-bold text-xl'> MODIFIER UN SALARIÉ</h4>
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
                            label='Prénoms:'
                            value={prenoms}
                            placeholder='prenom'
                            onChange={setPrenoms}
                            errorMessage={prenomsError}
                            icon={<FiUserCheck/>}

                        />
                        <ControlledInputNumber
                            label='Age:'
                            value={age}
                            placeholder='age'
                            onChange={setAge}
                            errorMessage={ageError}
                            icon={<FiUserCheck/>}
                        />
                        <ControlledInput
                            label='Téléphone:'
                            value={phoneNumber}
                            placeholder='téléphone'
                            onChange={setPhoneNumber}
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
                        <ControlledInput
                            label='Adresse:'
                            value={adress}
                            placeholder='adresse'
                            onChange={setAdress}
                            errorMessage={adressError}
                            icon={<FiMap/>}

                        />
                        <ControlledSelect
                            label='Genre:'
                            value={gender}
                            onChange={setGender}
                            options={GenreData}
                        />
                        <ControlledSelect
                            label='Situation matrimoniale:'
                            value={matrimoniale}
                            onChange={setMatrimoniale}
                            options={MatrimonialeData}
                        />
                        <ControlledDatePicker
                            value={hiringDate.toString()}
                            errorMessage={dateError}
                            icon={<FiCalendar/>}
                            label="Date d'embauche:"
                            onChange={setHiringDate}
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

export default EditEmployeeModal;