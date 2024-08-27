import React , { useState , useEffect} from 'react';
import { FiActivity, FiEdit, FiTrash } from 'react-icons/fi';
import DeleteMetierModal from '../../../components/modal/DeleteMetierModal ';
import LoadingMini from '../../../components/ui/LoadingMini';
import MetierItem from '../../../components/ui/MetierItem';
import NoData from '../../../components/ui/NoData';
import { showRequestError, showSuccessMessage } from '../../../helpers';
import useMetier from '../../../hooks/useMetier';
import { IMetier } from '../../../types';
import EditMetierModal from './EditMetierDrawer';

const ListeMetier = () => {
    const {getAll , deleteOne} = useMetier()

    const [ metiers , setMetiers] = useState<IMetier[]>([])
    const [ isLoading , setIsLoading] = useState<boolean>(true)
    const [isModifying , setIsModifying] = useState<boolean>(false)
    const [isDeleting , setIsDeleting] = useState<boolean>(false)
    const [mToEdit , setMToEdit] = useState<IMetier>()
    const [idToDelete , setIdToDelete] = useState<string>('')


    const refetch = () => { 
        getAll().then((res)=>{
            setMetiers(res.data)
            setIsLoading(false)
        }).catch((err:any)=>{
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        refetch()
    },[])

    return (
        <>
        {
            isLoading ? <LoadingMini />
        : metiers.length > 0 ? (
            <div className='grid grid-cols-2 gap-2'>
                { metiers.map((metier)=>(
                <div className='p-5 bg-white rounded-md text-sm'>
                    <div className='flex justify-between items-center mb-3'>
                        <div className='w-5/6 border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FiActivity className='mr-2' /> Titre </h3>
                            <span className='font-bold'>{metier.title}</span>
                        </div>
                        <div className='flex items-center text-lg'>
                            <span onClick={()=>{
                                setMToEdit(metier)
                                setIsModifying(true)
                            }} className='cursor-pointer'><FiEdit className='text-blue-500'/></span>
                            <span onClick={()=> {
                                setIdToDelete(metier._id || '')
                                setIsDeleting(true)
                            }} className='ml-2 cursor-pointer'><FiTrash className='text-red-500'/></span>
                        </div>
                    </div>
                    <div className={`text-white my-2 ${metier.isInDirection ? 'bg-primary' : 'bg-red-400' } p-2 rounded-md`}>
                        <span className='font-bold'>Type : </span> {metier.isInDirection === 'oui' ? 'Metier de direction' : 'Metier simple'}
                    </div>
                    <div className='border border-primary p-2 rounded-md'>
                        {metier.description}
                    </div>
                </div>
                )) }
            </div>            
        ) : (
            <NoData/>
        )}
            {isModifying && mToEdit && <EditMetierModal metier={mToEdit} close={()=> setIsModifying(!isModifying)}/>}
            { isDeleting && idToDelete && <DeleteMetierModal refetch={refetch} id={idToDelete} close={()=> setIsDeleting(false)} /> }
        </>
    );
};

export default ListeMetier;