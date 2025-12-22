interface TableProps {
    children: React.ReactNode;
    className?: string;
    headerClassName?: string;
    gridColumns?: string;
}

interface TableHeaderProps {
    columns: (string | React.ReactNode)[];
    className?: string;
}

interface TableBodyProps {
    children: React.ReactNode;
    id?: string;
}

function Table({children, className = "", headerClassName = "", gridColumns = "repeat(auto-fit, minmax(100px, 1fr))" }: TableProps){
    const defaultClasses = "bg-white rounded shadow-sm";
    const tableClasses = `${defaultClasses} ${className}`.trim();

    return(
        <div className={tableClasses}
            style={{
                display: 'grid',
                gridTemplateColumns: gridColumns, 
                gap: '0',
                border: '1px solid #dee2e6',
                borderRadius: '0.375rem',
                overflow: 'hidden'
            }}
        >
            {children}
        </div>
    )
}

function TableHeader({columns, className}: TableHeaderProps){
    const defaultClasses = "bg-gray-50 font-medium";
    const headerClasses = `${defaultClasses} ${className}`.trim();

    return (
        <>
        <thead >
            {columns.map((column, index) => (
                <div key={index}
                className={headerClasses}
                style={{
                    padding: '8px',
                    borderBottom: '1px solid #ddd',
                    borderRight: '1px solid #ddd',
                    fontWeight: 'bold'
                }}>
                    {column}
                </div>
            ))}
        </thead>
        </>
    )
}

function TableBody({children, id}: TableBodyProps){
    return (
        <div id = {id} style={{display: 'contents'}}>
            {children}
        </div>
    )
}

export {Table, TableHeader, TableBody};