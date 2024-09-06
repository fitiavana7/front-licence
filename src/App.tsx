import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Layout from './components/Layout';
import ConnectedLayout from './components/ConnectedLayout';
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';
import { createContext, lazy, Suspense, useEffect, useState } from 'react';
import Loader from './components/ui/Loader';
import { ICompany, IEmployee } from './types';
import { TOKEN_KEY } from './components/data/backend';
import Guide from './pages/Guide';
import LeavingEmployees from './pages/LeavingEmployees';
import CurrentEmployees from './pages/CurrentEmployees';
import Acceuil from './pages/Acceuil';
import Paiements from './pages/Paiements';

const Dashboard = lazy(()=> import('./pages/Dashboard'))
const Metiers = lazy(()=> import('./pages/Metiers'))
const Salaries = lazy(()=> import('./pages/Salaries'))
const Login = lazy(()=> import('./pages/Login'))
const Register = lazy(()=> import('./pages/Register'))
const EmployeeDetail = lazy(()=> import('./modules/salaries/pages/EmployeeDetail'))
const Profile = lazy(()=> import('./pages/Profile'))

interface UserContextType {
  user: ICompany | null;
  setUser: (user: ICompany | null) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

const App  = () => {
  const [user, setUser] = useState<ICompany | null>(null);
  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY)
  };
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, logout }}>
        <Routes>
          <Route path='' element={<Layout/>}>
        
           //for connected users
            <Route path='' element={<ConnectedLayout/>}>
              <Route path='' element={<AuthGuard/>}>
                <Route index element={
                  <Suspense fallback={<Loader/>}>
                    <Dashboard/>
                  </Suspense>
                } />
                <Route path='/profile' element={
                  <Suspense fallback={<Loader/>}>
                    <Profile/>
                  </Suspense>    
                } />
                <Route path='/employees' element={
                  <Suspense fallback={<Loader/>}>
                    <Salaries/>
                  </Suspense>
                }>
                  <Route path='current' element={
                      <CurrentEmployees/>
                  } />
                  <Route path='leaved' element={
                      <LeavingEmployees/>
                  } />
                  </Route>

                <Route path='/employees/current' element={
                  <Suspense fallback={<Loader/>}>
                    <Salaries/>
                  </Suspense>
                } />
                <Route path='/employees/leaved' element={
                  <Suspense fallback={<Loader/>}>
                    <LeavingEmployees/>
                  </Suspense>
                } />
                <Route path='/metiers' element={
                  <Suspense fallback={<Loader/>}>
                    <Metiers/>
                  </Suspense>
                } />
                <Route path='/paiements' element={
                  <Suspense fallback={<Loader/>}>
                    <Paiements/>
                  </Suspense>
                } />
                <Route path='/guides' element={
                  <Suspense fallback={<Loader/>}>
                    <Guide/>
                  </Suspense>
                } />

                <Route path='/employee/:id' element={
                  <Suspense fallback={<Loader/>}>
                    <EmployeeDetail/>
                  </Suspense>
                } />
              </Route>
            </Route>
                
            //for not connected users
            <Route path='' element={<GuestGuard/>}>
              <Route path='/login' element={
                <Suspense fallback={<Loader/>}>
                  <Login/>
                </Suspense>
              } />
              <Route path='/register' element={
                <Suspense fallback={<Loader/>}>
                  <Register/>
                </Suspense>  
                } />
            </Route>
            <Route path='/acceuil' element={
              <Suspense fallback={<Loader/>}>
                <Acceuil/>
              </Suspense>  
            } />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
    );
}

export default App;
