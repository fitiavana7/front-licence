import React , { useState , useEffect} from 'react';
import MetierItem from '../../../components/ui/MetierItem';
import { showRequestError, showSuccessMessage } from '../../../helpers';
import useMetier from '../../../hooks/useMetier';
import { IMetier } from '../../../types';

const ListeMetier = () => {
    const {getAll , deleteOne} = useMetier()

    const [ metiers , setMetiers] = useState<IMetier[]>([])

    const refetch = () => { 
        getAll().then((res)=>{
            setMetiers(res.data)
        }).catch((err:any)=>{})
    }

    useEffect(()=>{
        refetch()
    },[])

    const deleteMetier = (id  :string)=>{
        deleteOne(id).then((e)=>{
            showSuccessMessage('Metier supprimé')
            refetch()
        }).catch((err:any)=> showRequestError())
    }

    return (
        <div className='grid grid-cols-2 gap-2'>
            {
                metiers.length > 0 ?
                metiers.map((metier)=>(
                    <MetierItem delete={deleteMetier} metier={metier} key={metier._id}/>
                ))
                : (
                    <h4 className='text-center font-bold'>Pas de données</h4>
                )
            }
        </div>
    );
};

export default ListeMetier;