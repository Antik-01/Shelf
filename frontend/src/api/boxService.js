import api from './axios'

const BoxService = {
  getAll:       ()           => api.get('/boxes'),
  getByShelfId: (shelfId)    => api.get(`/boxes?shelfId=${shelfId}`),
  getById:      (id)         => api.get(`/boxes/${id}`),
  create:       (data)       => api.post('/boxes', data),
  update:       (id, data)   => api.put(`/boxes/${id}`, data),
  delete:       (id)         => api.delete(`/boxes/${id}`),
}

export default BoxService
