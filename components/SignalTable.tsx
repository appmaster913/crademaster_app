import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

// Token image mapping would need to be adjusted for React Native
const tokenImages = {
  BTC: require("../assets/images/bitcoin.webp"),
  // ... add other token images similarly
};

function getRandomLabel(): string {
  return Math.random() < 0.5 ? "buy" : "sell";
}

const updateSingleTokenLabels = (
  index: number,
  setPairs: React.Dispatch<React.SetStateAction<string[][][]>>
) => {
  setPairs((prevPairs) => {
    const updatedPairs = [...prevPairs];
    updatedPairs[index] = [
      [getRandomLabel(), getRandomLabel(), getRandomLabel()],
    ];
    return updatedPairs;
  });

  const randomInterval = Math.floor(Math.random() * (7000 - 1000 + 1)) + 1000;
  setTimeout(() => updateSingleTokenLabels(index, setPairs), randomInterval);
};
const { width, height } = Dimensions.get("window");
const isTablet = width > height;
const isSmall = width + height < 1501;
console.log("isSmall", width, height);

export default function SignalTable() {
  const [pairs, setPairs] = useState<string[][][]>([]);

  const tokenData = [
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "AVAX", name: "Avalanche" },
    { symbol: "BNB", name: "BNB" },
    { symbol: "ADA", name: "Cardano" },
    { symbol: "DOGE", name: "Dogecoin" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "SHIB", name: "Shiba Inu" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "STETH", name: "Lido" },
    { symbol: "USDT", name: "Tether" },
    { symbol: "TRX", name: "TRON" },
    { symbol: "USDC", name: "USDC" },
  ];

  useEffect(() => {
    const numberOfPairs = tokenData.length;
    const initialPairs = Array(numberOfPairs).fill([["buy", "sell", "buy"]]);

    setPairs(initialPairs);

    initialPairs.forEach((_, index) => {
      updateSingleTokenLabels(index, setPairs);
    });
  }, []);

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.header}>SIGNAL</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell1}>Token</Text>
        <View style={styles.signalheader}>
          <Text style={styles.headerCell}>5m</Text>
          <Text style={styles.headerCell}>15m</Text>
          <Text style={styles.headerCell}>45m</Text>
        </View>
      </View>

      {tokenData.map((token, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.tokenInfo}>
            {/* Image component would need proper setup for local assets */}
            <Text style={styles.symbol}>{token.symbol}</Text>
            <Text style={styles.name}>{token.name}</Text>
          </View>
          <View style={styles.signals}>
            {pairs[index] ? (
              pairs[index][0].map((signal, i) => (
                <Text
                  key={i}
                  style={[
                    styles.signal,
                    { color: signal === "buy" ? "#0000ff" : "#ff0000" },
                  ]}
                >
                  {signal}
                </Text>
              ))
            ) : (
              <Text style={styles.signal}>Loading...</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    width: "100%",
    height: isTablet ? "auto" : "100%",
    overflowY: "scroll",
    padding: 10,
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
  },
  header: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    // paddingHorizontal: 10,
  },
  headerCell: {
    color: "white",
    fontSize: isSmall ? 8 : 12,
    fontWeight: "bold",
    textAlign: "right",
    // flex: 1,
  },
  headerCell1: {
    color: "white",
    fontSize: isSmall ? 8 : 12,
    fontWeight: "bold",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 10,
  },
  tokenInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 10,
    flex: 1,
    fontSize: 10,
  },
  symbol: {
    color: "white",
    marginRight: 10,
    fontSize: isSmall ? 8 : 10,
  },
  name: {
    color: "#666",
    fontSize: isSmall ? 6 : 10,
    display: isSmall ? "none" : "flex",
  },
  signals: {
    flexDirection: "row",
    justifyContent: "flex-end",
    fontSize: 12,
    flex: 3,
  },
  signalheader: {
    flexDirection: "row",
    marginLeft: isSmall ? 16 : 16,
    fontSize: 12,
    gap: isSmall ? 25 : 20,
    justifyContent: "flex-end",
    // marginRight: 6,
    flex: 3,
  },
  signal: {
    color: "white",
    width: 40,
    textAlign: "right",
    fontSize: isSmall ? 8 : 10,
  },
});
