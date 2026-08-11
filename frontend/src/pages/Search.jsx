import { useState } from 'react'
import ItemService from '../api/itemService'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)
    ItemService.search(query.trim())
      .then((res) => setResults(res.data))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Search Items</h1>
        <p className="mt-1 text-sm text-slate-500">Find items by name or category and see their storage location</p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by item name or category..."
            className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-12 pr-28 text-sm text-slate-800 shadow-sm placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            id="search-input"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            id="search-btn"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {loading && (
        <div className="py-12 text-center text-slate-400">Searching...</div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <svg className="mx-auto mb-4 h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p className="text-lg font-medium text-slate-600">No items found</p>
          <p className="mt-1 text-sm text-slate-400">Try a different search term</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Found <span className="font-semibold text-slate-700">{results.length}</span> result{results.length !== 1 ? 's' : ''}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{item.name}</h3>
                    {item.description && (
                      <p className="mt-0.5 text-xs text-slate-400 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                    Qty: {item.quantity}
                  </span>
                </div>

                {item.category && (
                  <span className="mb-3 inline-flex items-center rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                    {item.category}
                  </span>
                )}

                {/* Location path */}
                <div className="mt-3 rounded-xl bg-slate-50 p-3">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Storage Location</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="rounded-lg bg-indigo-100 px-2 py-0.5 font-medium text-indigo-700">{item.roomName}</span>
                    <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <span className="rounded-lg bg-violet-100 px-2 py-0.5 font-medium text-violet-700">{item.shelfName}</span>
                    <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <span className="rounded-lg bg-amber-100 px-2 py-0.5 font-medium text-amber-700">{item.boxName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
