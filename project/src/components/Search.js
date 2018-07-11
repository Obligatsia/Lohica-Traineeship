import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addFriend, addValue, clearFriend} from '../actions/index'
import AjaxRequest from './Requests.js';
import {findFriendUrl, addFriendUrl, deleteFriendUrl} from '../constants';
import $ from 'jquery'
import {getUser} from './protectRoute'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {Input, FriendBlock} from './Tags';
import {fillArr} from './Friends';

const mySearchComponent = withRouter (class Search extends Component {

    successFunc(data, user, props){
        props.dispatch(clearFriend());
        if(data==='no users'){
            $('#searchInput').addClass('noUsersMsg');
        } else if(data==='empty value'){
            props.dispatch(clearFriend());
        } else{
            $('#searchInput').removeClass('noUsersMsg');
            for(let key in data){
                if(data[key]._id!==user._id){
                    props.dispatch(addFriend(data[key]));
                }
            }
        }
    }


    successChangeStateFunc(data, props, target){
        props.dispatch(addValue('friends', data.friends, true));
        data.middleName=(data.middleName==='undefined')?'':data.middleName;
        let jsonUser = JSON.stringify(data);
        localStorage.setItem('user', jsonUser);
        $(target.parentNode.children[0]).toggleClass('hidden');
        $(target.parentNode.children[1]).toggleClass('hidden');
    }

    changeFriendsState(e, user, props, block, url){
        let userId = user._id;
        let friendId = block[0]._id;
        let idArray=[userId, friendId, user.token];
        let idArr=JSON.stringify(idArray);
        AjaxRequest.sendRequest(url, 'POST', idArr, 'application/json; charset=utf-8', true, user.token, this.successChangeStateFunc, props, e.target)
    }

    showFriends(e, user, props, friendsArr){
        const value = e.target.value;
        AjaxRequest.sendRequest(findFriendUrl, 'POST', value, 'text/plain; charset=utf-8', true, user.token, this.successFunc, user, props)
    }

    render(){
        const user = JSON.parse(getUser());
        let friendsArr=[];
        fillArr(friendsArr, this.props);
        return (
            <div className='col-sm-5 searchUser'>
        <div id='searchInput'>
            <p>You can find your friends by name</p>
            <Input id='inputForSearch' type = 'text' placeholder='Enter the name' func={(e)=>this.showFriends(e, user, this.props, friendsArr)} />
        </div>
        <div className='f-flex flex-column friendInfo'>
            {friendsArr.map((block)=><FriendBlock imgPath={block[0].photo.name} id={block[0]._id} name={block[0].name} surName={block[0].surName} gender={block[0].gender} age={block[0].age} addFriend={(e)=>this.changeFriendsState(e, user, this.props, block, addFriendUrl)} deleteFriend={(e)=>this.changeFriendsState(e, user, this.props, block, deleteFriendUrl)}/>
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