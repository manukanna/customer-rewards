import PropTypes from "prop-types";

export const CustomerInfoPropTypes = {
  customer: PropTypes.shape({
    customerId: PropTypes.string,
    name: PropTypes.string,
    transactions: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          date: PropTypes.string,
          amount: PropTypes.number,
        })
      )
    ),
  }),
};


export const CustomerSearchPropTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
};


export const CustomerTransactionTablepropTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
      amount: PropTypes.number,
    })
  ).isRequired,
};