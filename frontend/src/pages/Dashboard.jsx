import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardService from '../api/dashboardService'

const statCards = [
  {
    key: 'totalRooms',
    label: 'Total Rooms',
    href: '/rooms',
    color: 'from-indigo-500 to-indigo-600',
    icon: (
      <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    key: 'totalShelves',
    label: 'Total Shelves',
    href: '/shelves',
    color: 'from-violet-500 to-violet-600',
    icon: (
      <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-1.243 1.007-2.25 2.25-2.25" />
      </svg>
    ),
  },
  {
    key: 'totalBoxes',
    label: 'Total Boxes',
    href: '/boxes',
    color: 'from-amber-500 to-amber-600',
    icon: (
      <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    key: 'totalItems',
    label: 'Total Items',
    href: '/items',
    color: 'from-emerald-500 to-emerald-600',
    icon: (
      <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
]

export default function Dashboard() {
  const [stats, setStats] = useState({ totalRooms: 0, totalShelves: 0, totalBoxes: 0, totalItems: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    DashboardService.getStats()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Overview of your storage inventory</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.key}
            to={card.href}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5"
            style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
            id={`stat-${card.key}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color}`} />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {loading ? '—' : stats[card.key]}
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-2.5">{card.icon}</div>
            </div>
            <div className="relative mt-4 flex items-center text-xs font-medium text-white/70 group-hover:text-white/90">
              <span>View all →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-slate-700">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/rooms"
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
            id="quick-add-room"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-slate-700">Add a Room</p>
              <p className="text-xs text-slate-400">Create a new storage room</p>
            </div>
          </Link>

          <Link
            to="/items"
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
            id="quick-add-item"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-slate-700">Add an Item</p>
              <p className="text-xs text-slate-400">Store a new item</p>
            </div>
          </Link>

          <Link
            to="/search"
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
            id="quick-search"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-slate-700">Search Items</p>
              <p className="text-xs text-slate-400">Find where things are stored</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
