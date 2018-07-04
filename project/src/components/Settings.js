import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const mySettingsComponent = withRouter (class Settings extends Component {


    render(){
        const user = this.props.user;
        return (
        <div>
        <p>Welcome, {user.name.value} {user.surName.value}!</p>
        <p>Here you can change your SETTINGS!</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(mySettingsComponent)