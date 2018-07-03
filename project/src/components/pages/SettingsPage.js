import React from 'react'
import Header from '../HeaderLogOut'
import Settings from '../Settings'
import Nav from '../Nav'
import UserBlock from "../Main";

const SettingsPage = () => (
    <div>
    <Header />
    <div className = 'd-flex'>
    <Nav />
    <Settings />
    </div>
    </div>
)

export default SettingsPage