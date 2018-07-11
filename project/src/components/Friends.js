import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import {getUser} from './protectRoute'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {clearFriend} from '../actions/index'
import {MyFriendBlock} from './Tags';
import {addFriendUrl, goToFriendUrl, toFriend, main, search} from "../constants";
import AjaxRequest from "./Requests";


export const fillArr=(arr, props)=>{
    let list = props.friends.toArray();
    list.forEach(function(item) {
        let elem=item.toArray();
        arr.push(elem);
        arr.sort(function(a, b){
            let nameA=a[0].surName.toLowerCase(), nameB=b[0].surName.toLowerCase();
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;
        });
    });
}
const MyFriendsComponent = withRouter (class Friends extends Component {

    static successFunc(data, props, user){
        let friendInfo=data.user;
        let friendsArray=[]
        user.friends.forEach((elem)=>{
            if(elem.id===friendInfo._id){
                friendsArray.push(elem);
            }})
        if(friendsArray.length){
            if(props.history.location.pathname===toFriend){
                props.history.push({pathname: toFriend, state: friendInfo});
                document.location.reload();
            }else{
                props.history.push({pathname: toFriend, state: friendInfo});
            }
        } else if(user._id===friendInfo._id){
            props.history.push({pathname: main});
        }  else{
            props.dispatch(clearFriend());
            props.history.push({pathname: search});

        }
    }
    static goToFriend(e, user, props, block){
        let friendId=block.id;
        AjaxRequest.sendRequest(goToFriendUrl, 'POST', friendId, 'text/plain; charset=utf-8', true, user.token, MyFriendsComponent.successFunc, props, user)

    }
    render(){
        const user = JSON.parse(getUser());
        let friendsArr=[];
        fillArr(friendsArr, this.props);

        return (
            <div id='friendItem'>
            {friendsArr.map((block)=><MyFriendBlock path={block[0].photo} name={block[0].name} surName={block[0].surName} func={(e)=>MyFriendsComponent.goToFriend(e, user, this.props, block[0])} />
    )}


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

export default connect(mapStateToProps, mapDispatchToProps)(MyFriendsComponent)