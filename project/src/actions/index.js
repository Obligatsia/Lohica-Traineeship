let nextValueId = 0
export const addValue = (name, text, isValid) => ({
    type: 'ADD_VALUE',
    id: nextValueId++,
    payload:{name, value: text, isValid: isValid}
})

export const addFriend = (friend) => ({
    type: 'ADD_FRIEND',
    id: nextValueId++,
    payload:{friend}
})

export const clearFriend = (friend) => ({
    type: 'CLEAR',
    id: nextValueId++,
})