import React from 'react';
import { FaFolderMinus } from 'react-icons/fa';

const NoData = () => {
    return (
        <div className='w-full py-10 text-primary'>
            <div className='flex justify-center text-9xl'>
                <FaFolderMinus />
            </div>
            <h2 className='font-bold text-3xl text-center'>Aucune donnée à afficher.</h2>
        </div>
    );
};

export default NoData;