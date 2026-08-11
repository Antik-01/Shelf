import api from './axios'

const ItemService = {
  getAll:    ()           => api.get('/items'),
  getById:   (id)         => api.get(`/items/${id}`),
  create:    (data)       => api.post('/items', data),
  update:    (id, data)   => api.put(`/items/${id}`, data),
  delete:    (id)         => api.delete(`/items/${id}`),
  search:    (query)      => api.get(`/items/search?q=${encodeURIComponent(query)}`),
}

export default ItemService
