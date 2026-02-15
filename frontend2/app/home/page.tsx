// Pagina de prueba
"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow">
            <div>
              <h1 className="text-3xl font-bold">Facturador</h1>
              <p className="text-gray-600 mt-1">
                Bienvenido, {user?.email || "Usuario"}
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Cerrar Sesión
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">📄 Facturas</h2>
              <p className="text-gray-600">Gestiona tus facturas</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">👥 Clientes</h2>
              <p className="text-gray-600">Administra clientes</p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">📊 Reportes</h2>
              <p className="text-gray-600">Ver estadísticas</p>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
