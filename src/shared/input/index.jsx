
export const Input = ({ type = 'text', value, onChange, onClick, placeholder, className = '', disabled = false }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={({ currentTarget }) => onChange(currentTarget.value)}
            className={`mb-6 ${className}`}
            disabled={disabled}
            onClick={onClick}
        />
    );
};