import { useState } from "react";

interface DropDownMenuProps {
    title: string;
    items: string[];
}

export default function Dropdown({title, items}: DropDownMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <div
          className="menu-item dropdown"
          onMouseEnter={() => {console.log("enter:", title); setOpen(true)}}
          onMouseLeave={() => setOpen(false)}
        >
            <span>{title} ▾</span>
            {open && (
                <div className="dropdown-menu"  style={{ display: open ? "block" : "none", zIndex: 9999 }}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => {
                                console.log(items, "nevigate예정")
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
