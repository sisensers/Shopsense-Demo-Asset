import React from "react";
import { useNavigate } from "react-router-dom";
import MDButton from "./MDButton"; // Adjust the path based on your project structure
import MDBox from "./MDBox"; // Adjust the path based on your project structure

const RerouteButton = () => {
  const navigate = useNavigate();

  const navigateToOrderList = () => {
    navigate("/sisense/order-list");
  };

  return (
    <MDBox width={{ xs: "100%", sm: "40%" }} textAlign="right" mt={{ xs: 2, sm: "auto" }}>
      <MDButton color="light" onClick={navigateToOrderList}>
        read more
      </MDButton>
    </MDBox>
  );
};

export default RerouteButton;
