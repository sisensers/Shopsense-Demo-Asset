import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Transaction from "layouts/pages/account/billing/components/Transaction";

function Transactions(): JSX.Element {
  const handleWithdraw = () => {
    // Add logic here to handle the withdrawal
    console.log("Withdraw button clicked");
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Your Withdrawals
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            {/* Add date information here */}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            Newest
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="error"
            icon="expand_more"
            name="Withdrawal"
            description="27 January 2024, at 12:30 PM"
            value="- $ 2,500"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Deposit"
            description="27 January 2024, at 04:30 AM"
            value="+ $ 2,000"
          />
        </MDBox>
        <MDBox mt={1} mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            Past
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="error"
            icon="expand_less"
            name="Withdrawal"
            description="30 January 2024, at 13:45 PM"
            value="- $ 750"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Deposit"
            description="3 January 2024, at 12:30 PM"
            value="+ $ 1,000"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Deposit"
            description="6 January 2024, at 08:30 AM"
            value="+ $ 2,500"
          />
          <Transaction
            color="dark"
            icon="priority_high"
            name="Withdrawal"
            description="20 January 2024, at 05:00 AM"
            value="Pending"
          />
        </MDBox>
      </MDBox>
      <MDBox pb={2} px={2}>
        <MDBox mt={2}>
          <MDBox display="flex" alignItems="center">
            <TextField
              label="Amount"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleWithdraw}
              style={{ marginLeft: 2, color: "white" }}
            >
              Withdraw
            </Button>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
