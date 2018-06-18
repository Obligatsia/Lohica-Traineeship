import { connect } from 'react-redux'
import { toggleValue } from '../actions'
import ValueList from '../components/List'
import { VisibilityFilters } from '../actions'

const getVisibleValues = (userValue, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return userValue
    case VisibilityFilters.SHOW_COMPLETED:
      return userValue.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return userValue.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
    userValue: getVisibleValues(state.userValue, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  toggleValue: id => dispatch(toggleValue(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValueList)