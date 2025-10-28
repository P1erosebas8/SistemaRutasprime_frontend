import React, { createContext, useContext, useEffect, useState } from "react";

const DriversContext = createContext(null);

const DEFAULT_APPROVED = [
    { codigo: "C001", nombre: "Juan Pérez", dni: "12345678", correo: "juan@example.com", telefono: "987654321", licencia: "L-12345", placa: "ABC-123", estado: "Aprobado", fecha: "2025-10-20", rating: 4.8, viajes: 150 },
    { codigo: "C002", nombre: "María García", dni: "87654321", correo: "maria@example.com", telefono: "912345678", licencia: "L-67890", placa: "XYZ-987", estado: "Rechazado", fecha: "2025-10-25", rating: null, viajes: 0 },
];

const DEFAULT_PENDING = [
    { id: 'P001', nombre: 'Carlos Rodríguez', dni: '45678912', correo: 'carlos@example.com', telefono: '977001122', licencia: 'L-54321', placa: 'DEF-456', fecha: '2025-10-27' },
    { id: 'P002', nombre: 'Ana López', dni: '78912345', correo: 'ana@example.com', telefono: '977334455', licencia: 'L-98765', placa: 'GHI-789', fecha: '2025-10-28' },
    { id: 'P003', nombre: 'Luis Fernández', dni: '32165498', correo: 'luisf@example.com', telefono: '977556677', licencia: 'L-11223', placa: 'JKL-321', fecha: '2025-10-26' },
    { id: 'P004', nombre: 'Sofía Martínez', dni: '15935724', correo: 'sofia.m@example.com', telefono: '977778899', licencia: 'L-33445', placa: 'MNO-654', fecha: '2025-10-29' },
    { id: 'P005', nombre: 'Diego Torres', dni: '74185296', correo: 'diego.t@example.com', telefono: '977990011', licencia: 'L-55667', placa: 'PQR-987', fecha: '2025-10-30' },
    { id: 'P006', nombre: 'Marcos Rivera', dni: '85296314', correo: 'marcos.r@example.com', telefono: '977121314', licencia: 'L-77889', placa: 'STU-123', fecha: '2025-10-21' },
    { id: 'P007', nombre: 'Valeria Gómez', dni: '96325874', correo: 'valeria.g@example.com', telefono: '977141516', licencia: 'L-99001', placa: 'VWX-456', fecha: '2025-10-22' },
    { id: 'P008', nombre: 'Antonio Ruiz', dni: '14725836', correo: 'antonio.r@example.com', telefono: '977171819', licencia: 'L-22334', placa: 'YZA-789', fecha: '2025-10-23' },
    { id: 'P009', nombre: 'Camila Ortiz', dni: '25836914', correo: 'camila.o@example.com', telefono: '977202122', licencia: 'L-44556', placa: 'BCD-321', fecha: '2025-10-24' },
    { id: 'P010', nombre: 'Rafael Vega', dni: '36914725', correo: 'rafael.v@example.com', telefono: '977232425', licencia: 'L-66778', placa: 'EFG-654', fecha: '2025-10-31' },
];

export function DriversProvider({ children }) {
    const [approved, setApproved] = useState(() => {
        try {
            const raw = localStorage.getItem("drivers_approved");
            return raw ? JSON.parse(raw) : DEFAULT_APPROVED;
        } catch (e) {
            console.error("drivers_approved parse error", e);
            return DEFAULT_APPROVED;
        }
    });

    const [pending, setPending] = useState(() => {
            try {
                const raw = localStorage.getItem("drivers_pending");
                if (raw) {
                    const stored = JSON.parse(raw);
                    // Merge stored pending with DEFAULT_PENDING: keep stored entries but fill missing fields from defaults,
                    // and add any default entries that are not present in storage (useful after adding new examples).
                    const storedById = Object.fromEntries((stored || []).map((s) => [s.id, s]));
                    const merged = (stored || []).map((s) => {
                        const def = DEFAULT_PENDING.find((d) => d.id === s.id) || {};
                        return { ...def, ...s };
                    });
                    DEFAULT_PENDING.forEach((d) => {
                        if (!storedById[d.id]) merged.push(d);
                    });
                    return merged;
                }
                return DEFAULT_PENDING;
            } catch (e) {
                console.error("drivers_pending parse error", e);
                return DEFAULT_PENDING;
            }
    });

    useEffect(() => {
        localStorage.setItem("drivers_approved", JSON.stringify(approved));
    }, [approved]);

    useEffect(() => {
        localStorage.setItem("drivers_pending", JSON.stringify(pending));
    }, [pending]);

    const genCodigo = () => {
        const next = approved.length + 1;
        return `C${next.toString().padStart(3, "0")}`;
    };

    const addDriver = (driver) => {
        const withCode = { codigo: driver.codigo || genCodigo(), estado: driver.estado || "Aprobado", fecha: driver.fecha || new Date().toLocaleDateString(), rating: driver.rating ?? null, viajes: driver.viajes ?? 0, ...driver };
        setApproved((prev) => [...prev, withCode]);
        return withCode;
    };

    const updateDriver = (codigo, updates) => {
        setApproved((prev) => prev.map((d) => (d.codigo === codigo ? { ...d, ...updates } : d)));
    };

    const deleteDriver = (codigo) => {
        setApproved((prev) => prev.filter((d) => d.codigo !== codigo));
    };

    const approvePending = (p) => {
        const nuevo = {
            codigo: genCodigo(),
            nombre: p.nombre,
            dni: p.dni,
            correo: p.correo || "",
            telefono: p.telefono || "",
            licencia: p.licencia || "",
            placa: p.placa,
            estado: "Aprobado",
            fecha: new Date().toLocaleDateString(),
            rating: null,
            viajes: 0,
        };
        setApproved((prev) => [...prev, nuevo]);
        setPending((prev) => prev.filter((x) => x.id !== p.id));
        return nuevo;
    };

    const rejectPending = (p) => {
        setPending((prev) => prev.filter((x) => x.id !== p.id));
    };

    const addPending = (p) => {
        setPending((prev) => [...prev, p]);
    };

    return (
        <DriversContext.Provider value={{ approved, pending, addDriver, updateDriver, deleteDriver, approvePending, rejectPending, addPending }}>
            {children}
        </DriversContext.Provider>
    );
}

export const useDrivers = () => {
    const ctx = useContext(DriversContext);
    if (!ctx) throw new Error("useDrivers must be used within DriversProvider");
    return ctx;
};

export default DriversContext;
