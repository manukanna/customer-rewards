import { CalculatePoints } from "../utils/customerTransactionSummary"
import { CustomerTransactionTablepropTypes } from "../utils/proptypes";


export const CustomerTransactionTable = ({ transactions }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length && transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>{CalculatePoints(transaction.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


CustomerTransactionTable.propTypes = CustomerTransactionTablepropTypes;