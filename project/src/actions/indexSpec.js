import * as actions from './index'

describe('value actions', () => {
    it('addValue should create ADD_VALUE action', () => {
        expect(actions.addValue('Use Redux')).toEqual({
            type: 'ADD_VALUE',
            id: 0,
            text: 'Use Redux'
        })
    })

    it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
        expect(actions.setVisibilityFilter('active')).toEqual({
            type: 'SET_VISIBILITY_FILTER',
            filter: 'active'
        })
    })

    it('toggleValue should create TOGGLE_VALUE action', () => {
        expect(actions.toggleValue(1)).toEqual({
            type: 'TOGGLE_VALUE',
            id: 1
        })
    })
})