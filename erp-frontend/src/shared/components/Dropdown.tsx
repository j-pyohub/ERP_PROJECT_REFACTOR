import { use, useState } from "react";
import useNavigateTo from "../hooks/useNavigateTo";

interface DropDownItem {
    label: string;
    path: string;
}

interface DropDownMenuProps {
    title: string;
    items: DropDownItem[];
}

export default function Dropdown({title, items}: DropDownMenuProps) {
    const [open, setOpen] = useState(false);
    const navigeteTo = useNavigateTo();

    return (
        <div
          className="menu-item dropdown"
          onMouseEnter={() => { setOpen(true); }}
          onMouseLeave={() => setOpen(false)}
        >
            <span>{title} ▾</span>
            {open && (
                <div className="dropdown-menu"  style={{ zIndex: 9999 }}>
                    {items.map((item, index) => (
                        <div
                            key={item.path}
                            className="dropdown-item"
                            onClick={() => {
                                navigeteTo(item.path)();
                                setOpen(false);
                            }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
