import { Redirect, Route } from 'react-router-dom';
import React from 'react';


export const getUser=(()=>{
    return localStorage.getItem('user');
})

export const PrivateRoute = ({component: Component, ...rest})=> (
<Route {...rest} render={(props) => (
    (getUser())
            ? <Component {...props} />
: <Redirect to='/logIn' />
)} />
)

export const UnregisterRoute = ({component: Component, ...rest})=> (
    <Route {...rest} render={(props) => (
    (!localStorage.getItem('user'))
        ? <Component {...props} />
: <Redirect to='/main' />
)} />
)