import React from 'react'
import FontAwesome from 'react-fontawesome';
import $ from 'jquery'


export const FormGroup = props=>(
<div className='form-group'>
        <label htmlFor ={props.id} id={props.labelId}>{props.task}</label>
    <Input type ={props.type} placeholder={props.placeholder} id={props.id} func={props.func} />
    <div className="invalid-feedback">{props.feedback}</div>
    <small id={props.helpId} className="form-text text-muted">{props.helpText}</small>
    </div>
)

export const SelectTag=props=>(
    <div className='form-group'>
    <label htmlFor='gender'>Select your gender</label>
<select  className = 'form-control' id='gender' onChange={props.func}>
<option value = 'male'>Male</option>
    <option value = 'female'>Female</option>
    </select>
    </div>
)

export const InfoDiv = props=>{
    let classUndef=props.value?'':'hidden hiddenInput';
        return(
            <div className = {props.class+' '+classUndef}>
    <button id={props.id+'Btn'} onClick={props.editFunc}><FontAwesome name='edit' /></button>
    <div className='w30'>{props.name}</div>
        <div className='w30'>{props.value}</div>
        <div className = 'w30 hidden hiddenInput'>
            <Input type ={props.type} id={props.id} func={props.changeFunc} stateValue={props.stateValue}/>
    <div className="invalid-feedback">{props.feedback}</div>
        </div>
        </div>
    )
}

export const PhotoDiv = props=>(
    <div className = 'photoBlock d-flex flex-column col-sm-4'>
    <div className = 'col-sm-12'>
    <button id='photoBtn' onClick={props.editFunc}><FontAwesome name='edit' /></button>
    <p><img src={props.photoPath} ></img></p>
<div className = 'hidden hiddenInput'>
    <Input type ='file' id='photo' func={props.changeFunc} stateValue={props.stateValue} />
<div className="invalid-feedback">{props.feedback}</div>
</div>
</div>
</div>
)

export const GenderDiv= props=>(
    <div className = 'genderBlock d-flex'>
    <button id='genderBtn' onClick={props.editFunc}><FontAwesome name='edit' /></button>
    <div className='w30'>Gender:</div>
<div className='w30'>{props.name}</div>
<div className = 'w30 hidden hiddenInput'>
    <select value={props.optionValue} onChange={props.changeFunc} className = 'form-control'>
    <option value = 'male'>male</option>
    <option value = 'female'>female</option>
    </select>
    </div>
    </div>
)

export const Input = props => (
    <input className = {props.classNames+' form-control'} type ={props.type} placeholder={props.placeholder} id={props.id} onChange={props.func} value={props.stateValue} onClick={props.clickFunc}/>
);

export const FriendBlock= props =>{
    const user = JSON.parse(localStorage.getItem('user'));
    let addBtn='';
    let deleteBtn='hidden';
    if(user.friends.length){
        user.friends.forEach((friend)=>{
            if(friend===props.id){
                addBtn='hidden';
                deleteBtn='';
            }
        }) 
    }

    return(
        <div className='d-flex' id={props.id}>
        <div className='col-sm-2'> <img src={'usersImg/' +props.imgPath}/></div>
    <div className='d-flex flex-column col-sm-5'>
        <p>{props.name}</p>
    <p>{props.surName}</p>
    <p>{props.gender}</p>
    <p>{props.age +' years old'}</p>
    </div>
    <div className='col-sm-4'><Input type='button'  classNames={props.class+' '+addBtn+' btn btn-info'} clickFunc={props.addFriend} stateValue='Add to friends' id='addFriend'/> <Input type='button' classNames={props.class+' '+deleteBtn+' btn btn-danger'} clickFunc={props.deleteFriend} stateValue='Delete friend' id='deleteFriend'/></div>
        </div>
)

}




