import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'

/** Key used in localStorage — keeps saved expenses separate from other apps */
const STORAGE_KEY = 'expenses'

/**
 * Reads saved expenses from localStorage (used once on first render).
 * JSON.parse turns the stored string back into a JavaScript array.
 */
function readExpensesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Creates a unique id for each expense (crypto API when available).
 */
function createExpenseId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return String(Date.now())
}

/**
 * Formats a number as currency for display (bonus: readable amounts).
 */
function formatCurrency(value) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function App() {
  /**
   * useState lazy initializer: runs once on mount and loads from localStorage.
   * This restores your list on refresh without flashing an empty list first.
   */
  const [expenses, setExpenses] = useState(readExpensesFromStorage)

  /**
   * useEffect: whenever `expenses` changes, persist to localStorage.
   * JSON.stringify converts the array to a string browsers can store.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  /** Add a new expense object to the list (id is assigned here) */
  function handleAddExpense({ title, amount }) {
    setExpenses((prev) => [
      ...prev,
      { id: createExpenseId(), title, amount },
    ])
  }

  /** Remove one expense by id using filter (keeps every item except that id) */
  function handleDeleteExpense(id) {
    setExpenses((prev) => prev.filter((item) => item.id !== id))
  }

  /** Total of all amounts using reduce */
  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Expense Tracker</h1>
        <p className="app-subtitle">Track spending — everything stays in your browser.</p>
      </header>

      <main className="app-main">
        <section className="card card-form">
          <h2 className="card-heading">Add expense</h2>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </section>

        <section className="card card-list">
          <div className="card-list-head">
            <h2 className="card-heading">Your expenses</h2>
            <div className="total-pill" aria-live="polite">
              <span className="total-label">Total</span>
              <span className="total-value">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <ExpenseList
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
            formatCurrency={formatCurrency}
          />
        </section>
      </main>
    </div>
  )
}

export default App
