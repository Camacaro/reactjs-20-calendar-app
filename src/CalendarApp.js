import React from 'react'
import { AppRouter } from './router/AppRouter'
import { store } from './store/store'
import { Provider } from 'react-redux'


export const CalendarApp = () => {
  return (
    <Provider store={ store }>
      <AppRouter />
    </Provider>
  )
}
