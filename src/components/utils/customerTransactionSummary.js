import { useMemo } from "react";

// calculating reward points based on the amount spent in a transaction
export const CalculatePoints = (amount = 0) => {
  let points = 0;

  if (amount > 100) {
    points += (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    points += amount - 50;
  }

  return points;
};

// calculating total points and total amount spent for a customer based on their transactions
export const useCustomerTransactionSummary = (transactions = {}) => {
  const result = useMemo(() => {
    let totalAmount = 0;
    let totalPoints = 0;

    Object.values(transactions || {}).forEach((value) => {
      if (!Array.isArray(value)) return;

      value.forEach((transaction) => {
        const amount = transaction?.amount || 0;

        totalAmount += amount;
        totalPoints += CalculatePoints(amount);
      });
    });

    return { totalAmount, totalPoints };
  }, [transactions]);

  return result;
};