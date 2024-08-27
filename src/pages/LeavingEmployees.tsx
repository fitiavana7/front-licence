import { useEffect, useState } from 'react';
import TitleSection from '../components/ui/TitleSEction';
import EmployeeTable from '../modules/salaries/components/EmployeeTable';
import { IEmployee } from '../types';
import { useCurrentUser } from '../hooks/useCurrentUser';
import useEmployee from '../hooks/useEmployee';
import { FiUsers } from 'react-icons/fi';
import NewEmployeeModal from '../modules/salaries/components/NewEmployeeModal';

const LeavingEmployees = () => {
    const [isCreatingSalarie , setIsCreatingSalarie] = useState<boolean>(false)
    const [data , setData] = useState<IEmployee[]>([])
    const {user} = useCurrentUser()
    const [isLoading , setIsLoading] = useState<boolean>(true)
    const { getOldEmployees} = useEmployee()

    useEffect(()=>{
        refetch()
    },[])

    function refetch() {
        setIsLoading(true)
        getOldEmployees(user?._id || '').then((res)=>{
            setData(res.data)
            setIsLoading(false)
        }).catch((err)=>{setIsLoading(false)})        
    }
    return (
        <>
            <div className='flex justify-start items-center w-full py-8'>
               <h3 className='text-lg flex items-center font-bold text-primary'><FiUsers /> <span className='ml-2'>LISTE DES ANCIENS SALARIÉS</span></h3>
            </div>
            { isCreatingSalarie && <NewEmployeeModal close={()=> {
                setIsCreatingSalarie(!isCreatingSalarie)
                refetch()  
            }}/>}
            <EmployeeTable isCurrentEmployees={false} data={data} isLoading={isLoading} refetch={refetch}/>
        </>
    );
};

export default LeavingEmployees;