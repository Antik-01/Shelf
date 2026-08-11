import { useEffect, useState } from 'react'
import ShelfService from '../api/shelfService'
import RoomService from '../api/roomService'
import Modal from '../components/Modal'
import Toast from '../components/Toast'

const emptyForm = { name: '', description: '', roomId: '' }

export default function Shelves() {
  const [shelves, setShelves] = useState([])
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [toast, setToast] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [filterRoomId, setFilterRoomId] = useState('')

  const fetchShelves = () => {
    setLoading(true)
    const req = filterRoomId
      ? ShelfService.getByRoomId(filterRoomId)
      : ShelfService.getAll()
    req
      .then((res) => setShelves(res.data))
      .catch(() => setToast({ message: 'Failed to load shelves', type: 'error' }))
      .finally(() => setLoading(false))
  }

  const fetchRooms = () => {
    RoomService.getAll().then((res) => setRooms(res.data)).catch(() => {})
  }

  useEffect(() => { fetchRooms() }, [])
  useEffect(() => { fetchShelves() }, [filterRoomId])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (shelf) => {
    setEditing(shelf.id)
    setForm({ name: shelf.name, description: shelf.description || '', roomId: shelf.roomId })
    setModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...form, roomId: Number(form.roomId) }
    const action = editing
      ? ShelfService.update(editing, data)
      : ShelfService.create(data)

    action
      .then(() => {
        setToast({ message: editing ? 'Shelf updated' : 'Shelf created', type: 'success' })
        setModalOpen(false)
        fetchShelves()
      })
      .catch(() => setToast({ message: 'Something went wrong', type: 'error' }))
  }

  const handleDelete = (id) => {
    ShelfService.delete(id)
      .then(() => {
        setToast({ message: 'Shelf deleted', type: 'success' })
        setDeleteId(null)
        fetchShelves()
      })
      .catch(() => setToast({ message: 'Failed to delete shelf', type: 'error' }))
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Shelves</h1>
          <p className="mt-1 text-sm text-slate-500">Manage shelves within rooms</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          id="add-shelf-btn"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Shelf
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={filterRoomId}
          onChange={(e) => setFilterRoomId(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-700"
          id="filter-room"
        >
          <option value="">All Rooms</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-6 py-3.5 font-semibold text-slate-600">#</th>
              <th className="px-6 py-3.5 font-semibold text-slate-600">Name</th>
              <th className="hidden px-6 py-3.5 font-semibold text-slate-600 md:table-cell">Description</th>
              <th className="px-6 py-3.5 font-semibold text-slate-600">Room</th>
              <th className="px-6 py-3.5 font-semibold text-slate-600">Boxes</th>
              <th className="px-6 py-3.5 text-right font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>
            ) : shelves.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No shelves yet.</td></tr>
            ) : (
              shelves.map((shelf, idx) => (
                <tr key={shelf.id} className="transition-colors hover:bg-slate-50/60">
                  <td className="px-6 py-4 text-slate-400">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{shelf.name}</td>
                  <td className="hidden px-6 py-4 text-slate-500 md:table-cell">{shelf.description || '—'}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {shelf.roomName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                      {shelf.boxCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEdit(shelf)} className="mr-2 rounded-lg px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50">Edit</button>
                    <button onClick={() => setDeleteId(shelf.id)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Shelf' : 'Add Shelf'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Shelf Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400"
              placeholder="e.g. Top Shelf"
              id="shelf-name-input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Room *</label>
            <select
              required
              value={form.roomId}
              onChange={(e) => setForm({ ...form, roomId: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800"
              id="shelf-room-select"
            >
              <option value="">Select a room</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400"
              rows={3}
              placeholder="Optional description"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
            <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">{editing ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title="Delete Shelf">
        <p className="text-sm text-slate-600">Are you sure? All boxes and items inside this shelf will be removed.</p>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
          <button onClick={() => handleDelete(deleteId)} className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700">Delete</button>
        </div>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
