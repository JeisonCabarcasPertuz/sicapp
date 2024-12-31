import { FormData, FormErrors } from './types';

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.nombre) {
    errors.nombre = 'El nombre es requerido';
  } else if (data.nombre.length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres';
  } else if (!/^[a-zA-Z]+$/.test(data.nombre)) {
    errors.nombre = 'El nombre solo debe contener letras';
  }

  if (!data.apellido) {
    errors.apellido = 'El apellido es requerido';
  } else if (data.apellido.length < 3) {
    errors.apellido = 'El apellido debe tener al menos 3 caracteres';
  } else if (!/^[a-zA-Z]+$/.test(data.apellido)) {
    errors.apellido = 'El apellido solo debe contener letras';
  }

  if (!data.marcaPC) {
    errors.marcaPC = 'La marca de PC es requerida';
  }

  if (!data.email) {
    errors.email = 'El email es requerido';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'El email no es válido';
  }

  return errors;
};

