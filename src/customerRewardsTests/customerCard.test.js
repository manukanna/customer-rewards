import { render, screen } from "@testing-library/react";
import { CustomerCard } from "../components/customersCards/customerCard";

const mockCustomer = {
  customerId: "C001",
  name: "Manohar",
  email: "manohar.c001@example.com",
  transactions: {
    January: [
      { id: "T1", date: "2025-01-10", amount: 120 },
      { id: "T2", date: "2025-01-11", amount: 80 },
      { id: "T3", date: "2025-01-12", amount: 200 },
    ],
    February: [],
    March: [],
  },
};

test("renders customer name", () => {
  render(<CustomerCard customer={mockCustomer} />);
  expect(screen.getByText("Manohar")).toBeInTheDocument();
});

test("renders reward points label", () => {
  render(<CustomerCard customer={mockCustomer} />);
  
  expect(screen.getByText(/Reward Points/i)).toBeInTheDocument();
});