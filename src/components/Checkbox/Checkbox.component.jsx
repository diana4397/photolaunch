import React from "react";
import { CheckboxContainer } from './Checkbox.styles';

const Checkbox = ({checkBoxChange, checkboxChecked, label, type }) => {
    return(
        <CheckboxContainer>
            <input data-type={type} className="styled-checkbox" id={type} type="checkbox" onChange={checkBoxChange} defaultChecked={checkboxChecked} value={checkboxChecked} />
            {label && <label htmlFor={type}>{label}</label>}
        </CheckboxContainer>
    )
}

export default Checkbox;