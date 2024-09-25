import { Button, Card } from 'antd';
import React, { FC , useState , FormEvent} from 'react';
import { FiCalendar, FiStopCircle, FiTrash, FiTrash2 } from 'react-icons/fi';
import { isValidDateRange, showRequestError, showSuccessMessage } from '../../helpers';
import useEmployee from '../../hooks/useEmployee';
import { ControlledDatePicker } from '../ui/ControlledInput';

interface MoveModalProps {
    close : ()=> void , 
    id : string , 
    refetch : ()=> void
}

const MoveEmployeeModal : FC<MoveModalProps> = ({close , id , refetch}) => {
    const { moveEmployee} = useEmployee()

    const [date ,setDate] = useState<Date>(new Date())
    const [dateError ,setDateError] = useState<string>('')

    function handleSubmit(e : FormEvent){
        e.preventDefault()
        const dErr = !isValidDateRange(new Date() , date) 
        setDateError(dErr?'Entrer une date valide , pas dans le passé': '') 

        const invalid = dErr
        if(!invalid){
            moveEmployee({id ,leavingDate : date}).then((e : any)=>{
                showSuccessMessage()
                close()
                refetch()
            })
            .catch((err : any)=>{showRequestError()})
        }
    }
    return (
        <div className='z-50 w-full min-h-screen fixed top-0 left-0 flex justify-center items-center bg-[#000000c7]' onClick={close}>
            <Card className={`animate-fadeIn w-1/3 bg-fond rounded-md py-3 px-9`} onClick={(e : any)=>e.stopPropagation()}>
                <form action="" onSubmit={handleSubmit}>
                    <p className='text-center font-bold text-lg text-white'>Vous allez changer ce salarié en ancien salarié :</p>
                    <ControlledDatePicker 
                        errorMessage={dateError}
                        icon={<FiCalendar/>}
                        value={date}
                        onChange={setDate}
                        label='Date de depart'
                        classname='my-4'
                    />
                    <div className='flex justify-end items-end my-5'>
                        <Button type='primary' onClick={close} className='flex items-center bg-blue-500'><FiStopCircle className='mr-1 text-white'/> <span className='text-white'>annuler</span></Button>
                        <Button onClick={handleSubmit} danger className='flex items-center bg-red-500 ml-2'><FiTrash className='mr-1 text-white' /><span className='text-white'>confirmer</span></Button>
                    </div>
                </form>
            </Card>
        </div>    );
};

export default MoveEmployeeModal;