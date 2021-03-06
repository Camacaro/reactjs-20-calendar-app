import { fetchSinToken, fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from "sweetalert2";
import { eventLogout } from "./events";


export const startLogin = (email, password) => {
  return async (dispatch) => {

    const resp = await fetchSinToken( 'auth', {email, password}, 'POST' );
    const {ok, token, uid, name, ...rest} = await resp.json();

    if ( ok ) {
      localStorage.setItem('token', token )
      localStorage.setItem('token-init-date', new Date().getTime() )

      dispatch( login({
        uid,
        name
      }))

    } else {

      Swal.fire('Error', rest.msg, 'error')
    }
  }
}

export const startRegister = ( rname, email, password ) => {
  return async (dispatch) => {
    const resp = await fetchSinToken( 'auth/new', {name: rname, email, password}, 'POST' );
    const {ok, token, uid, name, ...rest} = await resp.json();

    console.log({ok, token, uid, name, ...rest} )

    if ( ok ) {
      localStorage.setItem('token', token )
      localStorage.setItem('token-init-date', new Date().getTime() )

      dispatch( login({
        uid,
        name
      }))

    } else {

      Swal.fire('Error', rest.msg, 'error')
    }
  }
}

export const startChecking = () => {
  return async (dispatch) => {

    const resp = await fetchConToken( 'auth/renew' );
    const {ok, token, uid, name} = await resp.json();

    if ( ok ) {
      localStorage.setItem('token', token )
      localStorage.setItem('token-init-date', new Date().getTime() )

      dispatch( login({
        uid,
        name
      }))

    } else {
      // Swal.fire('Error', rest.msg, 'error')
      dispatch( checkingFinish() );
    }
    
  }
}

const checkingFinish = () => ({
  type: types.authCheckingFinish
})

const login = (user) => ({
  type: types.authLogin,
  payload: user
})

export const startLogout = () => {
  return (dispatch) => {
    
    localStorage.clear();

    dispatch( eventLogout() )
    dispatch( logout() )
  }
}

const logout = ( ) => ({ type: types.authLogout })