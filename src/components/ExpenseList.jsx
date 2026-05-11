import ExpenseItem from './ExpenseItem.jsx'

/**
 * Renders the list of expenses with map().
 * Shows an empty state when there is nothing to display.
 */
function ExpenseList({ expenses, onDeleteExpense, formatCurrency }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">No expenses yet</p>
        <p className="empty-state-text">Add your first expense above to see it listed here.</p>
      </div>
    )
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDeleteExpense={onDeleteExpense}
          formatCurrency={formatCurrency}
        />
      ))}
    </ul>
  )
}

export default ExpenseList
