import React from 'react';
import { LineWave, RotatingLines, ThreeCircles } from 'react-loader-spinner';

type LoadingProps = {
    size? : number
}
const LoadingMini : React.FC<LoadingProps> = ({size = '100'}) => {
    return (
        <div className='w-full py-5 flex justify-center items-center'>
            <ThreeCircles
                visible={true}
                height={size}
                width={size}
                color="skyblue"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default LoadingMini;