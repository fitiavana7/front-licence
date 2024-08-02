import React, { FunctionComponent } from 'react';

interface StatItemPropsType {
    data : { label : string , value : number } ,
    color : 'red' | 'green' | 'orange' | 'blue'
}

const StatItem : FunctionComponent<StatItemPropsType> = (props) => {
    const { data , color  } = props
    let col = 'bg-red-500'
    switch (color) {
        case 'red':
            col = 'bg-red-400'
            break;
        case 'green':
            col = 'bg-green-400'
            break;
        case 'blue':
            col = 'bg-blue-400'
            break;
        case 'orange':
            col = 'bg-orange-400'
            break;            
        default:
            col = 'bg-blue-500'
            break;
    }
    return (
        <div className={`rounded-md p-3 text-white text-center ${col}`}>
            <h3 className='text-3xl font-bold'>{data.value}</h3>
            <h4 className='text-2xl'>{data.label}</h4>
        </div>
    );
};

export default StatItem;