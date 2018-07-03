import React from 'react'
import Header from '../HeaderLogOut'
import UserBlock from '../Main'
import Nav from '../Nav'


const MainPage = () => (
    <div>
    <Header />
    <div className = 'd-flex'>
    <Nav />
    <UserBlock />
    </div>
    </div>
)

export default MainPage