import React, { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../../components/data/backend';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { inputStyles, showRequestError, showSuccessMessage } from '../../helpers';
import useAuth from '../../hooks/useAuth';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ILogin } from '../../types';

const LoginForm = () => {

    const [mail , setMail] = useState<string>('')
    const [mdp , setMdp] = useState<string>('')
    const [isLoading , setIsLoading] = useState<boolean>(false)

    const {login} = useAuth()
    const navigate = useNavigate()
    const { setUser} = useCurrentUser()

    function handleChange(e:any , inputName : string) {
        switch (inputName) {
            case 'mail':
                setMail(e.target.value)
                break;
            case 'mdp':
                setMdp(e.target.value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const submitData : ILogin = {
            mail , password : mdp 
        }
        setIsLoading(true)
        login(submitData).then((e:any)=>{
            localStorage.setItem(TOKEN_KEY , e.data.token)
            showSuccessMessage('Connexion reussie')
            setIsLoading(false)
            navigate('/' , {replace : true})

        }).catch((e:any)=> {
            showRequestError("Identifiants incorrects")
            setIsLoading(false)
        })
    }

    return (
        <div className='w-full'>
            {
                isLoading && <Loader/>
            }
            <form action="" onSubmit={handleSubmit}>
                <h2 className='font-bold'>Mail :</h2>
                <input 
                    type="text"
                    onChange={(e)=> handleChange(e,'mail')}
                    className={inputStyles()}
                    placeholder='mail'
                />
                <span className='text-xs text-red-500'>mail invalide</span>
                <h2 className='font-bold'>Mot de passe :</h2>
                <input 
                    type="password"
                    onChange={(e)=> handleChange(e,'mdp')}
                    className={inputStyles()}
                    placeholder='mot de passe'
                />
                <span className='text-xs text-red-500'>mot de passe invalide</span>
                <div className='flex justify-end items-center py-5'>
                    <Button  actionType='submit' onClick={()=>{}} label='se connecter' type='primary'  />
                </div>
            </form>
            <div>
                <NavLink to='/register'>
                    <h3 className='text-center'>creer une compte</h3>
                </NavLink>
            </div>

        </div>
    );
};

export default LoginForm;