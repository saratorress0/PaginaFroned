import React, { useEffect, useState } from "react";

export default function NotasTabla({ editable = false, materiaId, gradoId, materiaNombre, gradoNombre }) {
  const columnas = [
    { key: "examen1", label: "Examen 1" },
    { key: "examen2", label: "Examen 2" },
    { key: "examen_final", label: "Examen Final" },
    { key: "h1", label: "H1" },
    { key: "h2", label: "H2" },
    { key: "h3", label: "H3" },
    { key: "h4", label: "H4" },
    { key: "promedio", label: "Nota promediada", readonly: true }
  ];

  const [rows, setRows] = useState([]); // { estudiante, notas: [...] }
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!materiaId || !gradoId) return;
    setLoading(true);

    // 1) pedir notas por id al backend
    fetch(`/api/notas/${materiaId}/${gradoId}`)
      .then((r) => r.json())
      .then((data) => {
        // data: [{ estudiante, columna, nota }, ...]
        if (Array.isArray(data) && data.length > 0) {
          // convertir a filas por estudiante
          const map = {};
          data.forEach((r) => {
            if (!map[r.estudiante]) map[r.estudiante] = Array(columnas.length).fill("");
            const colIndex = columnas.findIndex((c) => c.key === r.columna);
            if (colIndex >= 0) map[r.estudiante][colIndex] = r.nota;
          });
          const arr = Object.entries(map).map(([est, notas]) => ({ estudiante: est, notas }));
          setRows(arr);
          setLoading(false);
        } else {
          // si no hay notas guardadas, pedimos lista de estudiantes para crear filas vacías
          fetch("/api/estudiantes")
            .then((r) => r.json())
            .then((estud) => {
              const arr = estud.map((e) => ({
                estudiante: e.nombre,
                notas: Array(columnas.length).fill("")
              }));
              setRows(arr);
            })
            .catch(() => {
              // fallback si no hay endpoint de estudiantes
              setRows([
                { estudiante: "Pedro", notas: Array(columnas.length).fill("") },
                { estudiante: "Ana", notas: Array(columnas.length).fill("") }
              ]);
            })
            .finally(() => setLoading(false));
        }
      })
      .catch((err) => {
        console.error("Error cargando notas:", err);
        setLoading(false);
      });
  }, [materiaId, gradoId]);

  const handleChange = (rowIndex, colIndex, value) => {
    const newRows = [...rows];
    newRows[rowIndex].notas[colIndex] = value;
    setRows(newRows);
  };

  const calcularPromedio = (notas) => {
    const nums = notas
      .slice(0, columnas.length - 1)
      .map((v) => parseFloat(v))
      .filter((n) => !isNaN(n));
    if (nums.length === 0) return "-";
    const sum = nums.reduce((a, b) => a + b, 0);
    return (sum / nums.length).toFixed(2);
  };

  const guardarNotas = async () => {
    if (!materiaId || !gradoId) {
      alert("Faltan materia o grado (id).");
      return;
    }
    setSaving(true);

    const estudiantesPayload = rows.map((r) => {
      const notasObj = {};
      columnas.forEach((col, i) => {
        if (!col.readonly) {
          notasObj[col.key] = r.notas[i] === "" ? null : r.notas[i];
        }
      });
      return { estudiante: r.estudiante, notas: notasObj };
    });

    try {
      const res = await fetch("/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materiaId,
          gradoId,
          estudiantes: estudiantesPayload
        })
      });
      

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error guardando");
      }

      alert("Notas guardadas ✅");
      // recargar notas desde el servidor para mostrar lo guardado
      setLoading(true);
      const r2 = await fetch(`/api/notas/${materiaId}/${gradoId}`);
      const data = await r2.json();
      if (Array.isArray(data) && data.length > 0) {
        const map = {};
        data.forEach((r) => {
          if (!map[r.estudiante]) map[r.estudiante] = Array(columnas.length).fill("");
          const colIndex = columnas.findIndex((c) => c.key === r.columna);
          if (colIndex >= 0) map[r.estudiante][colIndex] = r.nota;
        });
        const arr = Object.entries(map).map(([est, notas]) => ({ estudiante: est, notas }));
        setRows(arr);
      }
    } catch (err) {
      console.error(err);
      alert("Error guardando notas. Revisa la consola del servidor.");
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando notas...</p>;
  if (!rows.length) return <p>No hay estudiantes / datos</p>;

  return (
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 20 }}>
        <thead>
          <tr style={{ background: "#0d2b45", color: "#fff" }}>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>Estudiante</th>
            {columnas.map((c) => (
              <th key={c.key} style={{ padding: 8, border: "1px solid #ccc" }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              <td style={{ padding: 8, border: "1px solid #ccc" }}>{r.estudiante}</td>
              {r.notas.map((nota, ci) => (
                ci === columnas.length - 1 ? (
                  <td key={ci} style={{ textAlign: "center", border: "1px solid #ccc", padding: 8 }}>
                    {calcularPromedio(r.notas)}
                  </td>
                ) : (
                  <td key={ci} style={{ textAlign: "center", border: "1px solid #ccc", padding: 8 }}>
                    {editable ? (
                      <input
                        type="number"
                        step="0.1"
                        value={nota ?? ""}
                        onChange={(e) => handleChange(ri, ci, e.target.value)}
                        style={{ width: 80, padding: 6, textAlign: "center" }}
                      />
                    ) : (
                      nota ?? ""
                    )}
                  </td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {editable && (
        <button
          onClick={guardarNotas}
          disabled={saving}
          style={{ marginTop: 16, padding: "8px 14px", background: "#0b60a6", color: "#fff", border: "none", borderRadius: 6 }}
        >
          {saving ? "Guardando..." : "Guardar Notas"}
        </button>
      )}
    </div>
  );
}
