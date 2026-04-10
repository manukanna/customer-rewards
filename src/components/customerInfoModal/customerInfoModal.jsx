import { useState } from "react";
import { useCustomerTransactionSummary } from "../utils/customerTransactionSummary";
import { CustomerInfoPropTypes } from "../utils/proptypes";
import { CustomerTransactionTable } from "./customerTransactiontable";


export const CustomerInfoModal = ({ customer  }) => {
  const [showTransactions, setShowTransactions] = useState(true);
  const [clickedMonth, setShowTransactionDetails] = useState({});

  const { totalPoints, totalAmount } = useCustomerTransactionSummary(
    customer.transactions,
  );
  const modalId = `modal-${customer.customerId}`;

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby={`${modalId}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}-label`}>
              {customer.name} Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => setShowTransactions(!showTransactions)}
            ></button>
          </div>

          <div className="modal-body">
            {showTransactions ? (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Transaction Month</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(customer.transactions).map(
                      ([month, transaction]) => (
                        <tr key={month}>
                          <td>{month}</td>
                          <td><button
                          className="btn btn-link"
                          onClick={() => {
                            setShowTransactionDetails(transaction)
                            setShowTransactions(!showTransactions)
                          }}
                        >
                          View Transactions
                        </button> </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
                <div>
                  <div>
                  Total Transaction - <strong>{totalAmount}</strong>
                </div>
                <div>
                  Total Reward Points Earned - <strong>{totalPoints}</strong>
                </div>
                </div>
              </>
            ) : (
              <div className="position-relative">
                <CustomerTransactionTable transactions={clickedMonth} />
                <button
                  onClick={() => setShowTransactions(!showTransactions)}
                  className="btn btn top-0 start-0 p-0 back-button"
                > ← Back</button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              onClick={() => setShowTransactions(!showTransactions)}
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
CustomerInfoModal.propTypes = CustomerInfoPropTypes;