import React from 'react';
import './CustomCheckbox.css';

const CustomCheckbox = ({ checked, onChange, label }) => {
    return (
        <label className="custom-checkbox">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="checkbox-indicator"></span>
            {label}
        </label>
    );
};

export default CustomCheckbox;