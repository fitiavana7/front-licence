import React , {useState} from 'react';
import { FiActivity } from 'react-icons/fi';
import TitleSection from '../components/ui/TitleSEction';
import ListeMetier from '../modules/metiers/component/ListeMetier';
import NewMetierDrawer from '../modules/metiers/component/NewMetierModal';

const Metiers = () => {
    const [isCreatingMetier , setIsCreatingMetier] = useState<boolean>(false)
    return (
        <>
            <TitleSection icon={<FiActivity/>} title='liste des metiers' onClick={()=>setIsCreatingMetier(!isCreatingMetier)}/>
            <ListeMetier/>
            { isCreatingMetier && <NewMetierDrawer close={()=> setIsCreatingMetier(!isCreatingMetier)}/>}
        </>
    );
};

export default Metiers;