import { useCustomerTransactionSummary } from "../utils/customerTransactionSummary";
import { CustomerInfoModal } from "../customerInfoModal/customerInfoModal";
import { CustomerInfoPropTypes } from "../utils/proptypes";
import "../utils/custome-styles.scss";

export const CustomerCard = ({ customer }) => {
  const { totalAmount, totalPoints } =
    useCustomerTransactionSummary(customer.transactions);

  const modalId = `modal-${customer.customerId}`;

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
      <div
        className="card p-2 mt-1 position-relative cursor-pointer customer-card"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        <div className="fw-bold">{customer.name}</div>

        <p className="fw-light">
          Total Amount:
          <span className="fw-medium">{totalAmount}</span>
        </p>

        <div
          className="rewards-circle d-flex align-items-center justify-content-center position-absolute top-50 end-0 translate-middle-y rounded-circle border me-2 fw-medium"
        >
          {totalPoints}
        </div>
      </div>

      <CustomerInfoModal customer={customer} />
    </div>
  );
};


CustomerCard.propTypes = CustomerInfoPropTypes;