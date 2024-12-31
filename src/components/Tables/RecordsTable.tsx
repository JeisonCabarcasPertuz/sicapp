import React from "react";
import styles from "./RecordsTable.module.css";

interface Record {
  id: number;
  firstName: string;
  lastName: string;
  modelPc: string;
  email: string;
  createdDate: string;
}

interface RecordsTableProps {
  records: Record[];
  onBack: () => void;
}

const RecordsTable: React.FC<RecordsTableProps> = ({ records, onBack }) => {
  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Registros</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.recordsTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Modelo PC</th>
              <th>Email</th>
              <th>Fecha y hora</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td data-label="Nombre">{record.firstName}</td>
                <td data-label="Apellido">{record.lastName}</td>
                <td data-label="Modelo PC">{record.modelPc}</td>
                <td data-label="Email">{record.email}</td>
                <td data-label="Fecha y hora">{record.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={onBack} className={styles.backButton}>
        Volver al formulario
      </button>
    </div>
  );
};

export default RecordsTable;

