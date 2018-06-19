const value = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_NAME':
      console.log(state);
      return [
        ...state,
        {
          id: action.id,
            name:{value: action.name.value, isValid: action.name.isValid},
            surName:{value: '', isValid: ''},
          completed: false
        }
      ]
      case 'ADD_SURNAME':
          console.log(action);
          return [
              ...state,
              {
                  id: action.id,
                  surName:{value: action.surName.value, isValid: action.surName.isValid},
                  completed: false
              }
          ]
    // case 'TOGGLE_VALUE':
    //   return state.map(value =>
    //     (value.id === action.id)
    //       ? {...value, completed: !value.completed}
    //       : value
    //   )
    default:
      return state
  }
}

export default value