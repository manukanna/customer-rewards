import React, { useState, useEffect } from "react";
import { CustomerCard } from "./customerCard";
import { CustomerRewardsHeader } from "../header/header";
import { CustomerSearch } from "../customersSearch/customerSearch";
import { useCustomersFetch } from "../customerAppService/customersFetch";
import { useCustomerSearch } from "../utils/customerSearch";
import "../utils/custome-styles.scss";

const customersPerPage = 16;
const currentPageValue = 1;

export const CustomerCards = () => {
  const [currentPage, setCurrentPage] = useState(currentPageValue);

  const { customers, loading, error } = useCustomersFetch();

  const { searchTerm, setSearchTerm, filteredData } =
    useCustomerSearch(customers);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

  const currentCustomers = filteredData.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer,
  );

  const totalPages = Math.ceil(filteredData.length / customersPerPage);

  useEffect(() => {
    setCurrentPage(currentPageValue);
  }, [searchTerm]);

  if (error) {
    return <p className="text-center text-danger mt-4">{error}</p>;
  }
  return (
    <>
      <CustomerRewardsHeader />

      <div className="container-fluid">
        <CustomerSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {!loading ? (
          <>
            <div className="row g-4">
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer) => (
                  <CustomerCard key={customer.customerId} customer={customer} />
                ))
              ) : (
                <p className="text-center mt-4">No customers found</p>
              )}
            </div>

            <div className="d-flex justify-content-end align-items-center gap-3 mt-4">
              <button
                className="btn btn-primary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>

              <span>
                {currentPage} of {totalPages}
              </span>

              <button
                className="btn btn-primary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="customer-cards-container mt-4 d-flex justify-content-center align-items-center">
            Loading customers...
          </p>
        )}
      </div>
    </>
  );
};
