import React from 'react'
import PropTypes from 'prop-types'
const ValidationMethods = require ('./validationComponent.js');
const FormContent = require ('./formComponent.js');

const Validation = new ValidationMethods();

const Value = ({ onChange, completed, text }) => (
    <li
onChange={onChange}
style={{
    textDecoration: completed ? 'line-through' : 'none'
}}
>
{text}
</li>
)

Value.propTypes = {
    onChange: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

export default Value

