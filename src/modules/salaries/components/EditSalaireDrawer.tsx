import React , {FormEvent, useEffect, useState} from 'react';
import { GenreData, MatrimonialeData } from '../../../components/data';
import Button from '../../../components/ui/Button';
import { InputControlled, SelectControlled, TextareaControlled } from '../../../components/ui/InputControlled';
import { inputStyles, showRequestError, showSuccessMessage } from '../../../helpers';
import useEmployee from '../../../hooks/useEmployee';
import { IEmployee, IMetier, ISalary } from '../../../types';
import { FaMoneyBill } from 'react-icons/fa' 
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { Select , Input , InputNumber , DatePicker} from 'antd'
import useMetier from '../../../hooks/useMetier';
import useSalary from '../../../hooks/useSalary';

interface EditSalaireDrawerPropsType {
    close : ()=> void,
    employeeId : string
}

const EditSalaireDrawer : React.FC<EditSalaireDrawerPropsType> = ({close,employeeId}) => {

    const [metiers ,setMetiers] = useState<IMetier[]>([])

    const [date ,setDate] = useState<string>('')
    const [amount ,setAmount] = useState<number>(0)
    const [description ,setDescription] = useState<string>('')
    const [metier ,setMetier] = useState<string>('')

    const {createSalary} = useSalary()
    const {getAll} = useMetier()
    const {user} = useCurrentUser()

    useEffect(()=>{
        getAll().then((e)=>{
            setMetiers(e.data)
        }).catch((err:any)=>{})
    },[])

    function handleChange(e:any , inputName : string) {
        switch (inputName) {
            case 'amount':
                if(e)
                setAmount(e);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const data : ISalary = {
            amount , applicationDate : date , description ,
            employeeId , userId : user?._id || '' , workId : metier
        }

        createSalary(data).then((e:any)=>{
            showSuccessMessage()
            close()
        }).catch((err:any)=> showRequestError())
    }

    return (
        <div className='w-full min-h-screen fixed top-0 left-0 flex justify-end items-center bg-[#000000c7]' onClick={close}>
            <div className='w-1/2 min-h-screen bg-fond rounded-md py-3 px-9' onClick={(e : any)=>e.stopPropagation()}>
                <div className='flex justify-start text-primary items-center'>
                    <FaMoneyBill className='text-xl mr-2'/>
                    <h4 className='font-bold text-xl'>MODIFICATION SALAIRE</h4>
                </div>
                <form onSubmit={handleSubmit} method='post' className='my-5 h-80'>
                    <div className='my-3'>
                        <h2 className='font-bold'>Date du changement :</h2>
                        <DatePicker 
                            className='w-full p-1'
                            onChange={(e)=>{setDate(e?.format('DD/MM/YYYY') || '')}}
                        />
                    </div>
                    <div className="my-3">
                        <h2 className='font-bold'>Metier :</h2>
                        <Select
                            defaultValue=''
                            onChange={setMetier} 
                            className='w-full'
                            options={metiers.map((el:IMetier)=>({
                                label : el.title ,
                                value : el._id || ''
                            }))} 
                        />
                    </div>
                    <div className="my-3">
                        <h2 className='font-bold'>Salaire :</h2>
                        <InputNumber
                            value={amount}
                            onChange={(e)=>handleChange(e,'amount')} 
                            className='w-full p-1'
                        />
                    </div>
                    <div className="my-3">
                        <h2 className='font-bold'>Description du changement :</h2>
                        <Input
                            onChange={(e)=>handleChange(e,'description')} 
                            className='w-full p-1'
                            value={description}
                        />
                    </div>
                    <div className='my-3'>
                        <button type='submit' className={`${inputStyles()}`}>
                            créer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSalaireDrawer;