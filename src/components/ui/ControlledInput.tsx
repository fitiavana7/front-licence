import React, { FC, ReactNode } from 'react';
import { DatePicker, Input , InputNumber, Select } from 'antd'
import { FaCalendar, FaMailBulk } from 'react-icons/fa';
import { inputStyles, isOnlyDigits } from '../../helpers';
import dayjs from 'dayjs';

type ControlledInputType = {
    onChange : (e:any)=> void ,
    value : string | number ,
    errorMessage : string,
    placeholder? : string ,
    label : string ,
    classname? : string ,
    icon : ReactNode
}

export const ControlledInput : FC<ControlledInputType> = ({
    onChange : handleChange , 
    value ,
    errorMessage ,
    placeholder ,
    label,
    classname ,
    icon
    }) => {
    return (
        <div className='my-1 text-sm'>
        <div className={`border w-full border-white p-2 rounded-md flex justify-between items-center  ${classname}`}>
            <h3 className='flex w-1/3 items-center mr-2 text-primary font-bold'>{icon}<span className='ml-1'>{label}</span></h3>
            <Input 
                placeholder={placeholder}
                value={value}
                className={`w-2/3 focus:text-white hover:text-white font-bold`}
                onChange={(e:any)=> { handleChange(e.target.value) }}
            />
        </div>
        { errorMessage.length > 0 && <span className='text-red-500 text-sm ml-2'>{errorMessage}</span> }
        </div>
    );
};


export const ControlledInputPassword : FC<ControlledInputType> = ({
    onChange : handleChange , 
    value ,
    errorMessage ,
    placeholder ,
    label,
    classname
    }) => {
    return (
        <div className='my-1 text-sm'>
            <div className={`border-4 w-full border-white p-2 rounded-md flex justify-between items-center  ${classname}`}>
                <h3 className='flex w-1/3 items-center mr-2 text-primary font-bold'><FaMailBulk className='mr-2' />{label}</h3>
                <input 
                    type="password"
                    placeholder={placeholder}
                    value={value}
                    className={`w-2/3 focus:text-white hover:text-white ${inputStyles()}`}
                    onChange={(e:any)=> { handleChange(e.target.value) }}
                />
            </div>
            { errorMessage.length > 0 && <span className='text-red-500 text-sm ml-2'>{errorMessage}</span> }
        </div>
    );
};

export const ControlledInputNumber : FC<ControlledInputType> = ({
    onChange : handleChange , 
    value ,
    errorMessage ,
    placeholder ,
    label,
    classname
    }) => {
    const changeValue = (value: string | number | null) => {
        if (typeof value === 'string') {
              const numericValue = value.replace(/[^0-9]/g, '');
              const newValue = numericValue !== '' ? Number(numericValue) : undefined;
              handleChange(newValue);
            } else {
                handleChange(value as number | 0);
            }
        };
    return (
        <div className='my-1 text-sm'>
        <div className={`border w-full border-white p-2 rounded-md flex justify-between items-center  ${classname}`}>
            <h3 className='flex w-1/3 items-center mr-2 text-primary font-bold'><FaMailBulk className='mr-2' />{label}</h3>
            <InputNumber
                className={`w-2/3 hover:text-white focus:text-white font-bold`}
                placeholder={placeholder}
                value={value}
                onChange={(e)=> {
                    changeValue(e)
                }}
            />
        </div>
        { errorMessage.length > 0 && <span className='text-red-500 text-xs'>{errorMessage}</span> }
        </div>
    );
};

type ControlledSelectType = {
    onChange : (e:any)=> void ,
    value : string,
    label : string,
    options : {label : string , value : string}[],
    classname? : string
}

export const ControlledSelect : FC<ControlledSelectType> = ({
    onChange : handleChange , 
    value ,
    label ,
    options ,
    classname
    }) => {
    return (
        <div className={`border text-sm my-1 w-full border-white p-2 rounded-md flex justify-between items-center ${classname}`}>
            <h3 className='flex w-1/3 items-center mr-2 text-primary font-bold'><FaMailBulk className='mr-2' />{label}</h3>
            <Select
                defaultValue={value}
                onChange={(e:any)=> handleChange(e)} 
                className='w-2/3 hover:text-white focus:text-white font-bold'
                options={options} 
            />
        </div>
    );
};

export const ControlledTextarea : FC<ControlledInputType> = ({
    onChange : handleChange , 
    value ,
    label ,
    placeholder,
    errorMessage
    }) => {
    return (
        <div className='text-sm my-1'>
            <div className='border w-full border-white p-2 rounded-md flex justify-between items-center'>
                <h3 className='flex w-1/3 items-center mr-2 text-primary font-bold'><FaMailBulk className='mr-2' />{label}</h3>
                <textarea 
                    value={value}
                    onChange={(e)=> handleChange(e.target.value)}
                    className={`${inputStyles()} w-2/3 font-bold`}
                    placeholder={placeholder}
                />
            </div>
            { errorMessage.length > 0 && <span className='text-red-500 text-xs'>{errorMessage}</span> }
        </div>
    );
};

export const ControlledDatePicker : FC<Omit<ControlledInputType , 'value' > & { value : Date }> = ({
    onChange : handleChange , 
    label,
    classname,
    value = new Date()
    }) => {
    return (
        <div className={`border-4 text-sm my-1 w-full border-white p-2 rounded-md flex justify-between items-center  ${classname}`}>
            <h3 className='flex w-1/3 items-center mr-2 text-primary font-bold'><FaCalendar className='mr-2' />{label}</h3>
            <DatePicker 
                className='w-2/3 p-1 hover:text-white focus:text-white font-bold'
                onChange={(e)=>{handleChange(e)}}
                defaultValue={dayjs(value)}
            />
        </div>
    );
};
