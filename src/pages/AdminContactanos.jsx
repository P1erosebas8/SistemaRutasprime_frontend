import React, { useMemo, useState } from 'react';
import { FaSearch, FaEnvelopeOpen, FaTrashAlt } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';

export default function AdminContactanos() {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const initial = useMemo(() => [
        { id: 'M001', nombre: 'Luis Pérez', correo: 'luis.perez@mail.com', mensaje: 'Hola, tuve un problema con mi último viaje...', fecha: '2025-10-27', leido: false },
        { id: 'M002', nombre: 'María Ruiz', correo: 'maria.ruiz@mail.com', mensaje: 'Necesito la factura del viaje...', fecha: '2025-10-26', leido: true },
        { id: 'M003', nombre: 'Pedro Gómez', correo: 'pedro.gomez@mail.com', mensaje: 'Sería bueno añadir pagos en paypal...', fecha: '2025-10-25', leido: false },
        { id: 'M004', nombre: 'Carolina Díaz', correo: 'carolina.d@mail.com', mensaje: 'El navegador se cierra al abrir perfil...', fecha: '2025-10-24', leido: false },
        { id: 'M005', nombre: 'Jorge Herrera', correo: 'jorge.h@mail.com', mensaje: 'Gracias por el excelente servicio', fecha: '2025-10-23', leido: true },
    ], []);

    const [messages, setMessages] = useState(initial);

    const filtered = messages.filter(m =>
        m.nombre.toLowerCase().includes(search.toLowerCase()) ||
        m.correo.toLowerCase().includes(search.toLowerCase()) ||
        m.mensaje.toLowerCase().includes(search.toLowerCase())
    );

    const open = (m) => {
        setSelected(m);
        setMessages(prev => prev.map(x => x.id === m.id ? { ...x, leido: true } : x));
    };

    const close = () => { setSelected(null); };

    const remove = (id) => {
        if (window.confirm('Eliminar mensaje?')) setMessages(prev => prev.filter(m => m.id !== id));
    };

    return (
        <div className="p-4" style={{ minHeight: '100vh', backgroundColor: '#1e2a52', color: 'white' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Bandeja de Contactos</h2>
                <div style={{ width: 360 }} className="position-relative">
                    <FaSearch className="position-absolute text-secondary" style={{ top: 10, left: 10 }} />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o correo" className="form-control ps-4" style={{ backgroundColor: '#2d3b6a', color: 'white', border: '1px solid #40518b' }} />
                </div>
            </div>

            <div className="d-flex" style={{ gap: 20 }}>
                <div style={{ flex: 1 }}>
                    <div className="row g-3">
                        {filtered.length === 0 ? (
                            <div className="text-center text-secondary py-5">No hay mensajes</div>
                        ) : (
                            filtered.map(m => (
                                <div key={m.id} className="col-12">
                                    <div className={`card bg-dark text-white mb-2 border-0`} style={{ backgroundColor: '#16213e' }}>
                                        <div className="card-body d-flex align-items-center py-2 px-3">
                                            <div className="me-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: 44, height: 44, backgroundColor: 'rgba(255,255,255,0.06)' }}>
                                                <strong style={{ color: 'white' }}>{m.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}</strong>
                                            </div>

                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div style={{ minWidth: 0 }}>
                                                        <div className="fw-semibold" style={{ fontSize: 15, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.nombre} <small className="text-secondary" style={{ fontSize: 12 }}>{m.correo}</small></div>
                                                        <div className="text-white small mt-1" style={{ maxHeight: 40, overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.mensaje}</div>
                                                    </div>
                                                    <div className="text-secondary" style={{ fontSize: 12, marginLeft: 8, whiteSpace: 'nowrap' }}>{m.fecha}</div>
                                                </div>
                                            </div>

                                            <div className="ms-2 text-end d-flex flex-column">
                                                <Button variant="light" size="sm" className="mb-2" onClick={() => open(m)} style={{ padding: '0.25rem 0.4rem' }}><FaEnvelopeOpen /></Button>
                                                <Button variant="outline-light" size="sm" onClick={() => remove(m.id)} style={{ padding: '0.25rem 0.35rem' }}><FaTrashAlt /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div style={{ width: 420 }}>
                    {selected ? (
                        <div className="card bg-dark text-white border-0" style={{ backgroundColor: '#16213e' }}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h5 className="mb-0">{selected.asunto}</h5>
                                            <h5 className="mb-0">Mensaje</h5>
                                        <div className="text-secondary" style={{ fontSize: 13 }}>{selected.nombre} • {selected.correo}</div>
                                    </div>
                                    <div>
                                        <div className="text-secondary" style={{ fontSize: 12 }}>{selected.fecha}</div>
                                    </div>
                                </div>

                                <div style={{ whiteSpace: 'pre-wrap', marginBottom: 12 }}>{selected.mensaje}</div>

                                <Form>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="text-secondary">Responder</Form.Label>
                                        <Form.Control as="textarea" rows={4} placeholder="Escribe una respuesta " id="replyBox" />
                                    </Form.Group>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="secondary" className="me-2" onClick={() => close()}>Cerrar</Button>
                                        <Button variant="success" onClick={() => {
                                            const el = document.getElementById('replyBox');
                                            const text = el?.value || '';
                                            if (!text) return alert('Escribe una respuesta');
                                            setMessages(prev => prev.map(m => m.id === selected.id ? { ...m, replies: [...(m.replies || []), { texto: text, fecha: new Date().toLocaleString() }] } : m));
                                            el.value = '';
                                            alert('Respuesta enviada');
                                        }}>Enviar</Button>
                                    </div>
                                </Form>

                                {selected.replies && selected.replies.length > 0 && (
                                    <div className="mt-3">
                                        <h6 className="text-secondary">Respuestas</h6>
                                        {selected.replies.map((r, i) => (
                                            <div key={i} className="border rounded p-2 my-2" style={{ backgroundColor: '#0f1a33' }}>
                                                <div className="small text-secondary">{r.fecha}</div>
                                                <div>{r.texto}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-secondary">Selecciona un mensaje para ver detalles y responder</div>
                    )}
                </div>
            </div>
        </div>
    );
}
