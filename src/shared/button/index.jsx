
export const Button = ({ type = 'button', variant = 'primary', onClick, disabled = false, children }) => {
    const variants = {
        primary: 'bg-primary hover:bg-primary-dark text-white',
        secondary: 'bg-transparent border-2 border-primary h-11 pt-1.5 hover:bg-primary-light text-primary',
        tertiary: 'bg-transparent hover:bg-tertiary-dark text-primary',
    };
    
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={`hover:bg-primary-dark inset-2 transition-colors duration-300 active:bg-primary-dark py-2 px-4 
                rounded-full shadow-lg ${variants[variant]} disabled:bg-neutral-400 min-w-24`}
        >
            {children}
        </button>
    );
};