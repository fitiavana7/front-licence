import React , {FormEvent, useState , useEffect} from 'react';
import { showRequestError, showSuccessMessage } from '../../../helpers';
import { IEmployee, IMetier, IPayment, ISalary } from '../../../types';
import { FaEuroSign, FaMailBulk, FaSave, FaTrash, FaUser } from 'react-icons/fa' 
import useMetier from '../../../hooks/useMetier';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import useEmployee from '../../../hooks/useEmployee';
import { EventType } from '@testing-library/react';
import { Button, Card } from 'antd';
import usePayment from '../../../hooks/usePayment';
import { FiDownload, FiTrash } from 'react-icons/fi';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PaymentDetailProps {
    close : ()=> void ,
    payment : EventType & IPayment ,
}

const PaymentDetailModal : React.FC<PaymentDetailProps> = (props) => {
    const {close , payment} = props
    const {getEmployeeDetails} = useEmployee()
    const {getById} = useMetier()
    const {deletePayment} = usePayment()

    const [work , setWork] = useState<IMetier>()
    const [employee , setEmployee] = useState<IEmployee>()

    function getData(){
        getEmployeeDetails(payment.employeeId).then((e)=>{
            setEmployee(e.data)
        }).catch(()=>showRequestError())
        getById(payment.workId).then((e)=>{
            setWork(e.data)
        }).catch(()=>showRequestError())
    }

    function supprPayment(id : string){
        deletePayment(id).then((e)=>{
            showSuccessMessage()
            close()
        }).catch(()=>showRequestError())
    }

    useEffect(()=>{
        getData()
    },[])

    const generatePDF = () => {
        const content = document.getElementById('pdf-content');
    
        if (content) {
          html2canvas(content, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
    
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190; // Largeur maximale de la page A4 en mm
            const pageHeight = 280; // Hauteur maximale de la page A4 en mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Ajustement de la hauteur de l'image pour maintenir les proportions
    
            let heightLeft = imgHeight;
            let position = 10;
    
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
    
            // Ajout de pages si le contenu dépasse une page A4
            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }
    
            pdf.save('rapport_paiement.pdf');
    
            // Ouvre le PDF dans un nouvel onglet
            const pdfUrl = pdf.output('bloburl');
            window.open(pdfUrl);
          });
        }
      };
    
    

    return (
        <div className='z-50 w-full min-h-screen fixed top-0 left-0 flex justify-center items-center bg-[#000000c7]' onClick={close}>
            <Card className={`animate-fadeIn w-1/2 max-h-[90vh] overflow-y-scroll bg-fond`} onClick={(e : any)=>e.stopPropagation()}>
                <div id="pdf-content">
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center text-primary '>
                            <FaEuroSign className='text-xl mr-2'/>
                            <h4 className='font-bold text-xl'> DETAIL D'UN SALAIRE</h4>
                        </div>
                        <div className='bg-green-400 rounded-md px-2 py-1 text-white font-bold'>
                            {format(payment.paymentDate, 'dd MMMM yyyy', { locale: fr })}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-6 mt-5'>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FaUser className='mr-2' /> Salarié</h3>
                            <span className='font-bold'>{employee?.firstName.toLocaleUpperCase()} {employee?.lastName}</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FaMailBulk className='mr-2' /> Mail</h3>
                            <span className='font-bold'>{employee?.mail}</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FaUser className='mr-2' /> Metier</h3>
                            <span className='font-bold'>{work?.title}</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FaMailBulk className='mr-2' /> Salaire</h3>
                            <span className='font-bold'>{payment.amount} ar</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FaMailBulk className='mr-2' /> Titre</h3>
                            <span className='font-bold'>{payment.title}</span>
                        </div>
                        <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                            <h3 className='flex items-center text-primary font-bold'><FaMailBulk className='mr-2' /> Comentaire</h3>
                            <span className='font-bold'>{payment.commentaire}</span>
                        </div>
                        {
                            payment.havePlus && (
                                <>
                                <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                                    <h3 className='flex items-center text-primary font-bold'><FaMailBulk className='mr-2' /> Valeur prime ou bonus</h3>
                                    <span className='font-bold'>{payment.plus} ar</span>
                                </div>
                                <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                                    <h3 className='flex items-center text-primary font-bold'><FaMailBulk className='mr-2' /> Description du prime ou bonus</h3>
                                    <span className='font-bold'>{payment.plusDescription}</span>
                                </div>
                                </>
                            )
                        }
                        {
                            payment.haveMoins && (
                                <>
                                <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                                    <h3 className='flex items-center text-primary font-bold'><FaMailBulk className='mr-2' /> Valeur prime ou bonus</h3>
                                    <span className='font-bold'>{payment.moins} ar</span>
                                </div>
                                <div className='border border-primary p-2 rounded-md flex justify-between items-center'>
                                    <h3 className='flex items-center text-primary font-bold'><FaMailBulk className='mr-2' /> Description du prime ou bonus</h3>
                                    <span className='font-bold'>{payment.moinsDescription}</span>
                                </div>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className='flex justify-end my-4'>
                    <Button type='primary' onClick={generatePDF} className='flex items-center bg-blue-500 ml-2'><FiDownload className='text-white' /><span className='text-white'>Télécharger en PDF</span></Button>                        
                    <Button danger onClick={()=>{supprPayment(payment._id || '')}} className='flex items-center bg-red-500 ml-2'><FiTrash className='text-white' /><span className='text-white'>supprimer</span></Button>                        
                </div>
            </Card>
        </div>
    );
};

export default PaymentDetailModal;