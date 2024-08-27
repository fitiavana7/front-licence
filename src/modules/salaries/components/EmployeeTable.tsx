import React , { FC, useEffect , useState} from 'react';
import { FiEdit, FiEye, FiMove, FiSkipForward, FiStopCircle, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import NoData from '../../../components/ui/NoData';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import useEmployee from '../../../hooks/useEmployee';
import { IEmployee } from '../../../types';
import { Button, Input } from 'antd'
import { showRequestError, showSuccessMessage } from '../../../helpers';
import LoadingMini from '../../../components/ui/LoadingMini';
import DeleteEmployeeModal from '../../../components/modal/DeleteEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import MoveEmployeeModal from '../../../components/modal/MoveEmployeeModal';
import ViewEmployeeModal from '../../../components/modal/ViewEmployee';

const columnList : string[] = [ 
    'Nom' , 'Prenoms', 'Mail' , 'Téléphone' , 'Actions'
]

type EmployeeTableProps = {
    data : IEmployee[],
    refetch : ()=> void , 
    isLoading : boolean ,
    isCurrentEmployees : boolean
}

const EmployeeTable : FC<EmployeeTableProps> = ({data , refetch , isCurrentEmployees, isLoading}) => {
    const navigate = useNavigate()
    const [employeeToModify , setEmployeeToModify] = useState<IEmployee>()
    const [isModifying , setIsModifying] = useState<boolean>(false)
    const [idToDelete , setIdToDelete] = useState<string>('')
    const [isDeleting , setIsDeleting] = useState<boolean>(false)

    const [employeeToView , setEmployeeToView] = useState<IEmployee>()
    const [isViewing , setIsViewing] = useState<boolean>(false)

    const [idToMove , setIdToMove] = useState<string>('')
    const [isMoving , setIsMoving] = useState<boolean>(false)

    const [filtre , setFiltre] = useState<string>('')

    function modifyEmp(e: any,  employee : IEmployee) {
        e.stopPropagation()
        setIsModifying(true)
        setEmployeeToModify(employee)
    }

    return (
        <>
            <div className='w-full my-3'>
                <Input 
                    onChange={(e)=>setFiltre(e.target.value)}
                    placeholder='entrer un nom'
                />
            </div>
        <div className='w-full text-sm'>
            <div className='grid grid-cols-5 gap-1'>
                {
                    columnList.map((item : string , index)=>(
                        <div className='bg-dark rounded-md p-2 text-white font-bold'>{item}</div>
                    ))
                }
            </div>
            {
                isLoading ? <LoadingMini/>
            :
                data.filter((user)=> user.firstName.toLocaleLowerCase().includes(filtre.toLocaleLowerCase()))
                .length > 0 ? 
                data.filter((user)=> user.firstName.toLocaleLowerCase().includes(filtre.toLocaleLowerCase()))
                .map((user)=>(
                    <div 
                        className='grid grid-cols-5 gap-1 cursor-pointer bg-white rounded-md my-1 hover:bg-gray-200' 
                        onClick={()=> {
                            if(isCurrentEmployees){
                                navigate(`/employee/${user._id}`)
                            }
                        }}
                    >
                        <div className='p-2'>{user.firstName}</div>
                        <div className='p-2'>{user.lastName}</div>
                        <div className='p-2'>{user.mail}</div>
                        <div className='p-2'>{user.phone}</div>
                        <div className="p-2 flex items-center text-lg">
                            {isCurrentEmployees && (
                                <>
                                <span className='' onClick={(e)=> modifyEmp(e, user)}><FiEdit className='text-blue-500'/></span>
                                <span className='' onClick={(e)=>{
                                    e.stopPropagation()
                                    setIdToMove(user._id || '')
                                    setIsMoving(true)                                
                                }}><FiStopCircle className='text-orange-500'/></span>
                                </>
                            )
                            }
                            {!isCurrentEmployees && (
                                <>
                                    <span className='ml-2' onClick={(e)=> {
                                        e.stopPropagation()
                                        setEmployeeToView(user)
                                        setIsViewing(true)
                                    }}><FiEye className='text-blue-500'/></span>

                                    <span className='ml-2' onClick={(e)=> {
                                        e.stopPropagation()
                                        setIdToDelete(user._id || '')
                                        setIsDeleting(true)
                                    }}><FiTrash className='text-red-500'/></span>
                                </>
                            )    
                                }                        
                        </div>
                    </div>    
                )) : (
                    <NoData/>
                )
            }
        </div>
        {
            isModifying && employeeToModify && <EditEmployeeModal employee={employeeToModify} close={()=>setIsModifying(false)}/>
        }
        {
            isMoving && idToMove && 
                <MoveEmployeeModal close={()=> { 
                    setIdToMove('')
                    setIsMoving(false)
                }} 
                refetch={refetch}
                id={idToMove}
            />
        }
        {
            isViewing && employeeToView && 
                <ViewEmployeeModal close={()=> { 
                    setEmployeeToView(undefined)
                    setIsViewing(false)
                }} 
                employee={employeeToView}
            />
        }

        {
            isDeleting && idToDelete && 
                <DeleteEmployeeModal close={()=> { 
                    setIdToDelete('')
                    setIsDeleting(false)
                }} 
                refetch={refetch}
                id={idToDelete}
            />
        }
        </>
    );
};

export default EmployeeTable;
