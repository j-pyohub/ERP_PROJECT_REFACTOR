import './Button.css'

interface ButtonProps {
    children: string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({children, className = "", onClick}: ButtonProps){
    const defaultClasses = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 border border-blue-500";
    const buttonClasses = `${defaultClasses} ${className}`.trim();

    return (<button
                className={buttonClasses}
                onClick={onClick}
            >{children}</button>
    )
}

export default Button;