import React from 'react'
import Header from '../HeaderLogOut'
import Friend from '../Friend'
import Nav from '../Nav'
import UserBlock from "../Main";


const SearchPage = () => (
    <div>
    <Header />
    <div className = 'd-flex'>
    <Nav />
    <Friend />
    </div>
    </div>
)

export default SearchPage