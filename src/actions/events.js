import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";


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
        console.log({event})
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

export const eventUpdated = ( event ) => ({
  type: types.eventUpdated,
  payload: event
})

export const eventDeleted = () => ({
  type: types.eventDeleted
})

