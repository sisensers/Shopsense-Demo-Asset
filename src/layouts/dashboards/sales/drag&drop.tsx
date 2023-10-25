import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Board from "@asseinfo/react-kanban"; // Import the Board component
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SalesByCountryTable from "./components/SalesByCountry";

// Define initial board data (you can customize this based on your needs)
const initialBoard = {
  columns: [
    {
      id: "indicators",
      title: "Indicators",
      cards: [
        { id: "ordersFilled", title: "Orders Filled" },
        { id: "revenue", title: "Revenue" },
        { id: "totalCost", title: "Total Cost" },
      ],
    },
    {
      id: "charts",
      title: "Charts",
      cards: [
        { id: "salesByAge", title: "Sales By Age Demographic" },
        { id: "pieChart", title: "Pie Chart" },
        { id: "salesByCountry", title: "Sales By Country" },
        { id: "salesOverTime", title: "Sales Over Time" },
      ],
    },
    {
      id: "table",
      title: "Table",
      cards: [{ id: "salesTable", title: "Sales By Country Table" }],
    },
  ],
};

export default function Dashboard() {
  const [isDashboardVisible, setDashboardVisible] = useState(true);

  const toggleDashboardVisibility = () => {
    setDashboardVisible((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleDashboardVisibility}>
        {isDashboardVisible ? "Hide Dashboard" : "Show Dashboard"}
      </button>
      {isDashboardVisible && (
        <DashboardLayout>
          <DashboardNavbar />
          <Board initialBoard={initialBoard} allowAddCard allowAddColumn>
            {({ addCard, addColumn }: { addCard: Function; addColumn: Function }) => (
              <>
                {initialBoard.columns.map((column) => (
                  <div key={column.id}>
                    <Typography variant="h5">{column.title}</Typography>
                    {column.cards.map((card) => (
                      <Card key={card.id}>
                        <CardContent>
                          <Typography variant="h6">{card.title}</Typography>
                          {/* Add your chart components here */}
                        </CardContent>
                      </Card>
                    ))}
                    <button
                      onClick={() => addCard(column.id, { id: "newCard", title: "New Card" })}
                    >
                      Add New Card
                    </button>
                  </div>
                ))}
                <button onClick={() => addColumn({ id: "newColumn", title: "New Column" })}>
                  Add New Column
                </button>
              </>
            )}
          </Board>
        </DashboardLayout>
      )}
    </div>
  );
}
