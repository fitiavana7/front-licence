import React, { FunctionComponent } from 'react';

interface ButtonPropsType {
    onClick : ()=> void ,
    type : 'primary' | 'error' | 'success' | 'warning',
    label : string , 
    styles?  :string ,
    actionType? : 'submit' | 'reset'
}

const Button : FunctionComponent<ButtonPropsType> = (props) => {
    const { type , onClick , label , styles ,actionType } = props
    let color = 'bg-red-500'
    switch (type) {
        case 'primary':
            color = 'bg-blue-500'
            break;
        case 'success':
            color = 'bg-green-500'
            break;
        case 'error':
            color = 'bg-red-500'
            break;
        case 'warning':
            color = 'bg-orange-500'
            break;            
        default:
            color = 'bg-blue-500'
            break;
    }
    return (
        <button onClick={onClick} type={actionType} className={`px-2 py-1 rounded-md text-white ${color} ${styles}`}>
            {label}
        </button>
    );
};

export default Button;