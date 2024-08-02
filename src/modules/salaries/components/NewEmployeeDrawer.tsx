import React , {FormEvent, useState} from 'react';
import { GenreData, MatrimonialeData } from '../../../components/data';
import Button from '../../../components/ui/Button';
import { InputControlled, SelectControlled, TextareaControlled } from '../../../components/ui/InputControlled';
import { inputStyles, showRequestError, showSuccessMessage } from '../../../helpers';
import useEmployee from '../../../hooks/useEmployee';
import { IEmployee } from '../../../types';
import { Step , Stepper} from 'react-form-stepper'
import { FaAngleLeft, FaAngleRight, FaBuilding, FaUser } from 'react-icons/fa' 
import { useCurrentUser } from '../../../hooks/useCurrentUser';

interface CreateMetierModalPropsType {
    close : ()=> void
}

const NewEmployeeDrawer : React.FC<CreateMetierModalPropsType> = (props) => {
    const {close} = props

    const [nom ,setNom] = useState<string>('')
    const [prenoms ,setPrenoms] = useState<string>('')
    const [age ,setAge] = useState<number>(0)
    const [adress ,setAdress] = useState<string>('')
    const [phoneNumber ,setPhoneNumber] = useState<string>('')
    const [gender ,setGender] = useState<string>('')
    const [matrimoniale ,setMatrimoniale] = useState<string>('')
    const [mail ,setMail] = useState<string>('')

    const [activeStep , setActiveStep] = useState<number>(0)

    const {create} = useEmployee()
    const {user} = useCurrentUser()

    function handleChange(e:any , inputName : string) {
        switch (inputName) {
            case 'nom':
                setNom(e.target.value)
                break;
            case 'prenoms':
                setPrenoms(e.target.value);
                break;
            case 'age':
                setAge(e.target.value);
                break;
            case 'gender':
                setGender(e.target.value);
                break;
            case 'adress':
                setAdress(e.target.value);
                break;
            case 'phoneNumber':
                setPhoneNumber(e.target.value);
                break;
            case 'matrimoniale':
                setMatrimoniale(e.target.value);
                break;
            case 'mail':
                setMail(e.target.value);
                break;
            default:
                break;
        }
    }

    function changeStep(type : string) {
        if(type === 'prev' ){
            if(activeStep != 0){ setActiveStep(activeStep -1)}
        }else{
            if(activeStep != 1){ setActiveStep(activeStep +1)}
        }
    }

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const data : IEmployee = {
            firstName : nom , lastName :  prenoms , gender , age , adress , phone : phoneNumber , matrimoniale , mail
        }
        create(data).then((e:any)=>{
            showSuccessMessage()
            close()
        }).catch((err:any)=> showRequestError())
    }

    return (
        <div className='w-full min-h-screen fixed top-0 left-0 flex justify-end items-center bg-[#000000c7]' onClick={close}>
            <div className='w-1/2 min-h-screen bg-fond rounded-md py-3 px-9' onClick={(e : any)=>e.stopPropagation()}>
                <div className='flex justify-start text-primary items-center'>
                    <FaUser className='text-xl mr-2'/>
                    <h4 className='font-bold text-xl'> AJOUT D'UN NOUVEAU SALARIÉ</h4>
                </div>
                <form onSubmit={handleSubmit} method='post' className='my-5 h-80'>
                    {
                        activeStep == 0 && (
                        <>
                            <div>
                                <h2 className='font-bold'>Nom :</h2>
                                <input 
                                    type="text"
                                    value={nom}
                                    onChange={(e)=> handleChange(e,'nom')}
                                    className={inputStyles()}
                                    placeholder='nom'
                                />
                            </div>
                            <div>
                                <h2 className='font-bold'>Prénoms :</h2>
                                <input 
                                    type="text"
                                    value={prenoms}
                                    onChange={(e)=> handleChange(e,'prenoms')}
                                    className={inputStyles()}
                                    placeholder='prenoms'
                                />
                            </div>
                            <div className='my-3'>
                                <h2 className='font-bold'>Age :</h2>
                                <input 
                                    type="number"
                                    value={age}
                                    onChange={(e)=> handleChange(e,'age')}
                                    className={inputStyles()}
                                    placeholder='age'
                                />
                            </div>
                            <div className='my-3'>
                                <SelectControlled name='gender' options={GenreData} label='Choisir le genre :' onChange={handleChange}/>
                            </div>
                        </>    
                        )
                    }
                    {
                        activeStep == 1 && (
                        <>
                            <div className='my-3'>
                                <SelectControlled name='matrimoniale' options={MatrimonialeData} label='Situation matrimoniale :' onChange={handleChange}/>
                            </div>
                            <div>
                                <h2 className='font-bold'>Téléphone :</h2>
                                <input 
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e)=> handleChange(e,'phoneNumber')}
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
                        </div>
                        <div>
                            <h2 className='font-bold'>Adresse :</h2>
                            <input 
                                type="text"
                                value={adress}
                                onChange={(e)=> handleChange(e,'adress')}
                                className={inputStyles()}
                                placeholder='adresse'
                            />
                        </div>
                        <div className='flex justify-end items-center py-5'>
                                <button type='submit' className='text-lg flex justify-center items-center text-blue-500 border border-blue-500 p-1 rounded-md'>
                                    <FaBuilding /> <span className='ml-1'>créer</span>
                                </button>
                            </div>

                        </>)
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
                    <Step key={0} label='Infos indentité' />
                    <Step key={1} label='infos personelles'/>
                </Stepper>
            </div>
        </div>
    );
};

export default NewEmployeeDrawer;