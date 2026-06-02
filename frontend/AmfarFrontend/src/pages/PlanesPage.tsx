import { useEffect, useState } from "react";
import { planesApi } from "../api/planesApi";
import { descuentosApi } from "../api/descuentosApi";
import type { PlanDTO } from "../api/planesApi";
import type { DescuentoDTO } from "../api/descuentosApi";
import { Package, Tag, Edit2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import PlanForm from "../components/planes/PlanForm";
import DescuentoForm from "../components/planes/DescuentoForm";
import PlanList from "../components/planes/PlanList";

function PlanesPage() {
  const [planes, setPlanes] = useState<PlanDTO[]>([]);
  const [descuentos, setDescuentos] = useState<DescuentoDTO[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [planEditar, setPlanEditar] = useState<PlanDTO | null>(null);
  const [descuentoEditar, setDescuentoEditar] = useState<DescuentoDTO | null>(null);

  const cargarDatos = async () => {
    setCargando(true);
    setError("");
    try {
      const [planesData, descuentosData] = await Promise.all([
        planesApi.obtenerTodos(),
        descuentosApi.obtenerTodos()
      ]);
      setPlanes(planesData);
      setDescuentos(descuentosData);
    } catch {
      setError("Error al cargar datos.");
      toast.error("No se pudieron cargar los datos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const guardarPlan = async (plan: PlanDTO) => {
    try {
      if (planEditar) {
        await planesApi.actualizar(planEditar.codigo, plan);
        toast.success("Plan actualizado correctamente");
      } else {
        await planesApi.crear(plan);
        toast.success("Plan creado correctamente");
      }
      setPlanEditar(null);
      await cargarDatos();
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar el plan");
    }
  };

  const eliminarPlan = async (codigo: string) => {
    if (!window.confirm("¿Dar de baja este plan?")) return;
    try {
      await planesApi.desactivar(codigo);
      await cargarDatos();
      toast.success("Plan desactivado");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo desactivar el plan");
    }
  };

  const guardarDescuento = async (descuento: DescuentoDTO) => {
    try {
      if (descuentoEditar) {
        await descuentosApi.actualizar(descuentoEditar.codigo, descuento);
        toast.success("Descuento actualizado correctamente");
      } else {
        await descuentosApi.crear(descuento);
        toast.success("Descuento creado correctamente");
      }
      setDescuentoEditar(null);
      await cargarDatos();
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar el descuento");
    }
  };

  const eliminarDescuento = async (codigo: string) => {
    if (!window.confirm("¿Dar de baja este descuento?")) return;
    try {
      await descuentosApi.desactivar(codigo);
      await cargarDatos();
      toast.success("Descuento desactivado");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo desactivar el descuento");
    }
  };

  if (cargando) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-amfar-black">Gestión de Planes y Descuentos</h1>
        </div>
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="h-4 bg-gray-100 rounded w-1/3 mb-4"></div>
              <div className="h-20 bg-gray-50 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-amfar-black">Gestión de Planes y Descuentos</h1>
        <p className="text-gray-500">Administra los planes de estudio y descuentos disponibles.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-amfar-black mb-4 flex items-center gap-2">
          <Package size={20} className="text-amfar-gold" />
          {planEditar ? "Editar Plan" : "Registrar Nuevo Plan"}
        </h2>
        <PlanForm planEditar={planEditar} onGuardar={guardarPlan} onCancelar={() => setPlanEditar(null)} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-amfar-black mb-4">Planes Registrados</h2>
        <PlanList planes={planes} onEditar={setPlanEditar} onEliminar={eliminarPlan} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-amfar-black mb-4 flex items-center gap-2">
          <Tag size={20} className="text-amfar-gold" />
          {descuentoEditar ? "Editar Descuento" : "Registrar Nuevo Descuento"}
        </h2>
        <DescuentoForm descuentoEditar={descuentoEditar} onGuardar={guardarDescuento} onCancelar={() => setDescuentoEditar(null)} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-amfar-black mb-4">Descuentos Disponibles</h2>
        {descuentos.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
            <Tag size={48} className="text-gray-200" />
            <p className="text-sm">No hay descuentos registrados.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Código</th>
                <th className="px-4 py-3 font-semibold">Nombre</th>
                <th className="px-4 py-3 font-semibold">Porcentaje</th>
                <th className="px-4 py-3 font-semibold">Descripción</th>
                <th className="px-4 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {descuentos.map((descuento) => (
                <tr key={descuento.codigo} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-4 py-3 text-xs font-mono font-bold text-gray-400">{descuento.codigo}</td>
                  <td className="px-4 py-3 font-medium text-amfar-black">{descuento.nombreDescuento}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {descuento.porcentaje}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{descuento.descripcion}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setDescuentoEditar(descuento)} className="p-2 text-gray-400 hover:text-amfar-gold hover:bg-amfar-gold/10 rounded-lg transition-all" title="Editar">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => eliminarDescuento(descuento.codigo)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Eliminar">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PlanesPage;
