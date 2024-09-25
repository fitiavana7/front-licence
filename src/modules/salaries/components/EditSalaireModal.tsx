import React , {FormEvent, useEffect, useState} from 'react';
import { isValidDateRange, showRequestError, showSuccessMessage, showWarningMessage } from '../../../helpers';
import { IEmployee, IMetier, ISalary } from '../../../types';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import useMetier from '../../../hooks/useMetier';
import useSalary from '../../../hooks/useSalary';
import { ControlledDatePicker, ControlledInputNumber, ControlledSelect, ControlledTextarea } from '../../../components/ui/ControlledInput';
import { FiCalendar, FiMessageSquare, FiSave, FiShoppingCart } from 'react-icons/fi';
import { FaMoneyBillWave } from 'react-icons/fa';
import { Card } from 'antd';

interface EditSalaireDrawerPropsType {
    close : ()=> void,
    employeeId : string,
    lastChange? : Date
}

const EditSalaireModal : React.FC<EditSalaireDrawerPropsType> = ({close,employeeId , lastChange}) => {

    const [metiers ,setMetiers] = useState<IMetier[]>([])

    const [date ,setDate] = useState<Date>(new Date())
    const [amount ,setAmount] = useState<number>(0)
    const [description ,setDescription] = useState<string>('')
    const [metier ,setMetier] = useState<string>('')

    const [dateError ,setDateError] = useState<string>('')
    const [amountError ,setAmountError] = useState<string>('')
    const [descriptionError ,setDescriptionError] = useState<string>('')
    const [isLoading , setIsLoading] = useState<boolean>(false)

    const {createSalary} = useSalary()
    const {getAll} = useMetier()
    const {user} = useCurrentUser()

    useEffect(()=>{
        getAll().then((e)=>{
            setMetiers(e.data)
        }).catch((err:any)=>{})
    },[])

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        if(metier.length < 1){
            showWarningMessage('Veuiller choisir le metier...')
        }else{
            const amountErr = amount < 1 
            setAmountError(amountErr ?'montant invalide' : '')
            const descErr = description.length < 2 || description.length > 100 
            setDescriptionError(descErr? 'description invalide' : '') 
            const dErr = ( lastChange && !isValidDateRange(lastChange , date))
            setDateError(dErr ? 'Le date doit depasser la dernière date de changement' : '')
            const invalid = amountErr || descErr || dErr
            if(!invalid){
                const data : ISalary = {
                    amount , applicationDate : date , description ,
                    employeeId , userId : user?._id || '' , workId : metier
                }
                setIsLoading(true)
                createSalary(data).then((e:any)=>{
                    showSuccessMessage()
                    close()
                    setIsLoading(false)
                }).catch((err:any)=>{
                showRequestError()
                    setIsLoading(false)
                })
            }    
        }
    }

    return (
        <div className='w-full z-50 min-h-screen fixed top-0 left-0 flex justify-center items-center bg-[#000000c7]' onClick={close}>
            <Card className='animate-fadeIn w-1/2 bg-fond' onClick={(e : any)=>e.stopPropagation()}>
                <div className='flex justify-center text-primary items-center'>
                    <FaMoneyBillWave className='text-xl mr-2'/>
                    <h4 className='font-bold text-xl'>MODIFICATION SALAIRE</h4>
                </div>
                <form onSubmit={handleSubmit} method='post' className='mt-5'>
                    <ControlledDatePicker
                        label='Date du changement'
                        onChange={setDate}
                        value={date}
                        classname='mb-4'
                        errorMessage={dateError}
                        icon={<FiCalendar/>}

                    />
                    <ControlledSelect
                        label='Metier :'
                        onChange={setMetier}
                        options={metiers.map((el:IMetier)=>({
                            label : el.title ,
                            value : el._id || ''
                        }))}
                        value={metier} 
                        classname='mb-4'
                    />
                    < ControlledInputNumber
                        label='Salaire :'
                        onChange={setAmount}
                        value={amount}
                        classname='mb-4'
                        errorMessage={amountError}
                        icon={<FaMoneyBillWave/>}

                    />
                    <ControlledTextarea
                        label='Description du changement'
                        onChange={setDescription}
                        value={description}
                        classname='mb-4'
                        placeholder='description'
                        errorMessage={descriptionError}
                        icon={<FiMessageSquare/>}

                    />
                    <div className='flex justify-end items-center'>
                        <button 
                            className='text-sm hover:bg-green-600 flex justify-center items-center text-white border bg-green-500 px-3 py-1 rounded-md'
                            type='submit'
                        >
                            <FiSave /> <span className='ml-1'>créer</span>
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default EditSalaireModal;