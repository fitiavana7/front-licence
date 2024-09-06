import React, { FormEvent, useState } from 'react';
import { inputStyles, showRequestError, showSuccessMessage } from '../../../helpers';
import useMetier from '../../../hooks/useMetier';
import { IMetier } from '../../../types';
import { FaBriefcase } from 'react-icons/fa'
import { ControlledInput, ControlledInputNumber, ControlledSelect, ControlledTextarea } from '../../../components/ui/ControlledInput';
import { FiEdit2, FiMessageSquare, FiSave } from 'react-icons/fi';
import { Card } from 'antd';

interface ModifyMetierModalPropsType {
    close : ()=> void , 
    metier : IMetier , 
    refetch : ()=> void
}

const directionSelectData = [
    {
        label : 'Oui' ,
        value : 'oui'
    },
    {
        label : 'Non' ,
        value : 'non'
    }
]

const EditMetierModal : React.FC<ModifyMetierModalPropsType> = ({close , refetch , metier}) => {

    
    const {update} = useMetier()
    const [titre , setTitre] = useState<string>(metier.title)
    const [isInDirection , SetIsInDirection] = useState<string>(metier.isInDirection)
    const [description , setDescription] = useState<string>(metier.description)
    const [titreError , setTitreError] = useState<string>('')
    const [descriptionError , setDescriptionError] = useState<string>('')

    const handleSubmit = (e : FormEvent) =>{
        e.preventDefault()
        const titErr = titre.length < 2 || titre.length > 50 
        setTitreError(titErr ?'titre invalide' : '')
        const descErr = description.length < 3 || description.length > 150 
        setDescriptionError(descErr? 'description invalide' : '') 

        const invalid = titErr || descErr
        if(!invalid){
            const data : IMetier = {
                title : titre, description , isInDirection
            }
            update(metier._id || '', data).then((e:any)=>{
                showSuccessMessage()
                refetch()
                close()
            }).catch((err:any)=> showRequestError())
        }
    }
    return (
    <>
        <div className='z-50 w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-[#000000c7]' onClick={close}>
            <Card className='animate-fadeIn w-1/2 text-black bg-fond' onClick={(e : any)=>e.stopPropagation()}>
                <div className='flex justify-center text-primary items-center'>
                    <FaBriefcase className='text-xl mr-2'/>
                    <h4 className='font-bold text-xl'>MODIFICATION METIER</h4>
                </div>
                <form method='post' onSubmit={handleSubmit} className='mt-5'>
                    <ControlledInput
                        label='Titre du metier :'
                        onChange={setTitre}
                        value={titre}
                        classname='mb-4'
                        errorMessage={titreError}
                        icon={<FiEdit2/>}

                    />
                    <ControlledSelect
                        label='Metier dans le direction:'
                        value={String(isInDirection)}
                        onChange={SetIsInDirection}
                        options={directionSelectData}
                    />
                    <ControlledTextarea
                        label='Description :'
                        onChange={setDescription}
                        placeholder='description'
                        value={description}
                        errorMessage={descriptionError}
                        icon={<FiMessageSquare/>}

                    />
                    <div className='flex justify-end items-center'>
                        <button 
                            type='submit' 
                            className='text-sm flex hover:bg-green-600 justify-center items-center text-white border bg-green-500 px-3 py-1 rounded-md'
                        >
                            <FiSave /> <span className='ml-1'>enregistrer</span>
                        </button>
                    </div>
                </form>

            </Card>
        </div>
    </>
    );
};

export default EditMetierModal;