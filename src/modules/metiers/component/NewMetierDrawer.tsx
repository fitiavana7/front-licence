import React, { FormEvent, useState } from 'react';
import Button from '../../../components/ui/Button';
import { InputControlled, TextareaControlled } from '../../../components/ui/InputControlled';
import { inputStyles, showRequestError, showSuccessMessage } from '../../../helpers';
import useMetier from '../../../hooks/useMetier';
import { IMetier } from '../../../types';
import {FaBriefcase} from 'react-icons/fa'

interface CreateMetierModalPropsType {
    close : ()=> void
}

const NewMetierDrawer : React.FC<CreateMetierModalPropsType> = (props) => {
    const {close} = props

    const {create} = useMetier()
    const [titre , setTitre] = useState<string>('')
    const [salaire , setSalaire] = useState<number>(0)
    const [description , setDescription] = useState<string>('')

    function handleChange( e : any ,inputName : string) {
        switch (inputName) {
            case 'titre':
                setTitre(e.target.value)
                break;
            case 'salaire' :
                setSalaire(e.target.value)
                break;
            case 'description' :
                setDescription(e.target.value)
                break;
            default:
                setTitre(e.target.value)
                break;
        }
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const data : IMetier = {
            title : titre , salary :  salaire , description
        }
        create(data).then((e:any)=>{
            showSuccessMessage()
            close()
        }).catch((err:any)=> showRequestError())
    }

    return (
    <form action="" onSubmit={handleSubmit}>
        <div className='w-full h-screen fixed top-0 left-0 flex justify-end items-center bg-[#000000c7]' onClick={close}>
            <div className='w-1/3 min-h-screen bg-fond rounded-md py-3 px-9' onClick={(e : any)=>e.stopPropagation()}>
                <div className='flex justify-start text-primary items-center'>
                    <FaBriefcase className='text-xl mr-2'/>
                    <h4 className='font-bold text-xl'>AJOUT D'UN NOUVEAU METIER</h4>
                </div>
                <div className='my-5'>
                    <div className='my-3'>
                        <h2 className='font-bold'>Titre du metier :</h2>
                            <input 
                                type="text"
                                value={titre}
                                onChange={(e)=> handleChange(e,'titre')}
                                className={inputStyles()}
                                placeholder='titre'
                            />

                    </div>
                    <div className='my-3'>
                        <h2 className='font-bold'>Salaire de base :</h2>
                        <input 
                            type="number"
                            value={salaire}
                            onChange={(e)=> handleChange(e,'salaire')}
                            className={inputStyles()}
                            placeholder='salaire'
                        />
                    </div>
                    <div className='my-3'>
                        <h2 className='font-bold'>Description du poste :</h2>
                        <textarea 
                            value={description}
                            onChange={(e)=> handleChange(e,'description')}
                            className={inputStyles()}
                            placeholder='description'
                        />
                    </div>
                </div>
                <div className='flex justify-end items-center'>
                    <Button actionType='submit' label='AJOUTER' styles='p-3 text-lg font-bold' onClick={()=>{}} type='primary' />
                </div>
            </div>
        </div>
    </form>
    );
};

export default NewMetierDrawer;