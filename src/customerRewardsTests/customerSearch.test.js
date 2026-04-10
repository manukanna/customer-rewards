import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomerCards } from "../components/customersCards/customerCardsList";

test("filters customers by name", async () => {
  render(<CustomerCards />);

  const input = screen.getByPlaceholderText("Search customers...");

  await userEvent.type(input, "manohar");
  const result = await screen.findByText("Manohar");
  expect(result).toBeInTheDocument();
});