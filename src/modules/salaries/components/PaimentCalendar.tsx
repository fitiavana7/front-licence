/* eslint-disable */
import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr'; // Importer la localisation française
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './custom-calendar.css';
import React, { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { IEmployee, IPayment } from '../../../types';
import PayerDrawer from './PayerModal';
import usePayment from '../../../hooks/usePayment';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import PaymentDetailDrawer from './PaymentDetailModal';
import { message } from 'antd';
import useSalary from '../../../hooks/useSalary';

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

type PaimentCalendarProps ={
  employee : IEmployee | undefined
}

type EventType = {
  title : string ,
  start : Date ,
  end : Date
}

const PaimentCalendar: React.FC<PaimentCalendarProps> = (props) => {
  const {employee} = props

  const {id} = useParams()

  const [events, setEvents] = useState<(EventType & IPayment)[]>([]);
  const [sDate, setSdate] = useState<Date>();
  const [showPayer, setShowPayer] = useState<boolean>(false);
  const [isLoading , setIsLoading] = useState<boolean>(true)
  const [haveSalary , sethaveSalary] = useState<boolean>(false)

  const [sEvent, setSEvent] = useState<any>();
  const [showEvent, setShowEvent] = useState<boolean>(false);

  const {getPaymentsByEmployee} = usePayment()
  const {getCurrentSalary} = useSalary()

  useEffect(()=>{
    getCurrentSalary(id || '').then((e:any)=>{
      if(e.data.amount){ sethaveSalary(true) }
    }).catch(()=>{})
    refetch()
  },[])

  async function refetch(){
    const res = await getPaymentsByEmployee(id as string)
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

  function checkIfPaid(date : Date){
    let paid : boolean = false
    events.map((e)=>{
      const dateString = `${e.paymentDate.getFullYear()}${e.paymentDate.getMonth()}`
      const dString = `${date.getFullYear()}${date.getMonth()}`
      paid = (dateString === dString)
    })
    return paid
  }

  const handleSelect = (slotInfo : SlotInfo) => {
    if(!haveSalary){
      message.warning("Configurer d'abord le salaire de ce salarié")
    }else{
      if(checkIfPaid(slotInfo.start)){
        message.warning('Un payment a dejà eté effectué ce mois ci')
      }else{
        setSdate(slotInfo.start)
        setShowPayer(!showPayer)
      }
    }
  };

  const handleSelectEvent = (e : (EventType & IPayment)) => {
    setSEvent(e)
    setShowEvent(!showEvent)
  };

  return (
    <>
     {  !isLoading &&
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 300 , zIndex : 0}}
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
          noEventsInRange: "Aucun événement dans cette plage",
        }}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelect} // Gérer la sélection de date
      />
      }
      {showPayer && employee && sDate &&
      <div className='z-50'>
        <PayerDrawer 
          close={()=> {
            setShowPayer(false)
            refetch()
          }} 
          employee={employee} 
          date={sDate} 
        />
      </div> 
      }
      {showEvent && sEvent &&
      <div className='z-50'>
        <PaymentDetailDrawer 
          close={()=> {
            setShowEvent(false)
            refetch()
          }} 
          payment={sEvent} 
        />
      </div> 
      }
    </>
  );
};

export default PaimentCalendar;
