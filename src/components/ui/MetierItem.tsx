import React, { useState , FunctionComponent } from 'react';
import EditMetierDrawer from '../../modules/metiers/component/EditMetierDrawer';
import { IMetier } from '../../types';
import Button from './Button';
import { Card } from 'antd'

type MetierProps = {
    metier : IMetier,
    delete :  (id : string)=> void
}

const MetierItem : FunctionComponent<MetierProps> = ({metier , delete : deleteMetier}) => {
    const [isShowingMenu , setIsShowingMenu] = useState<boolean>(false)
    const [isModifying , setIsModifying] = useState<boolean>(false)

    function showModal() {
        setIsModifying(!isModifying)
        setIsShowingMenu(!isShowingMenu)
    }

    return (
        <Card>
            {isModifying && <EditMetierDrawer metier={metier} close={()=> setIsModifying(!isModifying)}/>}
            <div className='flex justify-between items-center p-1 relative'>
                <h4 className='font-bold text-xl'>{metier.title}</h4>                
                <Button label='...' onClick={()=>{setIsShowingMenu(!isShowingMenu)}} type='primary'/>
                {
                    isShowingMenu &&
                    <div className='absolute grid grid-cols-1 text-black top-10 right-1 bg-white w-32 rounded-md'>
                        <button onClick={showModal} className='bg-slate-100 text-center py-1 hover:bg-gray-400 hover:text-white'>modifier</button>
                        <button onClick={()=> deleteMetier(metier._id || '')} className='bg-slate-100 text-center py-1 hover:bg-gray-400 hover:text-white'>supprimer</button>
                    </div>
                }
            </div> 
            <h4> <span className='font-bold'>Salaire mensuel : </span> {metier.salary} ar</h4>
            <p className='text-justify'>{metier.description}</p>
        </Card>
    );
};

export default MetierItem;