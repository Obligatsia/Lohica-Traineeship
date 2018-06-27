import React, {Component} from 'react'
import { connect } from 'react-redux'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

class LogOut extends Component {
    render(){

        return
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut)