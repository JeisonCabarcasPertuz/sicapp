export interface FormData {
    nombre: string;
    apellido: string;
    marcaPC: string;
    email: string;
  }
  
  export interface FormErrors {
    nombre?: string;
    apellido?: string;
    marcaPC?: string;
    email?: string;
  }

  export interface dataResponse {
    status?: string;
    message?: string;
    data?: [] | object;
  }
  
  