// import React from 'react'
// import PropTypes from 'prop-types'
// import Value from './value'
//
// const ValueList = ({ values=[], toggleValue }) => (
//     <ul>
//     {values.map(value =>
//     <Value
// key={value.id}
// {...value}
// onChange={() => toggleValue(value.id)}
// />
// )}
// </ul>
// )
//
// ValueList.propTypes = {
//     value: PropTypes.arrayOf(PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         completed: PropTypes.bool.isRequired,
//         text: PropTypes.string.isRequired
//     }).isRequired).isRequired,
//     toggleValue: PropTypes.func.isRequired
// }
//
// export default ValueList