import React from 'react'
import Header from './Header'
import AddName from '../containers/addValue'
import AddSurName from '../containers/addValue'
import VisibleList from '../containers/visibleList'

const App = () => (
    <div>
    <Header />
    <AddName />
    <AddSurName />
    <VisibleList />
    </div>
)

export default App