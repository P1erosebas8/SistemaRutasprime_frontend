export const validators = {
    nombres: (value) => {
      if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,}$/.test(value)) {
        return "Nombres solo letras y mínimo 3 caracteres";
      }
      return null;
    },
    apellidos: (value) => {
      if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,}$/.test(value)) {
        return "Apellidos solo letras y mínimo 3 caracteres";
      }
      return null;
    },
    celular: (value) => {
      if (!/^[0-9]{9}$/.test(value)) {
        return "El celular debe tener exactamente 9 dígitos";
      }
      return null;
    },
    email: (value) => {
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|org|net|edu|pe|es|gov)$/.test(value)) {
        return "Formato de correo inválido o dominio no permitido";
      }
      return null;
    },
    direccion: (value) => {
      if (!/^(?!(.*\d+[A-Za-z]+))([A-Za-zÁÉÍÓÚÑáéíóúñ]+\.?\s)+[0-9]+$/.test(value)) {
        return "Ejemplo válido: 'Av. Lima 123', 'Calle Los Olivos 456'";
      }
      return null;
    },
    dniRuc: (value) => {
      if (!/^(\d{8}|\d{11})$/.test(value)) {
        return "El DNI debe tener 8 dígitos y el RUC 11";
      }
      return null;
    },
    password: (value) => {
      if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
        return "Mínimo 8 caracteres, mayúscula, minúscula, número y caracter especial";
      }
      return null;
    },
  };
  
  export const validateProfileUpdate = ({ nombres, apellidos, direccion }) => {
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,}$/.test(nombres)) {
      return "Los nombres deben tener solo letras y al menos 3 caracteres.";
    }
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,}$/.test(apellidos)) {
      return "Los apellidos deben tener solo letras y al menos 3 caracteres.";
    }
    if (!/^(?!(.*\d+[A-Za-z]+))([A-Za-zÁÉÍÓÚÑáéíóúñ]+\.?\s)+[0-9]+$/.test(direccion)) {
      return "La dirección debe contener mínimo 2 palabras válidas (ej. 'Av. Lima 123').";
    }
    return null;
  };
  
  export const validateChangePassword = ({ oldPassword, newPassword, confirmPassword }) => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return "Completa todos los campos de contraseña.";
    }
    if (newPassword !== confirmPassword) {
      return "Las contraseñas nuevas no coinciden.";
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword)) {
      return "La nueva contraseña debe tener al menos 8 caracteres, con mayúscula, minúscula, número y caracter especial.";
    }
    return null;
  };  