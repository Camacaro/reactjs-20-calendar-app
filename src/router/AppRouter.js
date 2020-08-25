import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { LoginScreen } from '../Components/auth/LoginScreen';
import { CalendarScreen } from '../Components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

  const dispatch = useDispatch()
  const { checking, uid } = useSelector(state => state.auth)

  console.log(checking)

  useEffect(() => {
    console.log('Effect')
    dispatch( startChecking() )
    
  }, [dispatch])

  if( checking ) {
    return (<h5>Cargando...</h5>)
  }

  return (
    <Router>
      <div>
        <Switch>

          <PublicRoute 
            exact 
            path="/login"
            component={ LoginScreen }
            isAuthenticated={ !!uid } // doble negacion, !!'string' === true, !!null === false
          />

          <PrivateRoute 
            exact 
            path="/"
            component={ CalendarScreen }
            isAuthenticated={ !!uid } // doble negacion, !!'string' === true, !!null === false
          />
          
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}
