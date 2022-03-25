import React from "react";
import { CheckboxContainer } from './Checkbox.styles';

const Checkbox = ({checkBoxChange, checkboxChecked, label, type }) => {
    return(
        <CheckboxContainer>
            <input data-type={type} className="styled-checkbox" id="styled-checkbox-1" type="checkbox" onChange={checkBoxChange} value={checkboxChecked} />
            {label && <label htmlFor="styled-checkbox-1">{label}</label>}
        </CheckboxContainer>
    )
}

export default Checkbox;