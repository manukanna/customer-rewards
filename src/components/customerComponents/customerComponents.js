import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerCards } from "../customersCards/customerCardsList";

export const CustomerRewardsComponents = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("customerRewardsUserId");

  useEffect(() => {
    if (!userId) {
      navigate("/"); 
    }
  }, [userId, navigate]);
  if (!userId) return null;
  return <CustomerCards />;
};