import React, { FC, ReactNode } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
interface TitleSectionPropsType{
    title : string ,
    onClick : ()=>void ,
    icon : ReactNode
}
const TitleSection : React.FC<TitleSectionPropsType> = (props) => {
    const {title , onClick , icon} = props
    return (
        <div className='flex justify-between items-center w-full py-3'>
            <h3 className='text-lg flex items-center font-bold text-primary'>{icon} <span className='ml-2'>{title.toLocaleUpperCase()}</span></h3>
            <div className='flex justify-end items-center py-5'>
                <button 
                    className='text-sm flex justify-center hover:bg-green-600 items-center text-white border bg-green-500 px-3 py-1 rounded-md'
                    onClick={onClick}
                >
                    <FiPlusCircle /> <span className='ml-1'>nouveau</span>
                </button>
            </div>
        </div>
    );
};

export default TitleSection;