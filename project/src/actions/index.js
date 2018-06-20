let nextValueId = 0
export const addValue = (name, text, isValid) => ({
    type: 'ADD_VALUE',
    id: nextValueId++,
    payload:{name, value: text, isValid: isValid}
})
// export const addPassword = (name, text) => ({
//     type: 'ADD_PSW',
//     id: nextValueId++,
//     payload:{name, password: text}
// })

// export const setVisibilityFilter = filter => ({
//     type: 'SET_VISIBILITY_FILTER',
//     filter
// })
//
// export const toggleValue = id => ({
//     type: 'TOGGLE_VALUE',
//     id
// })
//
// export const VisibilityFilters = {
//     SHOW_ALL: 'SHOW_ALL',
//     SHOW_COMPLETED: 'SHOW_COMPLETED',
//     SHOW_ACTIVE: 'SHOW_ACTIVE'
// }