import React from 'react'
import Header from '../HeaderLogOut'
import Search from '../Search'
import Nav from '../Nav'
import UserBlock from "../Main";


const SearchPage = () => (
    <div>
    <Header />
    <div className = 'd-flex'>
    <Nav />
    <Search />
    </div>
    </div>
)

export default SearchPage