import React, { useState } from "react";
import "./HistoryList.scss";

const HistoryList = ({ history = [], onClearHistory }) => {
  const [search, setSearch] = useState("");

  const filteredHistory = history.filter(h =>
    h.details?.toLowerCase().includes(search.toLowerCase()) ||
    h.action?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="history-container">
      <div className="history-header">
        <input
          className="history-search"
          placeholder="Buscar historial..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="history-clear-btn" onClick={onClearHistory}>Borrar historial</button>
      </div>
      <div className="history-table-scroll">
        <table className="history-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Acción</th>
              <th>Producto</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((h, i) => (
                <tr key={h._id || i}>
                  <td>{h.date ? new Date(h.date).toLocaleString() : "—"}</td>
                  <td>{h.action}</td>
                  <td>{h.product?.name || "—"}</td>
                  <td>{h.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", color: "#888" }}>No hay historial.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryList;
