import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { LoginScreen } from '../Components/auth/LoginScreen';
import { CalendarScreen } from '../Components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';

export const AppRouter = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    
    dispatch( startChecking() )
    
  }, [dispatch])

  return (
    <Router>
      <div>
        <Switch>

          <Route exact path="/login">
            <LoginScreen />
          </Route>

          <Route exact path="/">
            <CalendarScreen />
          </Route>
          
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}
