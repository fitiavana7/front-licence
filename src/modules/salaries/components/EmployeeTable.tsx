import React , { useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import useEmployee from '../../../hooks/useEmployee';
import { IEmployee } from '../../../types';

const columnList : string[] = [ 
    'nom' , 'prenoms' , 'age' , 'sexe' , 'mail' , 'téléphone' 
]

const EmployeeTable = () => {
    const {user} = useCurrentUser()
    const navigate = useNavigate()
    const { getAll } = useEmployee()
    const [data , setData] = useState<IEmployee[]>([])

    useEffect(()=>{
        getAll(user?._id || '').then((res)=>{
            setData(res.data)
        }).catch((err)=>{})
    },[])

    return (
        <div className='w-full'>
            <div className='grid grid-cols-6 gap-1'>
                {
                    columnList.map((item : string , index)=>(
                        <div className='bg-dark rounded-md p-2 text-white font-bold'>{item}</div>
                    ))
                }
            </div>
            {
                data.length > 0 ? data.map((user)=>(
                    <div 
                        className='grid grid-cols-6 gap-1 cursor-pointer bg-white rounded-md my-1 hover:bg-gray-200' 
                        onClick={()=> navigate(`/employee/${user._id}`)}
                    >
                        <div className='p-2'>{user.firstName}</div>
                        <div className='p-2'>{user.lastName}</div>
                        <div className='p-2'>{user.age}</div>
                        <div className='p-2'>{user.gender}</div>
                        <div className='p-2'>{user.mail}</div>
                        <div className='p-2'>{user.phone}</div>
                    </div>    
                )) : (
                    <div className='flex justify-center items-center font-bold text-lg py-5'>pas de données</div>
                )
            }
        </div>
    );
};

export default EmployeeTable;