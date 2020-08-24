import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../ui/Navbar'
import { messages } from '../helpers/calendar-message-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventSetActive } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'

moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Cumpleaños del jefe',
    start: moment().toDate(), // new Date
    end: moment().add(2, 'hours').toDate(),
    bgcolor: 'fafafa',
    notes: 'comprar pastel',
    user: {
      _id: '123',
      name: 'Jesus'
    }
  }
]

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );
  const dispatch = useDispatch()

  const onDoubleClick = (e) => {
    console.log(e)
    // console.log('aBRIR MODAL')
    dispatch( uiOpenModal() )
  }

  const onSelectEvent = (e) => {
    console.log(e)
    console.log('Evento seleccionado');
    dispatch( eventSetActive(e) )
    dispatch( uiOpenModal() )
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log({event, start, end, isSelected})

    const style = {
      backgroundColor: '#367CF7',
      display: 'block',
      opacity: 0.8,
      borderRadius: '0px',
      color: 'white'
    }

    return {
      style
    }
  }

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelectEvent } 
        onView={ onViewChange } // view: mes, semana, dia, agenda
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />

      <CalendarModal />

      <AddNewFab />
    </div>
  )
}
