import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import BankAccountList from "./BankAccountList";

jest.mock("axios");

const mockAccounts = [
  { id: "1", name: "Account 1", balance: 100 },
  { id: "2", name: "Account 2", balance: 200 },
];

test("displays loading spinner while fetching accounts", () => {
  render(<BankAccountList />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("displays accounts after fetching", async () => {
  axios.get.mockResolvedValueOnce({ data: mockAccounts });

  render(<BankAccountList />);

  await waitFor(() => {
    expect(screen.getByText("Account 1")).toBeInTheDocument();
    expect(screen.getByText("Account 2")).toBeInTheDocument();
  });

  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});

test("displays error message on fetch failure", async () => {
  axios.get.mockRejectedValueOnce(new Error("Error fetching accounts"));

  render(<BankAccountList />);

  await waitFor(() => {
    expect(screen.getByText("Error fetching accounts")).toBeInTheDocument();
  });

  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});
