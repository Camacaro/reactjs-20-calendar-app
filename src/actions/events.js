import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import Swal from "sweetalert2";


export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchConToken( 'events', event, 'POST' );
      const { ok, evento } = await resp.json();

      if( ok ) {

        event.id = evento.id
        event.user = {
          _id: uid,
          name
        }

        dispatch( eventAddNew(event) )
      }

    } catch (error) {
      console.log(error);
      throw new Error('Error al crear el evento')
    }

  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent
})

export const eventStartUpdate = (event) => {
  return async (dispatch) => {

    try { 
      
      const resp = await fetchConToken( `events/${ event.id }`, event, 'PUT');
      const body = await (await resp).json();

      if( body.ok ) {
        dispatch( eventUpdated(event) )
      } else {
        Swal.fire('Error', body.msg ,'error')
      }

    } catch (error) {
      console.log(error)
    }
  }
}

const eventUpdated = ( event ) => ({
  type: types.eventUpdated,
  payload: event
})

export const eventDeleted = () => ({
  type: types.eventDeleted
})

export const eventStartLoading = () => {
  return async (dispatch) => {

    try {
      
      const resp = await fetchConToken( 'events' );
      const {eventos} = await resp.json();

      const events = prepareEvents( eventos );

      dispatch( eventLoaded(events) )

    } catch (error) {
      console.log(error)
    }

    // dispatch( eventLoaded() )
  }
}

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events
})