import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {FriendPageBlock, SmallBlock} from './Tags';
import MyFriendsComponent from './Friends';
import {getUser} from "./protectRoute";

const myFriendComponent = withRouter (class Settings extends Component {

    render(){
        const user = JSON.parse(getUser());
        const friend=this.props.history.location.state;
        const friendsArr=friend.friends;
        return (
        <div id='friendPage'>
        <FriendPageBlock path={friend.photo.name} surName={friend.surName} name={friend.name} middleName={friend.middleName} email={friend.email} age={friend.age} gender={friend.gender}  friends={friend.friends}/>

        <div className='row col-sm-8'>
            <p className='col-sm-12'>Friends: </p>
            {friendsArr.map((block)=><SmallBlock frPath={block.photo} frName={block.name} frSurName={block.surName} frFunc={(e)=>MyFriendsComponent.goToFriend(e, user, this.props, block)}/>
    )}
    </div>
        </div>
    )
    }
})

function mapStateToProps(state) {
    return {
        user: state.user,
        friends: state.friends
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(myFriendComponent)