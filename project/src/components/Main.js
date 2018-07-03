import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';


const myMainComponent = withRouter (class Main extends Component {

    render(){
        const user = JSON.parse(localStorage.getItem('user'));
        const surName = user.surName;

        const fullName = (user.middleName==='undefined')?user.name:`${user.name} ${user.middleName}` ;
        const photoArr= user.photo.path.split('\\');
        const photoPath = photoArr[1]+'/'+photoArr[2];

        return (
        <div className ='d-flex flex-column'>
        <div className = 'upperBlock d-flex'>
            <div className = 'photoBlock col-sm-3'>
            <img src={photoPath} ></img>
            </div>
            <div className = 'nameBlock'>
            <p>{surName}</p>
            <p>{fullName}</p>
            </div>
            </div>
        <div className = 'lowerBlock'>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
            <p>Age: {user.age}</p>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(myMainComponent)