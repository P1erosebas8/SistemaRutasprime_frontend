import React, { useState } from 'react';
import { FaSearch, FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';
import { useDrivers } from '../../contexts/DriversContext';

export default function AprobarConductores() {
    const [search, setSearch] = useState('');
    const { pending, approvePending, rejectPending } = useDrivers();

    const [selected, setSelected] = useState(null);
    const [show, setShow] = useState(false);

    const open = (d) => { setSelected(d); setShow(true); };
    const close = () => { setSelected(null); setShow(false); };

    const approve = (d) => {
        if (window.confirm(`Aprobar a ${d.nombre}?`)) {
            approvePending(d);
            console.log('Aprobado:', d);
        }
    };

    const reject = (d) => {
        if (window.confirm(`Rechazar a ${d.nombre}?`)) {
            rejectPending(d);
            console.log('Rechazado:', d);
        }
    };

    const filtered = pending.filter(d =>
        d.nombre.toLowerCase().includes(search.toLowerCase()) ||
        d.dni.toLowerCase().includes(search.toLowerCase()) ||
        d.placa.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4" style={{ minHeight: '100vh', backgroundColor: '#1e2a52' }}>
            <div className="d-flex justify-content-between align-items-center mb-4 text-white">
                <h2 className="mb-0">Aprobación de conductores (pendientes)</h2>
                <div style={{ width: 320 }} className="position-relative">
                    <FaSearch className="position-absolute text-secondary" style={{ top: 10, left: 10 }} />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre, dni o placa" className="form-control ps-4" style={{ backgroundColor: '#2d3b6a', color: 'white', border: '1px solid #40518b' }} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="text-center text-secondary py-5">No hay solicitudes pendientes</div>
            ) : (
                <div className="row g-2">
                    {filtered.map(d => (
                        <div key={d.id} className="col-12 col-sm-6 col-md-4">
                            <div className="card bg-dark text-white mb-2 border-secondary" style={{ overflow: 'hidden' }}>
                                <div className="card-body d-flex align-items-center py-2 px-2">
                                    <div style={{ width: 40, height: 40 }} className="d-flex align-items-center justify-content-center rounded-circle bg-secondary me-2 flex-shrink-0">
                                        <span className="fw-bold text-white" style={{ fontSize: 14 }}>{d.nombre.split(' ').map(n => n[0]).slice(0,2).join('')}</span>
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <div className="fw-semibold" style={{ fontSize: 14 }}>{d.nombre} <small className="text-secondary" style={{ fontSize: 12 }}>{d.dni}</small></div>
                                                <div className="text-secondary small mt-1" style={{ fontSize: 12 }}>Correo: {d.correo || '-'} • Tel: {d.telefono || '-'}</div>
                                                <div className="text-secondary small" style={{ fontSize: 12 }}>Licencia: {d.licencia || '-'} • Placa: {d.placa}</div>
                                            </div>
                                            <div className="text-end ms-2">
                                                <div className="badge bg-transparent text-secondary" style={{ fontSize: 11 }}>{d.fecha}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ms-2 d-flex flex-column align-items-end">
                                        <div>
                                            <Button variant="outline-info" size="sm" className="me-1" onClick={() => open(d)} style={{ padding: '0.25rem 0.4rem' }}><FaEye /></Button>
                                            <Button variant="success" size="sm" className="me-1" onClick={() => approve(d)} style={{ padding: '0.25rem 0.5rem', fontSize: 12 }}><FaCheck /></Button>
                                            <Button variant="danger" size="sm" onClick={() => reject(d)} style={{ padding: '0.25rem 0.45rem', fontSize: 12 }}><FaTimes /></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal show={show} onHide={close} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#2d3b6a', color: 'white' }}>
                    <Modal.Title>Solicitud</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#1e2a52', color: 'white' }}>
                    {selected && (
                        <div>
                            <p><strong>Nombre:</strong> {selected.nombre}</p>
                            <p><strong>DNI:</strong> {selected.dni}</p>
                            <p><strong>Correo:</strong> {selected.correo || '-'}</p>
                            <p><strong>Teléfono:</strong> {selected.telefono || '-'}</p>
                            <p><strong>Licencia:</strong> {selected.licencia || '-'}</p>
                            <p><strong>Placa:</strong> {selected.placa}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#2d3b6a' }}>
                    <Button variant="secondary" onClick={close}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
