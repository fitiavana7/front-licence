import React from 'react';
import Button from './Button';
interface TitleSectionPropsType{
    title : string ,
    onClick : ()=>void
}
const TitleSection : React.FC<TitleSectionPropsType> = (props) => {
    const {title , onClick} = props
    return (
        <div className='flex justify-between items-center w-full py-3'>
            <h3 className='text-2xl font-bold text-primary'>{title.toLocaleUpperCase()}</h3>
            <Button label='nouveau' onClick={onClick} type='success' />
        </div>
    );
};

export default TitleSection;