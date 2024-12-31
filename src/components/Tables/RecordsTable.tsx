import React from 'react';
import styles from './RecordsTable.module.css';

interface Record {
  id: number;
  firstName: string;
  lastName: string;
  modelPc: string;
  email: string;
}

interface RecordsTableProps {
  records: Record[];
  onBack: () => void;
}

const RecordsTable: React.FC<RecordsTableProps> = ({ records, onBack }) => {
  return (
    <div className={styles.tableContainer}>
      <h2>Registros</h2>
      <table className={styles.recordsTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Modelo PC</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.firstName}</td>
              <td>{record.lastName}</td>
              <td>{record.modelPc}</td>
              <td>{record.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onBack} className={styles.backButton}>Volver al formulario</button>
    </div>
  );
};

export default RecordsTable;

