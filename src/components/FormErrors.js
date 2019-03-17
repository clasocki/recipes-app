import React from 'react';
import shortid from 'shortid';
import './FormErrors.css';

export const FormErrors = ({ formErrors }) =>
    <div className='form-errors'>
        {Object.keys(formErrors).map((fieldName) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <p key={shortid.generate()}>{formErrors[fieldName]}</p>
                )
            } else {
                return '';
            }
        })}
    </div>

export default FormErrors;