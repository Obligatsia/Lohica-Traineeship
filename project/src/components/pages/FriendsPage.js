import React from 'react'
import Header from '../HeaderLogOut'
import Nav from '../Nav'
import Friends from '../Friends'
import UserBlock from "../Main";

const FriendsPage = () => (
    <div>
    <Header />
    <div className = 'd-flex'>
    <Nav />
    <Friends />
    </div>
    </div>
)

export default FriendsPage