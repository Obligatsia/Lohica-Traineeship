import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import {getUser} from './protectRoute'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {MyFriendBlock} from './Tags';


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
const myFriendsComponent = withRouter (class Friends extends Component {

    render(){
        const user = JSON.parse(getUser());
        let friendsArr=[];
        fillArr(friendsArr, this.props);
        
        return (
            <div id='friendItem'>
            {friendsArr.map((block)=><MyFriendBlock path={block[0].photo} name={block[0].name} surName={block[0].surName}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(myFriendsComponent)