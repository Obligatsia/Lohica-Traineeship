import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const myNewsComponent = withRouter (class News extends Component {


    render(){
        const user = this.props.user;
        return (
        <div>
        <p>Welcome, {user.name.value} {user.surName.value}!</p>
        <p>Here you can see your NEWS!</p>
        </div>
    )
    }
})

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(myNewsComponent)