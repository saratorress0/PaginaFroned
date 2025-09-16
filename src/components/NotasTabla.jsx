import React, { useState, useEffect } from "react";

function NotasTabla({ editable, materia, grado }) {
  const columnas = ["Examen 1", "Examen 2", "Examen Final", "H1", "H2", "H3", "H4", "Nota promediada"];
  const [notas, setNotas] = useState([
    { estudiante: "Juan Pérez", notas: ["", "", "", "", "", "", "", ""] },
    { estudiante: "María Gómez", notas: ["", "", "", "", "", "", "", ""] },
    { estudiante: "Carlos Ruiz", notas: ["", "", "", "", "", "", "", ""] },
  ]);

  // ✅ Cargar notas de la API
  useEffect(() => {
    fetch(`/api/notas/${materia}/${grado}`)
      .then((res) => res.json())
      .then((data) => {
        const estudiantesMap = {};
        data.forEach((fila) => {
          if (!estudiantesMap[fila.estudiante]) {
            estudiantesMap[fila.estudiante] = Array(columnas.length).fill("");
          }
          const colIndex = columnas.indexOf(fila.columna);
          if (colIndex !== -1) estudiantesMap[fila.estudiante][colIndex] = fila.nota;
        });

        const nuevos = Object.entries(estudiantesMap).map(([estudiante, notas]) => ({
          estudiante,
          notas,
        }));

        if (nuevos.length > 0) setNotas(nuevos);
      })
      .catch((err) => console.error("Error cargando notas:", err));
  }, [materia, grado]);

  // ✅ Cambiar nota en la tabla
  const handleNotaChange = (estIndex, colIndex, valor) => {
    const nuevasNotas = [...notas];
    nuevasNotas[estIndex].notas[colIndex] = valor;
    setNotas(nuevasNotas);
  };

  // ✅ Guardar en la API
  const guardarNotas = () => {
    notas.forEach((fila) => {
      const notasObj = {};
      columnas.forEach((col, i) => {
        if (i < columnas.length - 1) notasObj[col] = fila.notas[i];
      });

      fetch("/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estudiante: fila.estudiante,
          materia,
          grado,
          notas: notasObj,
        }),
      }).then((res) => res.json())
        .then((msg) => console.log("Guardado:", msg))
        .catch((err) => console.error("Error guardando:", err));
    });
  };

  const calcularPromedio = (notas) => {
    const numeros = notas.map((n) => parseFloat(n)).filter((n) => !isNaN(n));
    if (numeros.length === 0) return "-";
    return (numeros.reduce((a, b) => a + b, 0) / numeros.length).toFixed(2);
  };

  return (
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px", background: "#0d2b45", color: "#fff" }}>Estudiante</th>
            {columnas.map((col, i) => (
              <th key={i} style={{ border: "1px solid #ccc", padding: "8px", background: "#0d2b45", color: "#fff" }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {notas.map((fila, estIndex) => (
            <tr key={estIndex}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{fila.estudiante}</td>
              {fila.notas.map((nota, colIndex) =>
                colIndex === columnas.length - 1 ? (
                  <td key={colIndex} style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                    {calcularPromedio(fila.notas.slice(0, -1))}
                  </td>
                ) : (
                  <td key={colIndex} style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {editable ? (
                      <input
                        type="number"
                        value={nota}
                        onChange={(e) => handleNotaChange(estIndex, colIndex, e.target.value)}
                        style={{ width: "80px", padding: "5px", textAlign: "center" }}
                      />
                    ) : (
                      nota
                    )}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {editable && (
        <button
          onClick={guardarNotas}
          style={{ marginTop: "15px", padding: "10px 20px", background: "#0d2b45", color: "#fff", border: "none", borderRadius: "5px" }}
        >
          Guardar Notas
        </button>
      )}
    </div>
  );
}

export default NotasTabla;

