interface ButtonProps {
    children: string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({children, className = "", onClick}: ButtonProps){

    return (<button
                className={className}
                onClick={onClick}
            >{children}</button>
    )
}

export default Button;