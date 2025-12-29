import type { ComponentPropsWithoutRef } from "react";

interface ModalHeaderProps extends ComponentPropsWithoutRef<"h3">{
    label: string;
}

export default function ModalHeader(props: ModalHeaderProps){
    return (
        <div className={`border-b px-4 py-2 flex items-center justify-center ${props.className}`}>
            <h3 className="font-extrabold" {...props}>{props.label}</h3>
        </div>
    )
}