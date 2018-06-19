let nextValueId = 0
export const addName = (nameText, nameIsValid) => ({
    type: 'ADD_NAME',
    id: nextValueId++,
    name:{value: nameText, isValid: nameIsValid}
})

export const addSurName = (surNameText, surNameIsValid) => ({
    type: 'ADD_SURNAME',
    id: nextValueId++,
    name:{value: surNameText, isValid: surNameIsValid}
})

export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

export const toggleValue = id => ({
    type: 'TOGGLE_VALUE',
    id
})

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}