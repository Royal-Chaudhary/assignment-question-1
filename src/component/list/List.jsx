import React, { useState, useEffect } from "react";
import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";
import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";
import styles from "./List.module.css";
import { v4 as uuidv4 } from "uuid"; // Import the uuidv4 function

const List = ({ rows, changeCurrency, onSelectOrder }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(changeCurrency);

  const handleSelect = (selectedOrderId) => {
    onSelectOrder(selectedOrderId);
  };

  // Update selectedCurrency whenever changeCurrency prop changes
  useEffect(() => {
    setSelectedCurrency(changeCurrency);
  }, [changeCurrency]);

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {selectedCurrency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row) => (
          <ListRow
            key={row["&id"] + uuidv4()}
            onClick={() => handleSelect(row["&id"])}
          >
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails?.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails?.orderStatus}</ListRowCell>
            <ListRowCell>{row.timestamp ?? "N/A"}</ListRowCell>
            <ListRowCell>
              {row.bestExecutionData?.orderVolume[selectedCurrency] ?? "N/A"}
            </ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
