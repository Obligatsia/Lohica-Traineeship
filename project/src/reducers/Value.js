const value = (state = {name: {isValid:true}, surName: {isValid:true}, email: {isValid:true}, photo: {isValid:true}, gender: {value: 'male', isValid:true}, age: {isValid:true}, middleName: {isValid:true}, password:{isValid:true}}, action) => {
  switch (action.type) {

    case 'TOGGLE_VALUE':
      return state.map(value =>
        (value.id === action.id)
          ? {...value, completed: !value.completed}
          : value
      );
      case 'ADD_VALUE':
        return {
            ...state,
            [action.payload.name]: action.payload
        };
      case 'ADD_PSW':
          return {
              ...state,
              [action.payload.name]: action.payload
          };
    default:
      return {...state}
  }
}

export default value