import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomerCard } from "../components/customersCards/customerCard";

test("modal content exists after click", async () => {
  const mockCustomer = {
    customerId: "C001",
    name: "Manohar",
    email: "manohar.c001@example.com",
    transactions: [],
  };

  render(<CustomerCard key={mockCustomer.customerId} customer={mockCustomer} />);

  const card = screen.getByText("Manohar");
  await userEvent.click(card);

  expect(screen.getByText("Manohar Details")).toBeInTheDocument();
});