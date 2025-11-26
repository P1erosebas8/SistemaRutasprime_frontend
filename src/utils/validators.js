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
    if (!/^\d{8}$/.test(value)) {
      return "El DNI debe tener 8 dígitos";
    }
    return null;
  },
  password: (value) => {
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
      return "Mínimo 8 caracteres, mayúscula, minúscula, número y caracter especial";
    }
    return null;
  },
  numeroLicenciaConducir: (value) => {
    if (!value) return "Campo obligatorio";
    if (!/^[A-Za-z]\d{8}$/.test(value)) {
      return "Formato inválido. Ejemplo: Q70398332";
    }
    return null;
  },
  fechaNacimiento: (value) => {
    if (!value) return "La fecha de nacimiento es obligatoria";

    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const d = today.getDate() - birthDate.getDate();

    if (m < 0 || (m === 0 && d < 0)) {
      age--;
    }

    if (isNaN(age)) return "Fecha inválida";
    if (age < 18) return "Debes tener al menos 18 años";

    return null;
  },
};

export const validateProfileUpdate = ({ celular, direccion }) => {
  const errors = {};
  if (celular !== undefined && !/^[0-9]{9}$/.test(celular)) {
    errors.celular = "El celular debe tener exactamente 9 dígitos";
  }
  const direccionRegex = /^(?!(.*\d+[A-Za-z]+))([A-Za-zÁÉÍÓÚÑáéíóúñ]+\.?\s)+[0-9]+$/;
  if (direccion !== undefined && !direccionRegex.test(direccion)) {
    errors.direccion = "La dirección debe tener al menos 2 palabras válidas y terminar con un número (ejemplo: 'Av. Lima 123')";
  }
  return Object.keys(errors).length > 0 ? errors : null;
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

export const contactValidators = {
  name: (value) => {
    if (!value.trim()) return "El nombre es obligatorio";
    if (value.trim().length < 3) return "El nombre debe tener al menos 3 caracteres";
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/.test(value)) return "Solo se permiten letras";
    return null;
  },
  email: (value) => {
    if (!value.trim()) return "El correo es obligatorio";
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|org|net|edu|pe|es|gov|ch)$/.test(value)) {
      return "Formato de correo inválido o dominio no permitido";
    }
    return null;
  },
  message: (value) => {
    if (!value.trim()) return "El mensaje no puede estar vacío";
    if (value.trim().length < 10) return "Debe tener al menos 10 caracteres";
    return null;
  },
};

export const vehiculoValidators = {
  placa: (value) => {
    if (!value) return "La placa es obligatoria";
    const regex = /^([A-Z]{3}-?\d{3}|[A-Z]{1}\d{1}[A-Z]{1}-?\d{3})$/i;
    if (!regex.test(value)) {
      return "Formato inválido. Ejemplo: ABC-123 o A1B-234";
    }

    return null;
  },

  anioFabricacion: (value) => {
    if (!value) return "El año de fabricación es obligatorio";

    if (!/^\d{4}$/.test(value)) {
      return "El año debe tener exactamente 4 dígitos";
    }
    const currentYear = new Date().getFullYear();
    const year = parseInt(value, 10);
    if (year < 1995) return "El año no puede ser menor a 1995";
    if (year > currentYear)
      return `El año no puede ser mayor a ${currentYear}`;

    return null;
  },
};