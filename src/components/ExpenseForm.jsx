import { useState, useRef } from 'react'

/**
 * Form for adding an expense.
 * - Local state holds what the user is typing
 * - useRef focuses the title field again after a successful submit
 */
function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  /** Ref attached to the title input — .focus() runs after submit */
  const titleInputRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const trimmedTitle = title.trim()
    const parsedAmount = parseFloat(amount)

    if (!trimmedTitle) {
      setError('Please enter a title.')
      titleInputRef.current?.focus()
      return
    }

    if (amount.trim() === '' || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount greater than zero.')
      return
    }

    onAddExpense({
      title: trimmedTitle,
      amount: parsedAmount,
    })

    setTitle('')
    setAmount('')
    /** Focus title for quick entry of the next expense */
    titleInputRef.current?.focus()
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label className="form-label" htmlFor="expense-title">
          Title
        </label>
        <input
          id="expense-title"
          ref={titleInputRef}
          className="form-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Groceries"
          autoComplete="off"
        />
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="expense-amount">
          Amount
        </label>
        <input
          id="expense-amount"
          className="form-input"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
        />
      </div>

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary">
        Add expense
      </button>
    </form>
  )
}

export default ExpenseForm
