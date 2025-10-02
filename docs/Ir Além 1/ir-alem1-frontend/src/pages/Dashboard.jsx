import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { usePatients } from "../contexts/PatientsContext.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { state } = usePatients();

  const totalConsultas = state.list.reduce(
    (sum, p) => sum + p.appointments,
    0
  );

  const data = [
    { name: "Pacientes", value: state.list.length },
    { name: "Consultas", value: totalConsultas },
  ];

  return (
    <div className="container">
      <div className="header">
        <h2>Dashboard</h2>
        <div>
          <span className="small">Olá, {user?.email}</span>
          <button className="btn" onClick={logout}>
            Sair
          </button>
        </div>
      </div>

      {/* Cards simples */}
      <div className="row">
        <div className="card">
          <div className="small">Pacientes</div>
          <div className="stat">{state.list.length}</div>
        </div>
        <div className="card">
          <div className="small">Consultas</div>
          <div className="stat">{totalConsultas}</div>
        </div>
      </div>

      {/* Gráfico */}
      <div style={{ marginTop: 20 }} className="card">
        <h3 className="small">Visão Geral</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Rodapé */}
      <div style={{ marginTop: 16 }} className="card small">
        Projeto CardioIA – portal simulado. Dados de pacientes carregados de API
        pública (JSONPlaceholder) e contagens derivadas.
      </div>
    </div>
  );
}
