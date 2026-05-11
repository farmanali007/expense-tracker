/**
 * One row: title, formatted amount, delete button.
 * Delete uses filter() in the parent; here we only ask for confirmation (bonus).
 */
function ExpenseItem({ expense, onDeleteExpense, formatCurrency }) {
  function handleDelete() {
    const ok = window.confirm(`Remove "${expense.title}" from your list?`)
    if (ok) {
      onDeleteExpense(expense.id)
    }
  }

  return (
    <li className="expense-item">
      <div className="expense-item-main">
        <span className="expense-item-title">{expense.title}</span>
        <span className="expense-item-amount">{formatCurrency(expense.amount)}</span>
      </div>
      <button type="button" className="btn btn-danger btn-small" onClick={handleDelete}>
        Delete
      </button>
    </li>
  )
}

export default ExpenseItem
