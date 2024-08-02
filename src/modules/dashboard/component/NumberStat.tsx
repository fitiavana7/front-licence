import React from 'react';
import StatItem from '../../../components/ui/StatItem';

const NumberStat = () => {
    return (
        <div className='grid grid-cols-4 gap-2'>
            <StatItem color='green' data={{label : 'salariés' , value : 3000}}/>
            <StatItem color='red' data={{label : 'par mois dues' , value : 30000000}}/>
            <StatItem color='orange' data={{label : 'total payés' , value : 3000}}/>
            <StatItem color='blue' data={{label : 'chefs' , value : 30}}/>
        </div>
    );
};

export default NumberStat;