import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const ConnectedLayout = () => {
    return (
        <div className='flex justify-between items-start min-h-screen w-full'>
            <Sidebar />
            <div className='w-5/6 p-3 px-10 pt-28 overflow-y-scroll h-screen'>
                <Outlet/>
            </div>
        </div>
    );
};

export default ConnectedLayout;