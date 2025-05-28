import { useState } from 'react';
import './index.css';

export const DatePicker = ({ value, onChange, placeholder, className = '', time = false }) => {
    const dateType = time ? 'datetime-local' : 'date';
    const [type, setType] = useState(value ? dateType : 'text');
    
    return (
        <input
            type={type}
            onFocus={() => setType(dateType)}
            onBlur={() => { if(!value) setType('text')}}
            placeholder={placeholder}
            value={value}
            onChange={({ currentTarget }) => onChange(currentTarget.value)}
            min={new Date().toISOString().split('T')[0]}
            className={`mb-6 date-picker ${className}`}
        />
    );
};