import React, { useState } from 'react';
import { FormData, FormErrors } from '../utils/types';
import { validateForm } from '../utils/validations';
import styles from './Form.module.css';

const marcasPC = ['Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Apple'];

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    marcaPC: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario enviado:', formData);
      // Aquí puedes enviar los datos a tu backend
    }
  };

  const handleConsultar = () => {
    console.log('Consultando registros...');
    // Aquí puedes implementar la lógica para consultar registros
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingrese su nombre"
        />
        {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Ingrese su apellido"
        />
        {errors.apellido && <span className={styles.error}>{errors.apellido}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="marcaPC">Marca de PC:</label>
        <select
          id="marcaPC"
          name="marcaPC"
          value={formData.marcaPC}
          onChange={handleChange}
        >
          <option value="">Seleccione una marca</option>
          {marcasPC.map(marca => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>
        {errors.marcaPC && <span className={styles.error}>{errors.marcaPC}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingrese su email"
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>Enviar</button>
        <button type="button" className={styles.consultarButton} onClick={handleConsultar}>Consultar Registros</button>
      </div>
    </form>
  );
};

export default Form;

