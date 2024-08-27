import React from 'react';
import { BallTriangle, ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='z-40 fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#000000c7]'>
            <ThreeCircles
                visible={true}
                height={'100'}
                width={'100'}
                color="skyblue"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loader;