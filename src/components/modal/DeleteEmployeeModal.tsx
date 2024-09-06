import { Button, Card } from 'antd';
import React, { FC } from 'react';
import { FiStopCircle, FiTrash, FiTrash2 } from 'react-icons/fi';
import { showRequestError, showSuccessMessage } from '../../helpers';
import useEmployee from '../../hooks/useEmployee';

interface DeleteModalProps {
    close : ()=> void , 
    id : string , 
    refetch : ()=> void
}

const DeleteEmployeeModal : FC<DeleteModalProps> = ({close , id , refetch}) => {
    const { deleteEmployee} = useEmployee()

    function deleteEmp(id : string) {
        deleteEmployee(id).then((e : any)=>{
            showSuccessMessage()
            close()
            refetch()
        })
        .catch((err : any)=>{showRequestError()})
    }
    return (
        <div className='z-50 w-full min-h-screen fixed top-0 left-0 flex justify-center items-center bg-[#000000c7]' onClick={close}>
            <Card className={`animate-fadeIn w-1/3 bg-fond rounded-md py-3 px-9`} onClick={(e : any)=>e.stopPropagation()}>
                <div className='flex justify-center py-3'>
                    <FiTrash2  className='text-9xl text-red-500'/>
                </div>
                <p className='text-center font-bold text-white'>Voulez vous vraiment supprimer ce salarié ?</p>
                <div className='flex justify-end items-end my-5'>
                    <Button type='primary' onClick={close} className='flex items-center bg-blue-500'><FiStopCircle className='mr-1 text-white'/> <span className='text-white'>annuler</span></Button>
                    <Button onClick={()=>deleteEmp(id)} danger className='flex items-center bg-red-500 ml-2'><FiTrash className='mr-1 text-white' /><span className='text-white'>confirmer</span></Button>
                </div>
            </Card>
        </div>    );
};

export default DeleteEmployeeModal;