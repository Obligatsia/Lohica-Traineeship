import React from 'react'
import Header from '../HeaderLogOut'
import Nav from '../Nav'
import News from '../News'
import UserBlock from "../Main";

const NewsPage = () => (
    <div>
    <Header />
    <div className = 'd-flex'>
    <Nav />
    <News />
    </div>
    </div>
)

export default NewsPage