import "./Button.css";

interface ButtonProps {
    children: string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, className = "", onClick }: ButtonProps) {
    const defaultClasses = `
        inline-flex items-center justify-center
        px-4 py-2
        bg-blue-500 text-white
        rounded border border-blue-500
        hover:bg-blue-600
        whitespace-nowrap
        flex-shrink-0
    `;

    const buttonClasses = `${defaultClasses} ${className}`.trim();

    return (
        <button
            type="button"
            className={buttonClasses}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
