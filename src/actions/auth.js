import { fetchSinToken } from "../Components/helpers/fetch"
import { types } from "../types/types";
import Swal from "sweetalert2";


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

const login = (user) => ({
  type: types.authLogin,
  payload: user
})