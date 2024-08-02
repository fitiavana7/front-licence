import React from 'react';
import { SelectDataType } from '../data';

interface InputControlledPropsType {
    placeholder : string ,
    onChange : (e:any)=> void ,
    styles? : string ,
    label? : string ,
    type? : string
}

export const InputControlled : React.FC<InputControlledPropsType> = (props) => {
    const {placeholder , onChange , styles , type , label} = props
    return (
        <div className='m-1'>
            <h4 className='font-semibold'>{label}</h4>
            <input 
                type={type || 'text'}
                name=""
                onChange={onChange}
                placeholder={placeholder} 
                className={`p-2 rounded-md outline-none w-full focus:outline-blue-500 ${styles}`}
            />
        </div>
    );
};

export const TextareaControlled : React.FC<InputControlledPropsType> = (props) => {
    const {placeholder , onChange , styles, label} = props
    return (
        <div className='m-1'>
            <h4 className='font-semibold'>{label}</h4>
            <textarea 
                rows={4}
                onChange={onChange}
                placeholder={placeholder} 
                className={`p-2 rounded-md outline-none w-full focus:outline-blue-500 ${styles}`}
            />
        </div>
    );
};

interface SelectControlledPropsType {
    onChange  :(e:any , inputName :string)=>void ,
    label : string ,
    styles?  :string,
    options?: SelectDataType[],
    name : string
}

export const SelectControlled : React.FC<SelectControlledPropsType> = (props) => {
    const {onChange , styles, label , options, name} = props
    return (
        <div className='my-2 mx-1'>
            <h4 className='font-semibold'>{label}</h4>
            <select 
                onChange={(e) =>onChange(e , name)}
                className={`p-2 my-1 rounded-md outline-none w-full focus:outline-blue-500 ${styles}`}
            >
                {
                    options?.map((item : SelectDataType)=>
                        <option value={item.value}>{item.label}</option>                    
                    )
                }
            </select>
        </div>
    );
};