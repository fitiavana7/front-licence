import React, { useState , FunctionComponent } from 'react';
import EditMetierDrawer from '../../modules/metiers/component/EditMetierDrawer';
import { IMetier } from '../../types';
import { Card , Button } from 'antd'
import { FiActivity , FiEdit , FiTrash } from 'react-icons/fi';
import { inputStyles } from '../../helpers';

type MetierProps = {
    metier : IMetier,
    delete :  (id : string)=> void
}

const MetierItem : FunctionComponent<MetierProps> = ({metier , delete : deleteMetier}) => {
    const [isShowingMenu , setIsShowingMenu] = useState<boolean>(false)
    const [isModifying , setIsModifying] = useState<boolean>(false)
    const [isDeleting , setIsDeleting] = useState<boolean>(false)
    const [idToDelete , setIdToDelete] = useState<string>('')

    function showModal() {
        setIsModifying(!isModifying)
        setIsShowingMenu(!isShowingMenu)
    }

    return (
    <>
        {/* {isModifying && <EditMetierDrawer metier={metier} close={()=> setIsModifying(!isModifying)}/>} */}
        <div className='p-5 bg-white rounded-md text-sm'>
            <div className='flex justify-between items-center mb-3'>
                <div className='w-5/6 border border-primary p-2 rounded-md flex justify-between items-center'>
                    <h3 className='flex items-center text-primary font-bold'><FiActivity className='mr-2' /> Titre </h3>
                    <span className='font-bold'>{metier.title}</span>
                </div>
                <div className='flex items-center text-lg'>
                    <span onClick={showModal} className='cursor-pointer'><FiEdit className='text-blue-500'/></span>
                    <span onClick={()=> deleteMetier(metier._id || '')} className='ml-2 cursor-pointer'><FiTrash className='text-red-500'/></span>
                </div>
            </div>
            <div className={`text-white my-2 ${metier.isInDirection ? 'bg-primary' : 'bg-red-400' } p-2 rounded-md`}>
                <span className='font-bold'>Type : </span> {metier.isInDirection === 'oui' ? 'Metier de direction' : 'Metier simple'}
            </div>
            <div className='border border-primary p-2 rounded-md'>
                {metier.description}
            </div>
        </div>
        </>
    );
};

export default MetierItem;