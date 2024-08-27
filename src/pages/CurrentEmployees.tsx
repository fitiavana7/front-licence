import { useEffect, useState } from 'react';
import TitleSection from '../components/ui/TitleSEction';
import EmployeeTable from '../modules/salaries/components/EmployeeTable';
import { IEmployee } from '../types';
import { useCurrentUser } from '../hooks/useCurrentUser';
import useEmployee from '../hooks/useEmployee';
import { FiUsers } from 'react-icons/fi';
import NewEmployeeModal from '../modules/salaries/components/NewEmployeeModal';

const CurrentEmployees = () => {
    const [isCreatingSalarie , setIsCreatingSalarie] = useState<boolean>(false)
    const [data , setData] = useState<IEmployee[]>([])
    const {user} = useCurrentUser()
    const [isLoading , setIsLoading] = useState<boolean>(true)
    const { getAll} = useEmployee()

    useEffect(()=>{
        refetch()
    },[])

    function refetch() {
        setIsLoading(true)
        getAll(user?._id || '').then((res)=>{
            setData(res.data)
            setIsLoading(false)
        }).catch((err)=>{setIsLoading(false)})        
    }
    return (
        <>
            <TitleSection icon={<FiUsers/>} title='liste des salariés actuels' onClick={()=> setIsCreatingSalarie(!isCreatingSalarie)}/>
            { isCreatingSalarie && <NewEmployeeModal close={()=> {
                setIsCreatingSalarie(!isCreatingSalarie)
                refetch()  
            }}/>}
            <EmployeeTable isCurrentEmployees={true} data={data} isLoading={isLoading} refetch={refetch}/>
        </>
    );
};

export default CurrentEmployees;