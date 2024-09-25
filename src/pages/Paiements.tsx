/* eslint-disable */
import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr'; // Importer la localisation française
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './custom-calendar.css';
import React, { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Card, message } from 'antd';
import usePayment from '../hooks/usePayment';
import { IPayment } from '../types';
import { useCurrentUser } from '../hooks/useCurrentUser';
import PaymentDetailModal from '../modules/salaries/components/PaymentDetailModal';
import { FaEuroSign } from 'react-icons/fa';

const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type EventType = {
  title : string ,
  start : Date ,
  end : Date
}

const Paiements = () => {
  const [events, setEvents] = useState<(EventType & IPayment)[]>([]);
  const [isLoading , setIsLoading] = useState<boolean>(true)

  const [sEvent, setSEvent] = useState<any>();
  const [showEvent, setShowEvent] = useState<boolean>(false);

  const {getPaymentsByCompany} = usePayment()

  const {user} = useCurrentUser()

  useEffect(()=>{
    refetch()
  },[])

  async function refetch(){
    const res = await getPaymentsByCompany(user?._id || '')
    setEvents(res.data.map(((el : IPayment)=>{
      el.paymentDate = new Date(el.paymentDate)
      const monDate = new Date(el.paymentDate.getFullYear(), 
      el.paymentDate.getMonth(), el.paymentDate.getDate(),
      el.paymentDate.getHours(), el.paymentDate.getMinutes()) 
      return {
        ...el ,
      title : el.title || 'test',
      start :  monDate,
      end : monDate ,
    }
  })))
    setIsLoading(false)
  }

  const handleSelectEvent = (e : (EventType & IPayment)) => {
    setSEvent(e)
    setShowEvent(!showEvent)
  };

  return (
    <>
    <div className='flex justify-between items-center w-full py-3 mb-5'>
        <h3 className='text-lg flex items-center font-bold text-primary'>
            <FaEuroSign  className='mr-2'/>    
            LES PAIEMENTS ({events.length})
        </h3>
    </div>
    <Card className=' p-4'>
     {  !isLoading &&
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 480 , zIndex : 0}}
        messages={{
          next: "Suivant",
          previous: "Précédent",
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          agenda: "Agenda",
          date: "Date",
          time: "Heure",
          event: "Événement",
          showMore : (count : number)=> `+${count} voir plus`,
          noEventsInRange: "Aucun événement dans cette plage",
        }}
        selectable
        onSelectEvent={handleSelectEvent}
      />
      }
      {showEvent && sEvent &&
      <div className='z-50'>
        <PaymentDetailModal
          close={()=> {
            setShowEvent(false)
            refetch()
          }} 
          payment={sEvent} 
        />
      </div> 
      }
    </Card>
    </>
  );
};

export default Paiements;
