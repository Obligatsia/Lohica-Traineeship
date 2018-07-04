import React from 'react'
import FontAwesome from 'react-fontawesome';


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
    let classUndef=props.value?'':'hidden'
        return(
            <div className = {props.class+' '+classUndef}>
    <button id={props.id+'Btn'} onClick={props.editFunc}><FontAwesome name='edit' /></button>
    <p>{props.name}</p>
        <p>{props.value}</p>
        <p className = 'hidden hiddenInput'>
            <Input type ={props.type} id={props.id} func={props.function} />
        </p>
        </div>
    )
}

export const PhotoDiv = props=>(
    <div className = 'photoBlock d-flex flex-column col-sm-4'>
    <div className = 'col-sm-12'>
    <button id='photoBtn' onClick={props.editFunc}><FontAwesome name='edit' /></button>
    <p><img src={props.photoPath} ></img></p>
<p className = 'hidden hiddenInput'>
    <Input type ='file' id='photo' func={props.function} />
</p>
</div>
</div>
)

export const GenderDiv= props=>(
    <div className = 'genderBlock d-flex'>
    <button id='genderBtn' onClick={props.editFunc}><FontAwesome name='edit' /></button>
    <p>Gender:</p>
<p>{props.name}</p>
<p className = 'hidden hiddenInput'>
    <select onChange={props.function} className = 'form-control'>
    <option value = 'male'>Male</option>
    <option value = 'female'>Female</option>
    </select>
    </p>
    </div>
)

export const Input = props => (
    <input className = 'form-control' type ={props.type} placeholder={props.placeholder} id={props.id} onChange={props.func}/>
);