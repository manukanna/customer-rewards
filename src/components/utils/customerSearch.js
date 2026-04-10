import { useState, useMemo } from "react";

export const useCustomerSearch = (data = []) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
  };
};
