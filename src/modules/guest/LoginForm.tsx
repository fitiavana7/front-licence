import React, { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../../components/data/backend';
import { ControlledInput, ControlledInputPassword } from '../../components/ui/ControlledInput';
import Loader from '../../components/ui/Loader';
import { inputStyles, showRequestError, showSuccessMessage } from '../../helpers';
import useAuth from '../../hooks/useAuth';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ILogin } from '../../types';
import { Button } from 'antd';
import { FaSignInAlt } from 'react-icons/fa';
import { FiLock, FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';

const LoginForm = () => {

    const [mail , setMail] = useState<string>('')
    const [mdp , setMdp] = useState<string>('')
    const [isLoading , setIsLoading] = useState<boolean>(false)

    const [mailError , setMailError] = useState<string>('')
    const [mdpError , setMdpError] = useState<string>('')

    const {login , getCurrentUser} = useAuth()
    const navigate = useNavigate()
    const { setUser } = useCurrentUser()

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const mailErr = mail.length < 2 || mail.length > 50
        setMailError(mailErr?'mail invalide' : '') 
        const pwdErr = mdp.length < 6 
        setMdpError(pwdErr ?'le mot de passe doit contenir au moins 6 caractères' : '')

        const invalid = mailErr || pwdErr
        if(!invalid){
            const submitData : ILogin = {
                mail , password : mdp 
            }
            setIsLoading(true)
            login(submitData).then(async(e:any)=>{
                localStorage.setItem(TOKEN_KEY , e.data.token)
                const req = await getCurrentUser()
                setUser(req)
                toast.success("Connection reussie")
                setIsLoading(false)
                navigate('/' , {replace : true})

            }).catch((e:any)=> {
                toast.error("Identifiants incorrects")
            })
        }
    }

    return (
        <div className='w-full bg-fond'>
            {
                isLoading && <Loader/>
            }
            <form action="" onSubmit={handleSubmit}>
                <ControlledInput
                    label='Mail:'
                    value={mail}
                    placeholder='adrèsse mail'
                    onChange={setMail}
                    errorMessage={mailError} 
                    icon={<FiMail/>}

                />
                <ControlledInputPassword
                    label='Mot de passe:'
                    value={mdp}
                    placeholder='mot de passe'
                    onChange={setMdp}
                    errorMessage={mdpError} 
                    icon={<FiLock/>}

                />
                <div className='flex justify-end items-center py-5'>
                <Button onClick={handleSubmit} type='primary' className={`py-1 px-2 bg-blue-500 flex items-center`}>
                    <FaSignInAlt className='mr-2'/> connecter
                </Button>
                </div>
            </form>
            <div>
                <NavLink to='/register'>
                    <h3 className='text-center text-slate-700 hover:underline'>creer une compte</h3>
                </NavLink>
            </div>

        </div>
    );
};

export default LoginForm;