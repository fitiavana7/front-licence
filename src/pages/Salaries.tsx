import { useState } from 'react';
import CreateSalarieModal from '../modules/salaries/components/NewEmployeeDrawer';
import { InputControlled } from '../components/ui/InputControlled';
import TitleSection from '../components/ui/TitleSEction';
import EmployeeTable from '../modules/salaries/components/EmployeeTable';

const Salaries = () => {
    const [isCreatingSalarie , setIsCreatingSalarie] = useState<boolean>(false)
    return (
        <>
            <TitleSection title='liste des salariés' onClick={()=> setIsCreatingSalarie(!isCreatingSalarie)}/>
            <div>
                <InputControlled
                    placeholder='rechercher par nom'
                    onChange={()=>{}}
                    styles='my-2'
                />
            </div>
        { isCreatingSalarie && <CreateSalarieModal close={()=> setIsCreatingSalarie(!isCreatingSalarie)}/>}
            <EmployeeTable/>
        </>
    );
};

export default Salaries;