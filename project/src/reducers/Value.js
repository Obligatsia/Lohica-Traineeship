const value = (state = '', action) => {
  switch (action.type) {
    case 'ADD_VALUE':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_VALUE':
      return state.map(value =>
        (value.id === action.id)
          ? {...value, completed: !value.completed}
          : value
      )
    default:
      return state
  }
}

export default value