import React, { Component } from 'react';
import { BrowserRouter , Route , Switch , Link} from 'react-router-dom'
import Home from '../Home/Home'
import Admin from '../Admin/Admin'
import AskResetPassword from '../Admin/AskResetPassword'
import ResetPassword from '../Admin/ResetPassword'
import '../../css/Main.css'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';

const options = {
    position: 'top center',
    timeout: 3000,
    offset: '30px',
    transition: 'scale'
  }


 const Main = () => {

    return (
        <AlertProvider template={AlertTemplate} {...options}>
        <Switch>
            <Route exact path='/admin' component={Admin}/>
            <Route exact path='/resetpassword/:token/:email' component={ResetPassword}/>
            <Route exact path='/resetpassword' component={AskResetPassword}/>
            <Route exact path='/' component={Home}/>
        </Switch>
        </AlertProvider>
    )
}

export default Main