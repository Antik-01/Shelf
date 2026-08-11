import api from './axios'

const DashboardService = {
  getStats: () => api.get('/dashboard/stats'),
}

export default DashboardService
