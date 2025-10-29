import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos Calendar para el selector de año
import { Calendar } from 'lucide-react'; 

// Opciones de Marcas de Camiones (ejemplo ampliado)
const truckBrands = [
  'Selecciona Marca', 'Freightliner', 'Kenworth', 'Volvo', 
  'Scania', 'Mercedes-Benz', 'International', 'Peterbilt', 
  'Mack', 'DAF', 'Iveco', 'Man', 'Foton', 'Hino', 'Isuzu', 
  'Renault', 'Dongfeng', 'Tatra', 'Western Star' // Más opciones
];

// Opciones de Colores (ejemplo ampliado)
const truckColors = [
  'Selecciona Color', 'Blanco', 'Negro', 'Gris Plata', 
  'Rojo Vivo', 'Azul Marino', 'Verde Bosque', 'Amarillo Sol', 
  'Naranja', 'Marrón', 'Plateado Metálico', 'Dorado', 'Púrpura',
  'Beige', 'Turquesa', 'Gris Oscuro' // Más opciones
];


function RutasPrimeVehiculo() {
  const navigate = useNavigate();
  const yearInputRef = useRef(null); // Ref para el input de año

  const [formData, setFormData] = useState({
    placa: '',
    marca: truckBrands[0], // Valor predeterminado
    color: truckColors[0], // Valor predeterminado
    anioFabricacion: '',
  });

  // --- FUNCIÓN DE VALIDACIÓN DE PLACA ---
  // Requerimiento: 6 dígitos (letras/números) separados por un guion, solo mayúsculas.
  const handlePlacaChange = (e) => {
    const { value } = e.target;
    // 1. Convertir a mayúsculas
    let cleanedValue = value.toUpperCase();
    
    // 2. Filtrar para permitir solo letras (A-Z) y números (0-9)
    let filteredValue = cleanedValue.replace(/[^A-Z0-9]/g, '');

    // 3. Aplicar formato (3 caracteres - guion - 3 caracteres)
    let formattedValue = '';
    
    if (filteredValue.length > 3) {
      // Si hay más de 3 caracteres, inserta el guion
      formattedValue = filteredValue.substring(0, 3) + '-' + filteredValue.substring(3, 6);
    } else {
      // Si son 3 o menos, déjalo sin guion
      formattedValue = filteredValue;
    }
    
    // 4. Limitar la longitud total (máximo 7 caracteres, incluyendo el guion)
    if (formattedValue.length > 7) {
        formattedValue = formattedValue.slice(0, 7);
    }

    setFormData(prev => ({ ...prev, placa: formattedValue }));
  };

  // --- CAMBIO GENERAL (Para selects y otros inputs) ---
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  // --- NAVEGACIÓN Y ACCIONES ---

  // Navegación a las pantallas de documentos
  const handleDocumentClick = (docType) => {
    // Es importante usar una estructura condicional robusta para evitar el alert()
    if (docType === 'Tarjeta de propiedad') {
      navigate('/subir-tarjeta-propiedad');
    } else if (docType === 'Tarjeta de circulación') {
      navigate('/subir-tarjeta-circulacion');
    } else if (docType === 'Soat') {
      navigate('/subir-soat'); 
    } else if (docType === 'Revisión técnica') { 
      navigate('/subir-revision-tecnica');
    } else {
      console.error(`Error de navegación: Ruta no definida para ${docType}`);
      // Usamos console.error en lugar de alert()
    }
  };

  const handleContinuar = () => {
    // Lógica para enviar o validar datos antes de continuar/finalizar
    console.log('Datos del vehículo a enviar:', formData);
    // Podrías navegar a una pantalla de confirmación o dashboard
    navigate('/confirmacion'); 
  };


  return (
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
          ¡Ya casi terminamos! Solo necesitamos que llenes los datos del vehículo para continuar.
        </h2>
        
        <form>
          {/* Fila 1: Placa y Marca */}
          <div className="row mb-5">
            {/* Campo PLACA con Validación */}
            <div className="col-md-6 mb-4 mb-md-0">
              <label htmlFor="placa" className="form-label fw-bold">Placa:</label>
              <input 
                type="text" 
                className="form-control" 
                id="placa" 
                placeholder="Ej. ABC-123" 
                value={formData.placa}
                onChange={handlePlacaChange} // 🛑 Validación de Placa
                maxLength={7} // A-B-C-1-2-3 (6 dígitos) + guion (1) = 7
                style={{ height: '48px', borderRadius: '8px' }} 
              />
              <small className="form-text text-muted">Formato: 3-3 (Letras/Números). Ej: T4C-67G</small>
            </div>

            {/* Campo MARCA (Select Ampliado) */}
            <div className="col-md-6">
              <label htmlFor="marca" className="form-label fw-bold">Marca:</label>
              <select 
                className="form-select" 
                id="marca" 
                value={formData.marca}
                onChange={handleChange}
                style={{ height: '48px', borderRadius: '8px' }}
              >
                {/* Opciones de Marcas Ampliadas */}
                {truckBrands.map(brand => (
                  <option key={brand} value={brand} disabled={brand.startsWith('Selecciona')}>{brand}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Fila 2: Color y Año de fabricación */}
          <div className="row mb-5">
            {/* Campo COLOR (Select Ampliado) */}
            <div className="col-md-6 mb-4 mb-md-0">
              <label htmlFor="color" className="form-label fw-bold">Color:</label>
              <select 
                className="form-select" 
                id="color" 
                value={formData.color}
                onChange={handleChange}
                style={{ height: '48px', borderRadius: '8px' }}
              >
                {/* Opciones de Colores Ampliadas */}
                {truckColors.map(color => (
                  <option key={color} value={color} disabled={color.startsWith('Selecciona')}>{color}</option>
                ))}
              </select>
            </div>
            
            {/* Campo AÑO DE FABRICACIÓN (Con Botón Calendario Negro) */}
            <div className="col-md-6">
              <label htmlFor="anioFabricacion" className="form-label fw-bold">Año de fabricación:</label>
              <div className="input-group">
                <input 
                  type="number" // Tipo number para forzar el teclado numérico en móviles
                  className="form-control" 
                  id="anioFabricacion" 
                  ref={yearInputRef} // Referencia para el selector
                  placeholder="YYYY" 
                  value={formData.anioFabricacion}
                  onChange={handleChange}
                  min="1980" 
                  max={new Date().getFullYear()}
                  maxLength={4}
                  style={{ height: '48px', borderRadius: '8px 0 0 8px', borderRight: 'none' }}
                />
                {/* Botón de Calendario Negro */}
                <button
                  type="button"
                  className="btn btn-dark" // Botón negro
                  onClick={() => {
                    // Temporalmente cambia a tipo 'date' para invocar el selector nativo
                    if (yearInputRef.current) {
                        yearInputRef.current.type = 'date';
                        yearInputRef.current.showPicker();
                        // Al cerrarse, el navegador lo devolverá a 'number' o lo gestionará internamente.
                        // Mantenerlo en 'number' es más apropiado para capturar solo el año.
                    }
                  }}
                  style={{ 
                    borderRadius: '0 8px 8px 0', 
                    width: '48px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                  aria-label="Seleccionar año de fabricación"
                >
                  <Calendar size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Bloque de Carga de Documentos del Vehículo (Botones/Cards) */}
          <div className="d-flex flex-column gap-3 mx-auto" style={{ maxWidth: '400px' }}>
            
            {/* Botón 1: Tarjeta de propiedad */}
            <div 
              className="btn border text-start p-3 d-flex justify-content-between align-items-center bg-white shadow-sm"
              style={{ borderRadius: '10px' }}
              onClick={() => handleDocumentClick('Tarjeta de propiedad')} 
            >
              Tarjeta de propiedad
              <span className="text-secondary fs-5 fw-bold" aria-hidden="true">&gt;</span> 
            </div>

            {/* Botón 2: Tarjeta de circulación */}
            <div 
              className="btn border text-start p-3 d-flex justify-content-between align-items-center bg-white shadow-sm"
              style={{ borderRadius: '10px' }}
              onClick={() => handleDocumentClick('Tarjeta de circulación')} 
            >
              Tarjeta de circulación
              <span className="text-secondary fs-5 fw-bold" aria-hidden="true">&gt;</span> 
            </div>
            
            {/* Botón 3: Soat */}
            <div 
              className="btn border text-start p-3 d-flex justify-content-between align-items-center bg-white shadow-sm"
              style={{ borderRadius: '10px' }}
              onClick={() => handleDocumentClick('Soat')}
            >
              Soat
              <span className="text-secondary fs-5 fw-bold" aria-hidden="true">&gt;</span> 
            </div>

            {/* Botón 4: Revisión técnica */}
            <div 
              className="btn border text-start p-3 d-flex justify-content-between align-items-center bg-white shadow-sm"
              style={{ borderRadius: '10px' }}
              onClick={() => handleDocumentClick('Revisión técnica')}
            >
              Revisión técnica
              <span className="text-secondary fs-5 fw-bold" aria-hidden="true">&gt;</span> 
            </div>
            
            {/* Botón FINALIZAR */}
            <button 
              type="button" 
              className="btn btn-success text-white p-3 mt-5" 
              onClick={handleContinuar}
              style={{ fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            >
              Finalizar Registro
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default RutasPrimeVehiculo;
