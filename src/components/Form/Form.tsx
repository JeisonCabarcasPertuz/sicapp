import React, { useEffect, useState } from "react";
import { dataResponse, FormData, FormErrors } from "../../utils/types";
import { validateForm } from "../../utils/validations";
import styles from "./Form.module.css";
import { useApi } from "../../utils/useApi";
import Modal from "../Modal/Modal";
import RecordsTable from "../Tables/RecordsTable";

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    marcaPC: "",
    email: "",
  });
  const { apiRequest } = useApi();
  const [dataModel, setDataModel] = useState<dataResponse>({
    status: "",
    message: "",
    data: [],
  });

  const [dataResponse, setDataResponse] = useState<dataResponse>({
    status: "",
    message: "",
    data: {},
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    isSuccess: false,
  });
  const [showForm, setShowForm] = useState(true);
  const [records, setRecords] = useState([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const result = await apiRequest<dataResponse>({
          method: "POST",
          path: `/form/create`,
          requireBasicAuth: false,
          body: {
            firstName: formData.nombre,
            lastName: formData.apellido,
            modelPc: formData.marcaPC,
            email: formData.email,
          },
        });
        if (result.status === 201) {
          setDataResponse(result.data);
          setModalContent({
            title: "Éxito",
            message: "Registro creado con éxito",
            isSuccess: true,
          });
          setIsModalOpen(true);
          console.log("Registro creado con éxito:", result.data);
        }
      } catch (error) {
        console.error("Error al crear el registro:", error);
        setModalContent({
          title: "Error",
          message: "Hubo un error al crear el registro",
          isSuccess: false,
        });
        setIsModalOpen(true);
      }
    }
  };

  const handleConsultar = async () => {
    try {
      const result = await apiRequest<dataResponse>({
        method: "GET",
        path: `/form/history`,
        requireBasicAuth: false,
      });
      if (result.status === 200) {
        setRecords(result.data);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error al consultar registros:", error);
    }
  };

  const fetchModels = async () => {
    try {
      const result = await apiRequest<dataResponse>({
        method: "GET",
        path: `/model`,
        requireBasicAuth: false,
      });
      if (result.status == 200) {
        setDataModel(result.data);
        console.log(result.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!showForm) {
    return <RecordsTable records={records} onBack={() => setShowForm(true)} />;
  }

  return (
    <>
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
          {errors.nombre && (
            <span className={styles.error}>{errors.nombre}</span>
          )}
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
          {errors.apellido && (
            <span className={styles.error}>{errors.apellido}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="marcaPC">Marca de PC:</label>
          <select
            id="marcaPC"
            name="marcaPC"
            value={formData.marcaPC}
            onChange={handleChange}
          >
            <option value="">Seleccione un modelo</option>
            {Array.isArray(dataModel?.data) &&
              dataModel.data.map((item: { id: number; modelPc: string }) => (
                <option key={item.id} value={item.modelPc}>
                  {item.modelPc}
                </option>
              ))}
          </select>

          {errors.marcaPC && (
            <span className={styles.error}>{errors.marcaPC}</span>
          )}
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
          <button type="submit" className={styles.submitButton}>
            Enviar
          </button>
          <button
            type="button"
            className={styles.consultarButton}
            onClick={handleConsultar}
          >
            Consultar Registros
          </button>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
        isSuccess={modalContent.isSuccess}
      />
    </>
  );
};

export default Form;
