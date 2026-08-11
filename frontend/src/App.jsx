import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Rooms from './pages/Rooms'
import Shelves from './pages/Shelves'
import Boxes from './pages/Boxes'
import Items from './pages/Items'
import Search from './pages/Search'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="shelves" element={<Shelves />} />
        <Route path="boxes" element={<Boxes />} />
        <Route path="items" element={<Items />} />
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  )
}

export default App
