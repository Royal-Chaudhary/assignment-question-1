import React, { useState, useEffect } from "react";
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [data, setData] = useState([]);

  const timestampsMap = timestamps.results.reduce((acc, entry) => {
    acc[entry["&id"]] = entry.timestamps;
    return acc;
  }, {});

  useEffect(() => {
    const combinedData = mockData.results.map((order) => {
      const timestamp = timestampsMap[order["&id"]];
      return {
        ...order,
        timestamp: timestamp ? timestamp.orderSubmitted : "N/A",
      };
    });
    setData(combinedData);
  }, [timestampsMap]);

  const orderCount = data.length;

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSelectOrder = (selectedOrderId) => {
    const selectedOrderData = data.find(
      (order) => order["&id"] === selectedOrderId
    );
    setSelectedOrderDetails(selectedOrderData || {});

    const selectedOrderTimestamps = timestamps.results.find(
      (entry) => entry["&id"] === selectedOrderId
    );
    setSelectedOrderTimeStamps(
      selectedOrderTimestamps ? selectedOrderTimestamps.timestamps : {}
    );
  };

  // Filter data based on search input
  const filteredData = data.filter((row) =>
    row["&id"].toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={orderCount} />
        <div className={styles.actionBox}>
          <Search value={searchText} onChange={handleSearch} />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List
          rows={filteredData}
          changeCurrency={currency}
          onSelectOrder={handleSelectOrder}
        />
      </div>
    </div>
  );
};

export default Dashboard;
