import { useEffect, useState } from 'react'
import ItemService from '../api/itemService'
import RoomService from '../api/roomService'
import ShelfService from '../api/shelfService'
import BoxService from '../api/boxService'
import Modal from '../components/Modal'
import Toast from '../components/Toast'

const emptyForm = { name: '', description: '', category: '', quantity: 1, boxId: '' }

export default function Items() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [toast, setToast] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  // Cascading selects state
  const [rooms, setRooms] = useState([])
  const [shelves, setShelves] = useState([])
  const [boxes, setBoxes] = useState([])
  const [formRoomId, setFormRoomId] = useState('')
  const [formShelfId, setFormShelfId] = useState('')

  const fetchItems = () => {
    setLoading(true)
    ItemService.getAll()
      .then((res) => setItems(res.data))
      .catch(() => setToast({ message: 'Failed to load items', type: 'error' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchItems()
    RoomService.getAll().then((res) => setRooms(res.data)).catch(() => {})
  }, [])

  // Cascade: room → shelves
  useEffect(() => {
    if (formRoomId) {
      ShelfService.getByRoomId(formRoomId).then((res) => setShelves(res.data)).catch(() => {})
    } else {
      setShelves([])
    }
    setFormShelfId('')
    setBoxes([])
    setForm((f) => ({ ...f, boxId: '' }))
  }, [formRoomId])

  // Cascade: shelf → boxes
  useEffect(() => {
    if (formShelfId) {
      BoxService.getByShelfId(formShelfId).then((res) => setBoxes(res.data)).catch(() => {})
    } else {
      setBoxes([])
    }
    setForm((f) => ({ ...f, boxId: '' }))
  }, [formShelfId])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormRoomId('')
    setFormShelfId('')
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditing(item.id)
    setForm({
      name: item.name,
      description: item.description || '',
      category: item.category || '',
      quantity: item.quantity,
      boxId: item.boxId,
    })
    setFormRoomId(item.roomId)
    // Need to manually load shelves/boxes for the pre-selected room/shelf
    ShelfService.getByRoomId(item.roomId).then((res) => setShelves(res.data)).catch(() => {})
    BoxService.getByShelfId(item.shelfId).then((res) => setBoxes(res.data)).catch(() => {})
    setFormShelfId(item.shelfId)
    setModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: form.name,
      description: form.description,
      category: form.category,
      quantity: Number(form.quantity),
      boxId: Number(form.boxId),
    }
    const action = editing
      ? ItemService.update(editing, data)
      : ItemService.create(data)

    action
      .then(() => {
        setToast({ message: editing ? 'Item updated' : 'Item created', type: 'success' })
        setModalOpen(false)
        fetchItems()
      })
      .catch(() => setToast({ message: 'Something went wrong', type: 'error' }))
  }

  const handleDelete = (id) => {
    ItemService.delete(id)
      .then(() => {
        setToast({ message: 'Item deleted', type: 'success' })
        setDeleteId(null)
        fetchItems()
      })
      .catch(() => setToast({ message: 'Failed to delete item', type: 'error' }))
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Items</h1>
          <p className="mt-1 text-sm text-slate-500">All items in your storage</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          id="add-item-btn"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Item
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-6 py-3.5 font-semibold text-slate-600">#</th>
              <th className="px-6 py-3.5 font-semibold text-slate-600">Name</th>
              <th className="hidden px-6 py-3.5 font-semibold text-slate-600 md:table-cell">Category</th>
              <th className="px-6 py-3.5 font-semibold text-slate-600">Qty</th>
              <th className="hidden px-6 py-3.5 font-semibold text-slate-600 lg:table-cell">Location</th>
              <th className="px-6 py-3.5 text-right font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No items yet. Add one to get started.</td></tr>
            ) : (
              items.map((item, idx) => (
                <tr key={item.id} className="transition-colors hover:bg-slate-50/60">
                  <td className="px-6 py-4 text-slate-400">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{item.name}</p>
                    {item.description && <p className="mt-0.5 text-xs text-slate-400 truncate max-w-xs">{item.description}</p>}
                  </td>
                  <td className="hidden px-6 py-4 md:table-cell">
                    {item.category ? (
                      <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">{item.category}</span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{item.quantity}</td>
                  <td className="hidden px-6 py-4 lg:table-cell">
                    <span className="text-xs text-slate-500">{item.locationPath}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEdit(item)} className="mr-2 rounded-lg px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50">Edit</button>
                    <button onClick={() => setDeleteId(item.id)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Item' : 'Add Item'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Item Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400"
                placeholder="e.g. Passport"
                id="item-name-input"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400"
                placeholder="e.g. Documents"
                id="item-category-input"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Quantity *</label>
              <input
                type="number"
                required
                min="1"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800"
                id="item-quantity-input"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400"
              rows={2}
              placeholder="Optional description"
            />
          </div>

          <hr className="border-slate-200" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Storage Location</p>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Room *</label>
            <select
              required
              value={formRoomId}
              onChange={(e) => setFormRoomId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800"
              id="item-room-select"
            >
              <option value="">Select a room</option>
              {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Shelf *</label>
            <select
              required
              value={formShelfId}
              onChange={(e) => setFormShelfId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800"
              id="item-shelf-select"
              disabled={!formRoomId}
            >
              <option value="">{formRoomId ? 'Select a shelf' : 'Select a room first'}</option>
              {shelves.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Box *</label>
            <select
              required
              value={form.boxId}
              onChange={(e) => setForm({ ...form, boxId: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800"
              id="item-box-select"
              disabled={!formShelfId}
            >
              <option value="">{formShelfId ? 'Select a box' : 'Select a shelf first'}</option>
              {boxes.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
            <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700" id="item-submit-btn">{editing ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title="Delete Item">
        <p className="text-sm text-slate-600">Are you sure you want to delete this item?</p>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
          <button onClick={() => handleDelete(deleteId)} className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700">Delete</button>
        </div>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
