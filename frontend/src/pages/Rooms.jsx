import { useEffect, useState } from 'react'
import RoomService from '../api/roomService'
import Modal from '../components/Modal'
import Toast from '../components/Toast'

const emptyForm = { name: '', description: '' }

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [toast, setToast] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const fetchRooms = () => {
    setLoading(true)
    RoomService.getAll()
      .then((res) => setRooms(res.data))
      .catch(() => setToast({ message: 'Failed to load rooms', type: 'error' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchRooms() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (room) => {
    setEditing(room.id)
    setForm({ name: room.name, description: room.description || '' })
    setModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const action = editing
      ? RoomService.update(editing, form)
      : RoomService.create(form)

    action
      .then(() => {
        setToast({ message: editing ? 'Room updated' : 'Room created', type: 'success' })
        setModalOpen(false)
        fetchRooms()
      })
      .catch(() => setToast({ message: 'Something went wrong', type: 'error' }))
  }

  const handleDelete = (id) => {
    RoomService.delete(id)
      .then(() => {
        setToast({ message: 'Room deleted', type: 'success' })
        setDeleteId(null)
        fetchRooms()
      })
      .catch(() => setToast({ message: 'Failed to delete room', type: 'error' }))
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Rooms</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your storage rooms</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          id="add-room-btn"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Room
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-6 py-3.5 font-semibold text-slate-600">#</th>
              <th className="px-6 py-3.5 font-semibold text-slate-600">Name</th>
              <th className="hidden px-6 py-3.5 font-semibold text-slate-600 md:table-cell">Description</th>
              <th className="px-6 py-3.5 font-semibold text-slate-600">Shelves</th>
              <th className="px-6 py-3.5 text-right font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>
            ) : rooms.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">No rooms yet. Add one to get started.</td></tr>
            ) : (
              rooms.map((room, idx) => (
                <tr key={room.id} className="transition-colors hover:bg-slate-50/60">
                  <td className="px-6 py-4 text-slate-400">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{room.name}</td>
                  <td className="hidden px-6 py-4 text-slate-500 md:table-cell">{room.description || '—'}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                      {room.shelfCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openEdit(room)}
                      className="mr-2 rounded-lg px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
                      id={`edit-room-${room.id}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(room.id)}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      id={`delete-room-${room.id}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Room' : 'Add Room'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Room Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400"
              placeholder="e.g. Bedroom"
              id="room-name-input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400"
              rows={3}
              placeholder="Optional description"
              id="room-desc-input"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700" id="room-submit-btn">
              {editing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title="Delete Room">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete this room? All shelves, boxes, and items inside will be removed.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button
            onClick={() => handleDelete(deleteId)}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
            id="confirm-delete-btn"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
