import React, { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../../components/data/backend';
import { inputStyles, isValidEmail, showRequestError, showSuccessMessage } from '../../helpers';
import useAuth from '../../hooks/useAuth';
import { Stepper , Step } from 'react-form-stepper'
import { FaAngleLeft, FaAngleRight, FaBuilding, FaPlus, FaSave, FaUserEdit } from 'react-icons/fa' 
import { ICompany } from '../../types';
import { ControlledDatePicker, ControlledInput, ControlledInputPassword } from '../../components/ui/ControlledInput';
import { Button } from 'antd';
import { FiCalendar, FiEdit2, FiLock, FiMail, FiMap, FiPhone } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const RegisterForm = () => {

    const [phone , setPhone] = useState<string>('')
    const [lieu , setLieu] = useState<string>('')
    const [nom , setNom] = useState<string>('')
    const [creationDate , setCreationDate] = useState<Date>(new Date())
    const [mail , setMail] = useState<string>('')
    const [mdp , setMdp] = useState<string>('')
    const [mdp2 , setMdp2] = useState<string>('')

    const [phoneError , setPhoneError] = useState<string>('')
    const [lieuError , setLieuError] = useState<string>('')
    const [nomError , setNomError] = useState<string>('')
    const [creationDateError , setCreationDateError] = useState<string>('')
    const [mailError , setMailError] = useState<string>('')
    const [mdpError , setMdpError] = useState<string>('')
    const [mdp2Error , setMdp2Error] = useState<string>('')

    const [activeStep , setActiveStep] = useState<number>(0)

    const {register , getCurrentUser} = useAuth()
    const navigate = useNavigate()
    const { setUser } = useCurrentUser()

    function changeStep(type : string) {
        if(type === 'prev' ){
            if(activeStep != 0){ setActiveStep(activeStep -1)}
        }else{
            if(activeStep != 2){ setActiveStep(activeStep +1)}
        }
    }

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const phoneErr = phone.length != 10
        setPhoneError(phoneErr ?'téléphone invalide' : '')
        const lieuErr = lieu.length < 2 && lieu.length > 50 
        setLieuError(lieuErr? 'location invalide' : '') 
        const nomErr = nom.length < 3 || nom.length > 100 
        setNomError(nomErr? 'nom invalide' : '') 
        const crdErr = false
        setCreationDateError(crdErr?'date invalide' : '') 
        const mailErr = !isValidEmail(mail)
        setMailError(mailErr?'mail invalide' : '') 
        const pw1Err = mdp.length < 6 
        setMdpError(pw1Err?'le mot de passe doit contenir au moins 6 caractères' : '') 
        const pw2Err = mdp !== mdp2
        setMdp2Error(pw2Err?'le mot de passe doit être identique' : '') 

        if(phoneErr || mailErr){setActiveStep(0)}
        else{ if(nomErr || lieuErr || crdErr){setActiveStep(1)}
        else{if(pw1Err || pw2Err){setActiveStep(2)}}}

        const invalid = nomErr || phoneErr || lieuErr || crdErr || mailErr || pw1Err || pw2Err
        
        if(!invalid){
            const data : ICompany = {
                mail , password : mdp , location : lieu , creationDate ,
                name : nom , phone 
            }
            register(data).then(async(e:any)=>{
                localStorage.setItem(TOKEN_KEY , e.data.token)
                const req = await getCurrentUser()
                setUser(req)
                toast.success('Compte crée avec succès')
                navigate('/' , {replace : true})
            }).catch((e:any)=> 
                toast.error('Erreur lors de la requette!')
            )
        }
    }

    return (
        <div className='w-full bg-fond'>
            <form action="" onSubmit={handleSubmit} className='pt-8 pb-2 h-80'>
                {
                    activeStep == 0 && (
                        <>
                        <ControlledInput 
                          label='Téléphone:'
                          value={phone}
                          placeholder='téléphone'
                          onChange={setPhone}
                          errorMessage={phoneError} 
                          icon={<FiPhone/>}

                        />
                        <ControlledInput 
                          label='Mail:'
                          value={mail}
                          placeholder='adrèsse mail'
                          onChange={setMail}
                          errorMessage={mailError} 
                          icon={<FiMail/>}
                        />
                    </>    
                    )
                }
                
                {
                    activeStep == 1 && (
                        <>
                        <ControlledInput 
                          label="Nom de l'entreprise:"
                          value={nom}
                          placeholder='nom'
                          onChange={setNom}
                          errorMessage={nomError} 
                          icon={<FiEdit2/>}

                        />
                        <ControlledInput 
                          label='Location:'
                          value={lieu}
                          placeholder='lieu'
                          onChange={setLieu}
                          errorMessage={lieuError} 
                          icon={<FiMap/>}
                        />
                        <ControlledDatePicker 
                          label='Date de création:'
                          value={creationDate}
                          onChange={setCreationDate}
                          errorMessage={creationDateError} 
                          icon={<FiCalendar/>}
                        />
                        </>
                    )
                }
                {
                    activeStep == 2 && (
                        <>
                            <ControlledInputPassword
                                label='Mot de passe:'
                                value={mdp}
                                placeholder='mot de passe'
                                onChange={setMdp}
                                errorMessage={mdpError} 
                                icon={<FiLock/>}
                            />
                            <ControlledInputPassword
                                label='Confirmer mot de passe:'
                                value={mdp2}
                                placeholder='mot de passe'
                                onChange={setMdp2}
                                errorMessage={mdp2Error} 
                                icon={<FiLock/>}

                            />
                            <div className='flex justify-end items-center py-5'>
                                <Button onClick={handleSubmit} type='primary' className={`py-1 px-2 bg-blue-500 flex items-center`}>
                                    <FaUserEdit className='mr-2'/> créer le compte
                                </Button>

                            </div>
                        </>
                    )
                }
            </form>
            <div className='flex justify-end items-center py-5'>
                <button onClick={()=> changeStep('prev')} className='text-lg text-blue-500 border border-blue-500 p-2 rounded-md'>
                    <FaAngleLeft />
                </button>
                <button onClick={()=> changeStep('next')} className='text-lg text-blue-500 border border-blue-500 p-2 rounded-md'>
                    <FaAngleRight />
                </button>
            </div>
            <Stepper activeStep={activeStep} >
                <Step key={0} className='bg-blue-500' label='Informations du compte' />
                <Step key={1} label="Informations de l'entreprise" />
                <Step key={2} label='Mot de passe' />
            </Stepper>
            <div>
                <NavLink to='/login'>
                    <h3 className='text-center text-slate-300 hover:underline'>j'ai dejà une compte</h3>
                </NavLink>
            </div>

        </div>
    );
};

export default RegisterForm;