let nextValueId = 0
export const addValue = text => ({
    type: 'ADD_VALUE',
    id: nextValueId++,
    text
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