interface TableProps {
    children: React.ReactNode;
    className?: string;
    headerClassName?: string
}

interface TableHeaderProps {
    columns: (string | React.ReactNode)[];
    className?: string;
}

interface TableBodyProps {
    children: React.ReactNode;
    id?: string;
}

function Table({children, className = "", headerClassName = ""}: TableProps){
    const defaultClasses = "table align-middle bg-white rounded shadow-sm";
    const tableClasses = `${defaultClasses} ${className}`.trim();

    return(
        <table className={tableClasses}>
            {children}
        </table>
    )
}

function TableHeader({columns, className}: TableHeaderProps){
    const defaultClasses = "table-light";
    const headerClasses = `${defaultClasses} ${className}`.trim();

    return (
        <thead className={headerClasses}>
            <tr>
                {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
            </tr>
        </thead>
    )
}

function TableBody({children, id}: TableBodyProps){
    return (
        <tbody id = {id}>
            {children}
        </tbody>
    )
}

export {Table, TableHeader, TableBody};