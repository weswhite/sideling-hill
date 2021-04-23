//@ts-ignore
import styles from "./Table.module.css";

export interface Column {
  columnId: string;
  Header: string;
}

interface TableProps {
  className: string;
  data: any;
  columns: Column[];
}

const Table: React.FC<TableProps> = ({ className, data, columns }) => {
  let tableClassName = styles.table;

  if (className) {
    tableClassName = `${tableClassName} ${className}`;
  }

  const rows = [...new Array(data.length)].map((item, index) => {
    return columns.map(({ columnId }) => data[index][columnId]);
  });

  return (
    <table className={tableClassName}>
      <thead>
        <tr>
          {columns.map(({ columnId, Header }) => {
            return <td key={columnId}>{Header}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((cell, index) => {
                return <td key={index}>{cell}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
