import React from 'react';
import { PRDDocument, DataEntity, EntityField } from '../../types/prd.js';
import { Database, Plus, Trash2, Key } from 'lucide-react';

interface DataModelsTabProps {
  doc: PRDDocument;
  onChange: (updates: Partial<PRDDocument>) => void;
}

export const DataModelsTab: React.FC<DataModelsTabProps> = ({ doc, onChange }) => {
  const addEntity = () => {
    const newEntity: DataEntity = {
      id: `model-${Date.now()}`,
      entityName: 'NewEntity',
      description: 'Deskripsi model entitas ini',
      fields: [
        { name: 'id', type: 'string (UUID)', isRequired: true, description: 'Primary key' },
        { name: 'createdAt', type: 'timestamp', isRequired: true, description: 'Waktu dibuat' },
      ],
    };
    onChange({ dataModels: [...(doc.dataModels || []), newEntity] });
  };

  const updateEntity = (entityId: string, updates: Partial<DataEntity>) => {
    const updated = (doc.dataModels || []).map((m) => (m.id === entityId ? { ...m, ...updates } : m));
    onChange({ dataModels: updated });
  };

  const removeEntity = (entityId: string) => {
    onChange({ dataModels: (doc.dataModels || []).filter((m) => m.id !== entityId) });
  };

  const addField = (entityId: string) => {
    const entity = (doc.dataModels || []).find((m) => m.id === entityId);
    if (!entity) return;
    const newField: EntityField = {
      name: 'field_name',
      type: 'string',
      isRequired: false,
      description: 'Keterangan field',
    };
    updateEntity(entityId, { fields: [...entity.fields, newField] });
  };

  const updateField = (entityId: string, fIndex: number, updates: Partial<EntityField>) => {
    const entity = (doc.dataModels || []).find((m) => m.id === entityId);
    if (!entity) return;
    const updatedFields = [...entity.fields];
    updatedFields[fIndex] = { ...updatedFields[fIndex], ...updates };
    updateEntity(entityId, { fields: updatedFields });
  };

  const removeField = (entityId: string, fIndex: number) => {
    const entity = (doc.dataModels || []).find((m) => m.id === entityId);
    if (!entity) return;
    const updatedFields = entity.fields.filter((_, i) => i !== fIndex);
    updateEntity(entityId, { fields: updatedFields });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Skema Entitas & Model Data Utama</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {(doc.dataModels || []).length} Entitas
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Definisikan kolom dan tipe data agar AI langsung menghasilkan interface TypeScript dan Drizzle/Prisma schema yang presisi.
          </p>
        </div>

        <button
          onClick={addEntity}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition"
          aria-label="Tambah Model Entitas Baru"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Entitas</span>
        </button>
      </div>

      {/* Entity Cards */}
      <div className="space-y-5">
        {(doc.dataModels || []).length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
            <Database className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-400">Belum ada model data didefinisikan.</p>
            <button
              onClick={addEntity}
              className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              + Buat Entitas Pertama (misal: User, Item, Task)
            </button>
          </div>
        ) : (
          doc.dataModels.map((entity, eIdx) => (
            <div
              key={entity.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm"
            >
              {/* Entity Title & Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <Key className="w-4 h-4 text-emerald-400 shrink-0" />
                  <input
                    type="text"
                    value={entity.entityName}
                    onChange={(e) => updateEntity(entity.id, { entityName: e.target.value })}
                    placeholder="Nama Entitas (misal: Task, Order, Profile)"
                    className="font-bold text-white text-sm bg-transparent border-b border-transparent hover:border-slate-700 focus:border-emerald-500 focus:outline-none transition px-1 py-0.5"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addField(entity.id)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold px-2 py-1 bg-emerald-500/10 rounded-lg transition"
                  >
                    + Tambah Kolom
                  </button>
                  <button
                    onClick={() => removeEntity(entity.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 rounded-lg transition"
                    aria-label={`Hapus entitas ${entity.entityName}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Entity Description */}
              <input
                type="text"
                value={entity.description}
                onChange={(e) => updateEntity(entity.id, { description: e.target.value })}
                placeholder="Deskripsi singkat fungsi entitas data ini..."
                className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-emerald-500"
              />

              {/* Fields Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="pb-2 font-medium">Nama Kolom</th>
                      <th className="pb-2 font-medium">Tipe Data</th>
                      <th className="pb-2 font-medium">Wajib (Required)</th>
                      <th className="pb-2 font-medium">Keterangan</th>
                      <th className="pb-2 font-medium text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {entity.fields.map((field, fIdx) => (
                      <tr key={fIdx} className="group">
                        <td className="py-2 pr-2">
                          <input
                            type="text"
                            value={field.name}
                            onChange={(e) => updateField(entity.id, fIdx, { name: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-slate-950 font-mono text-emerald-300 border border-slate-800 focus:border-emerald-500"
                          />
                        </td>
                        <td className="py-2 pr-2">
                          <input
                            type="text"
                            value={field.type}
                            onChange={(e) => updateField(entity.id, fIdx, { type: e.target.value })}
                            placeholder="string, number, boolean, UUID..."
                            className="w-full px-2 py-1 rounded bg-slate-950 font-mono text-sky-300 border border-slate-800 focus:border-emerald-500"
                          />
                        </td>
                        <td className="py-2 pr-2">
                          <label className="inline-flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={field.isRequired}
                              onChange={(e) => updateField(entity.id, fIdx, { isRequired: e.target.checked })}
                              className="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0"
                            />
                            <span className="text-slate-400">{field.isRequired ? 'Ya' : 'Opsional'}</span>
                          </label>
                        </td>
                        <td className="py-2 pr-2">
                          <input
                            type="text"
                            value={field.description}
                            onChange={(e) => updateField(entity.id, fIdx, { description: e.target.value })}
                            placeholder="Catatan..."
                            className="w-full px-2 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800 focus:border-emerald-500"
                          />
                        </td>
                        <td className="py-2 text-right">
                          <button
                            onClick={() => removeField(entity.id, fIdx)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                            aria-label={`Hapus field ${field.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
