import React, { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../../components/data/backend';
import Button from '../../components/ui/Button';
import { InputControlled } from '../../components/ui/InputControlled';
import { inputStyles, showRequestError, showSuccessMessage } from '../../helpers';
import useAuth from '../../hooks/useAuth';
import { Stepper , Step } from 'react-form-stepper'
import { FaAngleLeft, FaAngleRight, FaBuilding, FaPlus } from 'react-icons/fa' 
import { ICompany } from '../../types';

const RegisterForm = () => {

    const [phone , setPhone] = useState<string>('')
    const [lieu , setLieu] = useState<string>('')
    const [nom , setNom] = useState<string>('')
    const [creation , setCreation] = useState<string>('')
    const [mail , setMail] = useState<string>('')
    const [mdp , setMdp] = useState<string>('')
    const [mdp2 , setMdp2] = useState<string>('')

    const [activeStep , setActiveStep] = useState<number>(0)

    const {register} = useAuth()
    const navigate = useNavigate()

    function handleChange(e:any , inputName : string) {
        switch (inputName) {
            case 'nom':
                setNom(e.target.value)
                break; 
            case 'phone':
                setPhone(e.target.value)
                break; 
            case 'lieu':
                setLieu(e.target.value)
                break; 
            case 'creation':
                setCreation(e.target.value)
                break;         
            case 'mail':
                setMail(e.target.value)
                break;
            case 'mdp':
                setMdp(e.target.value);
                break;
            case 'mdp2':
                setMdp2(e.target.value);
                break;
            default:
                break;
        }
    }

    function changeStep(type : string) {
        if(type === 'prev' ){
            if(activeStep != 0){ setActiveStep(activeStep -1)}
        }else{
            if(activeStep != 2){ setActiveStep(activeStep +1)}
        }
    }

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const data : ICompany = {
            mail , password : mdp , location : lieu , creationDate : creation ,
            name : nom , phone 
        }
        register(data).then((e:any)=>{
            showSuccessMessage('Compte creé avec reussie')
            localStorage.setItem(TOKEN_KEY , e.data.token)
            navigate('/' , {replace : true})
        }).catch((e:any)=> showRequestError(e.response.data.message))
    }

    return (
        <div className='w-full'>
            <form action="" onSubmit={handleSubmit} className='pt-8 pb-2 h-56'>
                {
                    activeStep == 0 && (
                        <>
                        <div>
                            <h2 className='font-bold'>Téléphone :</h2>
                            <input 
                                type="text"
                                value={phone}
                                onChange={(e)=> handleChange(e,'phone')}
                                className={inputStyles()}
                                placeholder='phone'
                            />
                        </div>
                        <div>
                            <h2 className='font-bold'>Mail :</h2>
                            <input 
                                type="text"
                                value={mail}
                                onChange={(e)=> handleChange(e,'mail')}
                                className={inputStyles()}
                                placeholder='mail'
                            />
                            <span className='text-xs text-red-500'>username invalide</span>
                        </div>
                    </>    
                    )
                }
                
                {
                    activeStep == 1 && (
                        <>
                        <div>
                            <h2 className='font-bold'>Nom de l'entreprise :</h2>
                            <input 
                                type="text"
                                value={nom}
                                onChange={(e)=> handleChange(e,'nom')}
                                className={inputStyles()}
                                placeholder='nom'
                            />
                        </div>
                        <div>
                            <h2 className='font-bold'>Lieu :</h2>
                            <input 
                                type="text"
                                value={lieu}
                                onChange={(e)=> handleChange(e,'lieu')}
                                className={inputStyles()}
                                placeholder='lieu'
                            />
                            <span className='text-xs text-red-500'>username invalide</span>
                        </div>
                        <div>
                            <h2 className='font-bold'>Date de creation :</h2>
                            <input 
                                type="date" 
                                name="" className={inputStyles()} 
                                onChange={(e)=> handleChange(e,'creation')}
                                value={creation}
                            />
                            <span className='text-xs text-red-500'>username invalide</span>
                        </div>
                        </>
                    )
                }
                {
                    activeStep == 2 && (
                        <>
                            <div>
                                <h2 className='font-bold'>Mot de passe :</h2>
                                <input 
                                    type="password"
                                    onChange={(e)=> handleChange(e,'mdp')}
                                    className={inputStyles()}
                                    placeholder='mot de passe'
                                />
                            </div>
                            <div>
                                <h2 className='font-bold'>Retaper mot de passe :</h2>
                                <input 
                                    type="password"
                                    onChange={(e)=> handleChange(e,'mdp2')}
                                    className={inputStyles()}
                                    placeholder='confirmer mot de passe'
                                />
                            </div>                        
                            <div className='flex justify-end items-center py-5'>
                                <button type='submit' className='text-lg flex justify-center items-center text-blue-500 border border-blue-500 p-1 rounded-md'>
                                    <FaBuilding /> <span className='ml-1'>créer</span>
                                </button>
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
            <Stepper activeStep={activeStep}>
                <Step key={0} label='Informations du compte' />
                <Step key={1} label="Informations de l'entreprise" />
                <Step key={2} label='Mot de passe' />
            </Stepper>
            <div>
                <NavLink to='/login'>
                    <h3 className='text-center'>j'ai dejà une compte</h3>
                </NavLink>
            </div>

        </div>
    );
};

export default RegisterForm;