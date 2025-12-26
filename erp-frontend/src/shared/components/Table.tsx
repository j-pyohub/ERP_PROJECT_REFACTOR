interface TableProps {
    children: React.ReactNode;
    className?: string;
    headerClassName?: string;
    gridColumns?: string;
}

interface TableHeaderProps {
    columns: (React.ReactNode)[];
    className?: string;
    sticky?: boolean;
}

interface TableCellProps {
  children?: React.ReactNode;
  hideTopBorder?: boolean;
  hideBottomBorder?: boolean;
  hideText?: boolean;
}

function Table({children, className = "", gridColumns}: TableProps){

    return(
        <div
        className={`bg-white rounded shadow-sm ${className}`}
        style={{
            display: "grid",
            gridTemplateColumns: gridColumns,
            border: "1px solid #dee2e6",
            borderRadius: "6px",
      }}
        >
            {children}
        </div>
    )
}

function TableHeader({columns,
  sticky = false,
  className = ''}: TableHeaderProps) {
  return (
    <>
      {columns.map((column, idx) => (
        <div
          key={idx}
          className={className}
          style={{
            padding: "10px",
            fontWeight: "bold",
            background: "#f8f9fa",
            borderBottom: "1px solid #ddd",
            borderRight: "1px solid #ddd",
            position: sticky ? 'sticky' : undefined,
            top: sticky ? 0 : undefined,
            zIndex: sticky ? 10 : undefined
          }}
        >
          {column}
        </div>
      ))}
    </>
  );
}

function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}


function TableCell({
  children,
  hideTopBorder,
  hideBottomBorder,
  hideText,
}: TableCellProps) {
  return (
    <div
      style={{
        padding: "8px",
        textAlign: "center",
        borderRight: "1px solid #ddd",
        borderTop: hideTopBorder ? "none" : "1px solid #ddd",
        borderBottom: hideBottomBorder ? "none" : "1px solid #ddd",
        color: hideText ? "transparent" : "inherit",
      }}
    >
      {children}
    </div>
  );
}


export {Table, TableHeader, TableRow, TableCell};