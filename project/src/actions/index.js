let nextValueId = 0
export const addValue = (name, text, isValid) => ({
    type: 'ADD_VALUE',
    id: nextValueId++,
    payload:{name, value: text, isValid: isValid}
})

export const welcomeUser = (name, password) => ({
    type: 'WELCOME_USER',
    // id: nextValueId++,
    payload:{name, password}
})
