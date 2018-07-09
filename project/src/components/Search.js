import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addFriend, addValue, clearFriend} from '../actions/index'
import AjaxRequest from './Requests.js';
import {findFriendUrl, addFriendUrl, deleteFriendUrl} from '../constants';
import $ from 'jquery'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {Input, FriendBlock} from './Tags';

const mySearchComponent = withRouter (class Search extends Component {

    successFunc(data, user, props){
        props.dispatch(clearFriend());
        if(data==='no users'){
            $('#searchInput').addClass('noUsersMsg');
        } else{
            $('#searchInput').removeClass('noUsersMsg');
            for(let key in data){
                if(data[key]._id!==user._id){
                    props.dispatch(addFriend(data[key]));
                }
            }
        }
    }

    successAddFunc(data, props){
        props.dispatch(addValue('friends', data.friends, true))
        let jsonUser = JSON.stringify(data);
        localStorage.setItem('user', jsonUser);
    }

    successDelFunc(data, props){
        console.log(data);
        // props.dispatch(addValue('friends', data.friends, true))
        // let jsonUser = JSON.stringify(data);
        // localStorage.setItem('user', jsonUser);
    }

    deleteFriend(e, user, props, block){
        let userId = user._id;
        let friendId = block[0]._id;
        let idArray=[userId, friendId];
        let idArr=JSON.stringify(idArray);
        AjaxRequest.sendRequest(deleteFriendUrl, 'POST', idArr, 'application/json; charset=utf-8', true, user.token, this.succesDelFunc, props)
    }

    addFriend(e, user, props, block){
        let userId = user._id;
        let friendId = block[0]._id;
        let idArray=[userId, friendId];
        let idArr=JSON.stringify(idArray);
        AjaxRequest.sendRequest(addFriendUrl, 'POST', idArr, 'application/json; charset=utf-8', true, user.token, this.successAddFunc, props)
    }


    showFriends(e, user, props, friendsArr){
        const value = e.target.value;
        AjaxRequest.sendRequest(findFriendUrl, 'POST', value, 'text/plain; charset=utf-8', true, user.token, this.successFunc, user, props)
    }

    render(){
        const user = JSON.parse(localStorage.getItem('user'));
        let friendsArr=[];

        let list = this.props.friends.toArray();
        list.forEach(function(item) {
            let elem=item.toArray();
            friendsArr.push (elem);
        });
        return (
            <div className='col-sm-5 searchUser'>
        <div id='searchInput'>
            <p>You can find your friends by name</p>
            <Input id='inputForSearch' type = 'text' placeholder='Enter the name' func={(e)=>this.showFriends(e, user, this.props, friendsArr)} />
        </div>
        <div className='f-flex flex-column friendInfo'>
            {friendsArr.map((block)=><FriendBlock imgPath={block[0].photo.name} id={block[0]._id} name={block[0].name} surName={block[0].surName} gender={block[0].gender} age={block[0].age} addFriend={(e)=>this.addFriend(e, user, this.props, block)} deleteFriend={(e)=>this.deleteFriend(e, user, this.props, block)}/>
    )}
    </div>
        </div>
    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(mySearchComponent)