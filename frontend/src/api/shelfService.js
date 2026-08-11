import api from './axios'

const ShelfService = {
  getAll:      ()           => api.get('/shelves'),
  getByRoomId: (roomId)     => api.get(`/shelves?roomId=${roomId}`),
  getById:     (id)         => api.get(`/shelves/${id}`),
  create:      (data)       => api.post('/shelves', data),
  update:      (id, data)   => api.put(`/shelves/${id}`, data),
  delete:      (id)         => api.delete(`/shelves/${id}`),
}

export default ShelfService
