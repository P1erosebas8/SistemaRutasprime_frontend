import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos Calendar (usamos un ícono simple ya que Bootstrap no lo incluye)
import { Calendar } from 'lucide-react'; 

function RutasPrimeForm() {
  const navigate = useNavigate();
  const dateInputRef = useRef(null); // Ref para el input de fecha
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    licencia: '',
  });

  // --- FUNCIONES DE VALIDACIÓN ---

  // 1. FUNCIÓN: Filtrar números de campos de texto (Nombre y Apellido)
  const handleTextOnlyChange = (e) => {
    const { id, value } = e.target;
    // Expresión regular que reemplaza cualquier dígito (0-9) con una cadena vacía
    const cleanedValue = value.replace(/[0-9]/g, ''); 
    
    setFormData(prev => ({ 
        ...prev, 
        [id]: cleanedValue 
    }));
  };

  // 2. FUNCIÓN: Permitir solo 8 dígitos en DNI
  const handleDniChange = (e) => {
    const { id, value } = e.target;
    // Filtrar solo dígitos y limitar a 8 caracteres
    const cleanedValue = value.replace(/[^0-9]/g, '').slice(0, 8); 
    setFormData(prev => ({ ...prev, [id]: cleanedValue }));
  };

  // 3. FUNCIÓN: Formato estricto para Licencia (1 letra mayúscula + 8 números)
  const handleLicenciaChange = (e) => {
    const { id, value } = e.target;
    let cleanedValue = value.toUpperCase(); // Convertir a mayúsculas
    
    if (cleanedValue.length > 0) {
      // La primera letra debe ser una letra mayúscula (A-Z)
      const firstChar = cleanedValue.charAt(0).replace(/[^A-Z]/g, '');
      // El resto deben ser números, limitados a 8
      const remainingChars = cleanedValue.slice(1).replace(/[^0-9]/g, '').slice(0, 8);
      
      cleanedValue = firstChar + remainingChars;
    }
    
    setFormData(prev => ({ ...prev, [id]: cleanedValue }));
  };

  // 4. FUNCIÓN: Cambio general para campos sin validación especial (e.g., fecha)
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  // --- NAVEGACIÓN Y ACCIONES ---

  const handleNavigateToDocument = (docType) => {
    // La navegación debe ser dinámica
    if (docType === 'perfil') {
      navigate('/foto-perfil');
    } else if (docType === 'licencia') {
      navigate('/foto-licencia');
    } else if (docType === 'antecedentes') {
      navigate('/antecedentes-penales');
    }
  };

  const handleContinuar = () => {
    console.log('Datos del conductor a enviar:', formData);
    // Navega a la pantalla del vehículo
    navigate('/datos-vehiculo'); 
  };

  return (
    // Se añade un fondo blanco o claro para mejor contraste visual
    <div className="container-fluid p-0 bg-light min-vh-100"> 
      {/* Header */}
      <header className="bg-dark text-white p-3 mb-4 d-flex justify-content-between align-items-center">
        <div className='d-flex align-items-center'>
            {/* Botón de volver */}
            <button 
                className="btn btn-dark text-white me-3" 
                onClick={() => navigate(-1)} 
                aria-label="Volver atrás"
            >
                &larr;
            </button>
            <h1 className="fs-4 m-0 fw-bold">RUTASPRIME</h1>
        </div>
        <button className="btn btn-secondary btn-sm rounded-pill">Ayuda?</button>
      </header>
      
      {/* Contenido Principal */}
      <div className="container p-4" style={{ maxWidth: '800px' }}> 
        <h2 className="mb-5 text-center text-dark" style={{ fontSize: '1.75rem' }}>
          ¡Conductor! Para seguir adelante, por favor completa tus datos.
        </h2>
        
        <form>
          {/* Fila 1: NOMBRES y APELLIDOS */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="nombre" className="form-label fw-bold">Nombre(s):</label>
              <input 
                type="text" 
                className="form-control" 
                id="nombre" 
                placeholder="Introduce tu(s) nombre(s)" 
                value={formData.nombre}
                onChange={handleTextOnlyChange} // 🛑 Filtrado de números
                style={{ height: '48px', borderRadius: '8px' }} 
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="apellido" className="form-label fw-bold">Apellidos:</label>
              <input 
                type="text" 
                className="form-control" 
                id="apellido" 
                placeholder="Introduce tus apellidos" 
                value={formData.apellido}
                onChange={handleTextOnlyChange} // 🛑 Filtrado de números
                style={{ height: '48px', borderRadius: '8px' }}
              />
            </div>
          </div>
          
          {/* Fila 2: NÚMERO DE DNI y FECHA DE NACIMIENTO */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="dni" className="form-label fw-bold">Número de DNI:</label>
              <input 
                type="tel" 
                className="form-control" 
                id="dni" 
                placeholder="Introduce tu DNI" 
                value={formData.dni}
                onChange={handleDniChange} // 🛑 Solo 8 números
                maxLength={8}
                style={{ height: '48px', borderRadius: '8px' }}
              />
            </div>
            {/* Fecha de nacimiento - Con botón de calendario */}
            <div className="col-md-6">
              <label htmlFor="fechaNacimiento" className="form-label fw-bold">Fecha de nacimiento:</label>
              <div className="input-group">
                <input 
                  type="date" 
                  className="form-control" 
                  id="fechaNacimiento" 
                  ref={dateInputRef} // Referencia al input
                  placeholder="DD/MM/AAAA" 
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  style={{ height: '48px', borderRadius: '8px 0 0 8px', borderRight: 'none' }}
                />
                {/* Botón de Calendario Negro */}
                <button
                  type="button"
                  className="btn btn-dark" // Botón negro
                  onClick={() => dateInputRef.current && dateInputRef.current.showPicker()}
                  style={{ borderRadius: '0 8px 8px 0', width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Seleccionar fecha de nacimiento"
                >
                  <Calendar size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Fila 3: NÚMERO DE LICENCIA DE CONDUCIR */}
          <div className="row mb-5">
            <div className="col-md-6">
              <label htmlFor="licencia" className="form-label fw-bold">Número de Licencia de Conducir:</label>
              <input 
                type="text" 
                className="form-control" 
                id="licencia" 
                placeholder="Ej. A12345678" 
                value={formData.licencia}
                onChange={handleLicenciaChange} // 🛑 1 Letra Mayúscula + 8 Números
                maxLength={9}
                style={{ height: '48px', borderRadius: '8px' }}
              />
            </div>
          </div>
          
          {/* Bloque de Carga de Documentos (Botones de Navegación) */}
          <div className="d-flex flex-column gap-3 mx-auto" style={{ maxWidth: '400px' }}>
            
            {/* Botones de Documentos */}
            <div 
              className="btn btn-light border d-flex justify-content-between align-items-center p-3 text-start shadow-sm"
              style={{ backgroundColor: 'white', borderRadius: '10px' }}
              onClick={() => handleNavigateToDocument('perfil')} 
            >
              Fotografía de perfil reciente
              <span className="text-secondary fs-5 fw-bold" aria-hidden="true">&gt;</span> 
            </div>
            
            <div 
              className="btn btn-light border d-flex justify-content-between align-items-center p-3 text-start shadow-sm"
              style={{ backgroundColor: 'white', borderRadius: '10px' }}
              onClick={() => handleNavigateToDocument('licencia')} 
            >
              Licencia de Conducir
              <span className="text-secondary fs-5 fw-bold" aria-hidden="true">&gt;</span> 
            </div>
            
            <div 
              className="btn btn-light border d-flex justify-content-between align-items-center p-3 text-start shadow-sm"
              style={{ backgroundColor: 'white', borderRadius: '10px' }}
              onClick={() => handleNavigateToDocument('antecedentes')} 
            >
              Antecedentes Penales
              <span className="text-secondary fs-5 fw-bold" aria-hidden="true">&gt;</span> 
            </div>

            {/* Botón CONTINUAR */}
            <button 
              type="button" 
              className="btn btn-dark text-white p-3 mt-5" 
              onClick={handleContinuar}
              style={{ fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RutasPrimeForm;
