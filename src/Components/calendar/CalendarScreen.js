import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-message-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

moment.locale('es');

const localizer = momentLocalizer(moment);

// const events = [
//   {
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(), // new Date
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: 'fafafa',
//     notes: 'comprar pastel',
//     user: {
//       _id: '123',
//       name: 'Jesus'
//     }
//   }
// ]

export const CalendarScreen = () => {

  const dispatch = useDispatch()

  const { uid } = useSelector(state => state.auth)

  const { events, activeEvent } = useSelector(state => state.calendar)

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

  useEffect(() => {
    dispatch( eventStartLoading() )
  }, [dispatch])

  const onDoubleClick = (e) => {
    console.log('Abrir modal')
    // console.log(e)
    dispatch( uiOpenModal() )
  }

  const onSelectEvent = (e) => {
    // console.log(e)
    console.log('Evento seleccionado');
    dispatch( eventSetActive(e) )
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (e) => {
    // console.log('onSelectSlot', e)
    dispatch( eventClearActiveEvent() )
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log({event, start, end, isSelected})

    const style = {
      backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
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
        onSelectSlot={ onSelectSlot } // manejar eventos fuera de la seleccion del calendar
        selectable={ true } // manejar eventos fuera de la seleccion del calendar
        components={{
          event: CalendarEvent
        }}
      />

      <CalendarModal />

      <AddNewFab />

      { activeEvent && <DeleteEventFab /> }
      
    </div>
  )
}
