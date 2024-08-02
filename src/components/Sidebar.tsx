import { Link, useLocation } from 'react-router-dom';
import { sideRoutes } from './data/routes';

const Sidebar = () => {
    const location = useLocation()    

    return (
        <div className='w-1/6 bg-fond min-h-screen p-3 pt-28'>
            <div>
            {
                sideRoutes.map((item,index)=>(
                    <Link to={item.path}>
                        <div className={`text-dark rounded-md text-lg my-2 font-bold w-full p-2 ${location.pathname == item.path && 'bg-primary text-white' } hover:border border border-transparent hover:border-white`}>
                            {item.label}
                        </div>
                    </Link>    
                ))
            }
            </div>
        </div>
    );
};

export default Sidebar;