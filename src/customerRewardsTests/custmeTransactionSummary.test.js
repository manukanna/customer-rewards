import { renderHook } from "@testing-library/react";
import { useCustomerTransactionSummary } from "../components/utils/customerTransactionSummary";

const buildTransactions = (list) => ({
  January: list,
  February: [],
  March: [],
});

describe("useCustomerTransactionSummary", () => {
  test("calculates total amount and points correctly", () => {
    const transactions = buildTransactions([
      { amount: 120 },
      { amount: 80 },
      { amount: 40 },
    ]);

    const { result } = renderHook(() =>
      useCustomerTransactionSummary(transactions)
    );

    expect(result.current.totalAmount).toBe(240);
    expect(result.current.totalPoints).toBe(120);
  });

  test("handles edge values (50 and 100)", () => {
    const transactions = buildTransactions([
      { amount: 50 },
      { amount: 100 },
    ]);

    const { result } = renderHook(() =>
      useCustomerTransactionSummary(transactions)
    );

    expect(result.current.totalAmount).toBe(150);
    expect(result.current.totalPoints).toBe(50);
  });

  test("returns 0 for empty transactions", () => {
    const transactions = {
      January: [],
      February: [],
      March: [],
    };

    const { result } = renderHook(() =>
      useCustomerTransactionSummary(transactions)
    );

    expect(result.current.totalAmount).toBe(0);
    expect(result.current.totalPoints).toBe(0);
  });

  test("handles undefined transactions", () => {
    const { result } = renderHook(() =>
      useCustomerTransactionSummary(undefined)
    );

    expect(result.current.totalAmount).toBe(0);
    expect(result.current.totalPoints).toBe(0);
  });

  test("handles missing and null amounts", () => {
    const transactions = buildTransactions([
      { amount: 100 },
      {},
      { amount: null },
    ]);

    const { result } = renderHook(() =>
      useCustomerTransactionSummary(transactions)
    );

    expect(result.current.totalAmount).toBe(100);
    expect(result.current.totalPoints).toBe(50);
  });

  test("handles negative transaction amounts", () => {
    const transactions = buildTransactions([
      { amount: 120 },
      { amount: -50 },
      { amount: 80 },
    ]);

    const { result } = renderHook(() =>
      useCustomerTransactionSummary(transactions)
    );

    expect(result.current.totalAmount).toBe(150);
    expect(result.current.totalPoints).toBe(120);
  });

  test("all negative transactions", () => {
    const transactions = buildTransactions([
      { amount: -100 },
      { amount: -20 },
    ]);

    const { result } = renderHook(() =>
      useCustomerTransactionSummary(transactions)
    );

    expect(result.current.totalAmount).toBe(-120);
    expect(result.current.totalPoints).toBe(0);
  });

  test("negative values should not generate points", () => {
    const transactions = buildTransactions([
      { amount: -200 },
      { amount: -10 },
    ]);

    const { result } = renderHook(() =>
      useCustomerTransactionSummary(transactions)
    );

    expect(result.current.totalPoints).toBe(0);
  });

  test("mix of negative, zero, and positive values", () => {
    const transactions = buildTransactions([
      { amount: -50 },
      { amount: 0 },
      { amount: 101 },
    ]);

    const { result } = renderHook(() =>
      useCustomerTransactionSummary(transactions)
    );

    expect(result.current.totalAmount).toBe(51);
    expect(result.current.totalPoints).toBe(52);
  });

  test("handles fractional amounts correctly", () => {
    const transactions = buildTransactions([
      { amount: 120.5 },
      { amount: 75.25 },
      { amount: 49.99 },
    ]);

    const { result } = renderHook(() =>
      useCustomerTransactionSummary(transactions)
    );

    expect(result.current.totalAmount).toBeCloseTo(245.74);
    expect(result.current.totalPoints).toBeCloseTo(116.25);
  });

  test("fractional values with negatives", () => {
    const transactions = buildTransactions([
      { amount: 100.75 },
      { amount: -20.5 },
      { amount: 60.5 },
    ]);

    const { result } = renderHook(() =>
      useCustomerTransactionSummary(transactions)
    );

    expect(result.current.totalAmount).toBeCloseTo(140.75);
    expect(result.current.totalPoints).toBeCloseTo(62);
  });
});