import { useEffect, useState } from "react";
import sampleData from "../../data/sampleCustomerData.json";

// fake API call. It waits for a short time and then returns customer data. If shouldFail is true, it returns an error instead of data.
export const fetchCustomers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const shouldFail = false;

      if (shouldFail) {
        resolve({
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
        });
      } else {
        resolve({
          ok: true,
          status: 200,
          data: sampleData.customersValues,
        });
      }
    }, 1000);
  });
};

// custom hook that gets customer data. It also handles loading and error states, and returns the customers along with these values.
export const useCustomersFetch = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchCustomers();

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: ${response.statusText}`
          );
        }

        setCustomers(response.data);
      } catch (err) {
        setError(err.message || "Failed to load customers");
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  return { customers, loading, error };
};