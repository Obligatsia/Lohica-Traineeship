import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { addFriend, clearFriend } from '../actions/index'
import AjaxRequest from './Requests.js';
import {findFriendUrl} from '../constants';
import $ from 'jquery'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {Input, FriendBlock} from './Tags';

const mySearchComponent = withRouter (class Search extends Component {

    successFunc(data, user, props){
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

    showFriends(e, user, props){
        const value = e.target.value;
        AjaxRequest.sendRequest(findFriendUrl, 'POST', value, 'text/plain; charset=utf-8', true, user.token, this.successFunc, user, props)
    }

    render(){
        const user = JSON.parse(localStorage.getItem('user'));
        let photoPath;
        let friendsArr=[];
        let list = this.props.friends.toArray();
        list.forEach(function(item) {
            let elem=item.toArray();
            let photoArr= elem[0].photo.path.split('\\');
            photoPath = photoArr[1]+'/'+photoArr[2];
            friendsArr.push (elem);
        });

        return (
            <div className='col-sm-5 searchUser'>
        <div id='searchInput'>
            <p>You can find your friends by name</p>
            <Input id='inputForSearch' type = 'text' placeholder='Enter the name' func={(e)=>this.showFriends(e, user, this.props)} />
        </div>
        <div className='f-flex flex-column friendInfo'>
            {friendsArr.map((block)=><FriendBlock imgPath={photoPath} name={block[0].name} surName={block[0].surName} gender={block[0].gender} age={block[0].age} func={(e)=>this.addFriend(e, user, this.props)} />

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