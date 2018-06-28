const value = (state = {name: {isValid:false}, surName: {isValid:false}, email: {isValid:false}, photo: {isValid:false}, gender: {value: 'male', isValid:true}, middleName: {isValid:true}, age: {isValid:false}, password: {isValid:true}}, action) => {
  switch (action.type) {

      case 'ADD_VALUE':
        return {
            ...state,
            [action.payload.name]: action.payload
        };
    default:
      return {...state}
  }
}

export default value