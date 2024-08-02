import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='z-40 fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#000000c7]'>
            <BallTriangle 
                height={100}
                width={100}
                radius={5}
                color='#4fa94d'
                ariaLabel='ball-triangle-loading'
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
            />
        </div>
    );
};

export default Loader;