import React , {FormEvent, useState , useEffect} from 'react';
import { formatCurrency, showRequestError, showSuccessMessage } from '../../../helpers';
import { IEmployee, IMetier, IPayment, ISalary } from '../../../types';
import { FaMailBulk, FaSave, FaUser } from 'react-icons/fa' 
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import {ControlledInput, ControlledInputNumber, ControlledSelect, ControlledTextarea } from '../../../components/ui/ControlledInput';
import usePayment from '../../../hooks/usePayment';
import useMetier from '../../../hooks/useMetier';
import useSalary from '../../../hooks/useSalary';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button, Card } from 'antd';
import { FiActivity, FiCheckCircle, FiEdit2, FiMail, FiMessageSquare, FiShoppingCart, FiUser } from 'react-icons/fi';

interface PayerProps {
    close : ()=> void ,
    employee : IEmployee ,
    date : Date
}

const selectData = [
    {
        label : 'Oui' ,
        value : 'oui'
    },
    {
        label : 'Non' ,
        value : 'non'
    }
]

const PayerModal : React.FC<PayerProps> = (props) => {
    const {close , employee , date} = props

    const [commentaire ,setCommentaire] = useState<string>('')
    const [title ,setTitle] = useState<string>('')
    const [salary ,setSalary] = useState<ISalary>()
    const [work ,setWork] = useState<IMetier>()

    const [amount ,setAmount] = useState<number>(salary?.amount || 0)
    const [aMoins ,setAMoins] = useState<string>('non')
    const [aPlus ,setAPlus] = useState<string>('non')
    const [moins ,setMoins] = useState<number>(0)
    const [plus ,setPlus] = useState<number>(0)
    const [moinsDescription ,setMoinsDescription] = useState<string>('')
    const [plusDescription ,setPlusDescription] = useState<string>('')


    const [titleError ,setTitleError] = useState<string>('')
    const [commentaireError ,setCommentaireError] = useState<string>('')

    const [plusError ,setPlusError] = useState<string>('')
    const [plusDescError ,setPlusDescError] = useState<string>('')
    const [moinsError ,setMoinsError] = useState<string>('')
    const [moinsDescError ,setMoinsDescError] = useState<string>('')

    const {create} = usePayment()
    const {getById} = useMetier()
    const {getCurrentSalary} = useSalary()
    const {user} = useCurrentUser()

    useEffect(()=>{
        getAllData()
    },[])

    useEffect(()=>{
        if(salary?.amount){
            setAmount(salary?.amount + plus - moins)
        }
    },[moins , plus])

    function getAllData() {
        getCurrentSalary(employee._id || '').then((e:any)=>{
            setSalary(e.data)
            setAmount(e.data.amount)
            getById(e.data.workId || '').then((e:any)=>{
                setWork(e.data)
            }).catch((err:any)=> {})    
        }).catch((err:any)=> {})
    }

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        const titErr = title.length < 2 || title.length > 50 
        setTitleError(titErr?'titre invalide': '') 
        const commErr = commentaire.length < 2 || commentaire.length > 150
        setCommentaireError(commErr?'commentaire invalide':'') 

        const pErr = aPlus === 'oui' && plus < 1  
        setPlusError(pErr?'valeur prime invalide': '') 
        const mErr = aMoins === 'oui' && moins < 1
        setMoinsError(mErr?'valeur decaissement invalide':'') 
        const pDescErr = aPlus === 'oui' && (plusDescription.length < 2 || plusDescription.length > 100 )
        setPlusDescError(pDescErr?'description invalide': '') 
        const mDescErr = aMoins === 'oui' && ( moinsDescription.length < 2 || moinsDescription.length > 100 )
        setMoinsDescError(mDescErr?'description invalide': '') 

        const invalid = titErr || commErr || mErr || pErr || pDescErr || mDescErr
        if(!invalid){
            const data : IPayment = {
                commentaire ,
                amount ,
                paymentDate : date ,
                workId : salary?.workId || '' ,
                employeeId : employee._id || '',
                companyId : user?._id || '' ,
                title ,
                haveMoins : aMoins === 'oui',
                havePlus : aPlus === 'oui', 
                moins ,
                moinsDescription ,
                plus,
                plusDescription
            }
            create(data).then((e:any)=>{
                showSuccessMessage()
                close()
            }).catch((err:any)=> showRequestError())
        }
    }

    return (
        <div className='z-50 w-full min-h-screen fixed top-0 left-0 flex justify-center items-center bg-[#000000c7]' onClick={close}>
            <Card className={`animate-fadeIn w-2/3 overflow-y-scroll max-h-[90vh] bg-fond`} onClick={(e : any)=>e.stopPropagation()}>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center text-primary '>
                        <FiCheckCircle className='text-md mr-2'/>
                        <h4 className='font-bold text-xl'> PAYER UNE SALAIRE</h4>
                    </div>
                    <div className='bg-green-400 rounded-md px-2 py-1 text-white font-bold'>
                        {format(date, 'dd MMMM yyyy', { locale: fr })}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-2 pt-10 text-sm'>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiUser className='mr-2' /> Salarié</h3>
                        <span className='font-bold text-white'>{employee.firstName.toLocaleUpperCase()} {employee.lastName}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiMail className='mr-2' /> Mail</h3>
                        <span className='font-bold text-white'>{employee.mail}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiActivity className='mr-2' /> Metier</h3>
                        <span className='font-bold text-white'>{work?.title}</span>
                    </div>
                    <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                        <h3 className='flex items-center text-primary font-bold'><FiMail className='mr-2' /> Salaire</h3>
                        <span className='font-bold text-white'>{ formatCurrency(amount)} ar</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit} method='post' className='my-2'>
                    <div className='grid grid-cols-2 p-2 rounded-md items-start gap-2'>
                        <ControlledSelect
                            label='A un prime ou bonus:'
                            value={aPlus}
                            onChange={setAPlus}
                            options={selectData}
                        />
                        <ControlledSelect
                            label='A un decaissement:'
                            value={aMoins}
                            onChange={setAMoins}
                            options={selectData}
                        />
                    </div>
                    {aPlus === 'oui' && <div className='grid grid-cols-2 p-2 rounded-md items-start my-1 gap-3'>
                        <ControlledInputNumber
                            label='Valeur de prime ou bonus'
                            value={plus}
                            placeholder='prime ou bonus'
                            onChange={setPlus}
                            errorMessage={plusError}
                            icon={<FiShoppingCart/>}
                        />
                        <ControlledTextarea
                            label='Description prime ou bonus'
                            value={plusDescription}
                            placeholder='description'
                            onChange={setPlusDescription}
                            errorMessage={plusDescError}
                            icon={<FiMessageSquare/>}
                        />
                    </div> }
                    {aMoins === 'oui' && <div className='grid grid-cols-2 p-2 rounded-md items-start my-1 gap-2'>
                        <ControlledInputNumber
                            label='Valeur de decaissement'
                            value={moins}
                            placeholder='decaissement'
                            onChange={setMoins}
                            errorMessage={moinsError}
                            icon={<FiShoppingCart/>}
                        />
                        <ControlledTextarea
                            label='Description de decaissement'
                            value={moinsDescription}
                            placeholder='decaissement'
                            onChange={setMoinsDescription}
                            errorMessage={moinsDescError}
                            icon={<FiMessageSquare/>}
                        />
                    </div>
                    }
                    <div className=''>
                        <ControlledInput
                            label='Titre'
                            value={title}
                            placeholder='titre'
                            onChange={setTitle}
                            classname='my-6'
                            errorMessage={titleError}
                            icon={<FiEdit2/>}
                        />
                        <ControlledTextarea
                            label='Commentaire'
                            value={commentaire}
                            placeholder='commmentaire'
                            onChange={setCommentaire}
                            classname='my-6'
                            errorMessage={commentaireError}
                            icon={<FiMessageSquare/>}
                        />
                    </div>
                    <div className='flex justify-end items-center'>
                        <button 
                            className='text-sm flex justify-center hover:bg-green-600 items-center text-white border bg-green-500 px-3 py-1 rounded-md'
                            type='submit'
                        >
                            <FaSave /> <span className='ml-1'>enregistrer</span>
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default PayerModal;