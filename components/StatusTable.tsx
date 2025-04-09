import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useTimeState } from "../store/useTime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEvaluationAmount } from "../store/useEvaluationAmount";
import { useStatusTableStore } from "../store/useStatusTableStore";

export default function StatusTable() {
  const { t } = useTranslation();
  const rows = useStatusTableStore((state) => state.rows);
  const addRow = useStatusTableStore((state) => state.addRow);
  const setRows = useStatusTableStore((state) => state.setRows);
  const { time } = useTimeState();
  const { setEvaluation } = useEvaluationAmount();
  const [totalProfitAndLoss, setTotalProfitAndLoss] = useState<number>(0);

  const getRandomValue = (min: number, max: number, decimals = 4) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
  const getRandomIntValue = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  const formatSecondsToTime = (seconds: number) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  useEffect(() => {
    const loadStoredRows = async () => {
      try {
        const storedRows = await AsyncStorage.getItem("statusTableRows");
        if (storedRows) {
          const parsedRows = JSON.parse(storedRows);
          setRows(parsedRows);
        }
      } catch (error) {
        console.error("Failed to load stored rows:", error);
        await AsyncStorage.removeItem("statusTableRows");
      }
    };
    loadStoredRows();
  }, []);

  useEffect(() => {
    const saveRows = async () => {
      if (rows.length > 3) {
        const lastThreeRows = rows.slice(0, 3);
        await AsyncStorage.setItem(
          "statusTableRows",
          JSON.stringify(lastThreeRows)
        );
      }
    };
    saveRows();

    const total = rows.reduce(
      (sum, row) =>
        sum + (row.roi < 0 ? -row.profitAndLoss : row.profitAndLoss),
      0
    );
    setEvaluation(parseFloat(total.toFixed(4)));
    setTotalProfitAndLoss(parseFloat(total.toFixed(4)));
  }, [rows]);

  const generateRandomRow = (currentTime: number) => ({
    time: currentTime,
    status: "Active",
    exchange: ["OKX", "Binance", "Pionex"][Math.floor(Math.random() * 3)],
    level: 1,
    leverage: 5,
    mode: "Fixed",
    quantity: getRandomValue(0.002, 0.7),
    roi: getRandomValue(-1.3, 1.5),
    profitAndLoss: getRandomValue(0.1, 1),
    margin: getRandomValue(2, 30),
    currentPrice: getRandomValue(20, 7000),
    averagePrice: getRandomValue(20, 7000),
    evaluationAmount: getRandomValue(2, 28),
  });

  useEffect(() => {
    if (time && time % getRandomIntValue(5, 8) === 0) {
      addRow(generateRandomRow(time));
    }
  }, [time]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <ScrollView>
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>{t("Time")}</Text>
              <Text style={styles.headerCell}>{t("Status")}</Text>
              <Text style={styles.headerCell}>{t("Exchange")}</Text>
              <Text style={styles.headerCell}>{t("Level")}</Text>
              <Text style={styles.headerCell}>{t("Leverage")}</Text>
              <Text style={styles.headerCell}>M.mode</Text>
              <Text style={styles.headerCell}>{t("Quantity")}</Text>
              <Text style={styles.headerCell}>ROI</Text>
              <Text style={styles.headerCell}>{t("P&L")}</Text>
              <Text style={styles.headerCell}>{t("Margin")}</Text>
              <Text style={styles.headerCell}>{t("Current Price")}</Text>
              <Text style={styles.headerCell}>{t("Avg Price")}</Text>
              <Text style={styles.headerCell}>{t("Eval Amount")}</Text>
            </View>
            {time
              ? rows.map((row, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={styles.cell}>
                      {formatSecondsToTime(row.time ?? 0)}
                    </Text>
                    <Text style={styles.cell}>{row.status}</Text>
                    <Text style={styles.cell}>{row.exchange}</Text>
                    <Text style={styles.cell}>{row.level}</Text>
                    <Text style={styles.cell}>{row.leverage}</Text>
                    <Text style={styles.cell}>{row.mode}</Text>
                    <Text style={styles.cell}>{row.quantity}</Text>
                    <Text
                      style={[
                        styles.cell,
                        { color: row.roi >= 0 ? "blue" : "red" },
                      ]}
                    >
                      {row.roi}%
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        { color: row.roi >= 0 ? "blue" : "red" },
                      ]}
                    >
                      {row.profitAndLoss}
                    </Text>
                    <Text style={styles.cell}>{row.margin}</Text>
                    <Text style={styles.cell}>{row.currentPrice}</Text>
                    <Text style={styles.cell}>{row.averagePrice}</Text>
                    <Text style={styles.cell}>{row.evaluationAmount}</Text>
                  </View>
                ))
              : [1, 2, 3].map((_, index) => (
                  <View key={index} style={styles.row}>
                    {Array(13)
                      .fill("-")
                      .map((_, cellIndex) => (
                        <Text key={cellIndex} style={styles.cell}>
                          -
                        </Text>
                      ))}
                  </View>
                ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    height: 200,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#2a2b2d",
    padding: 10,
  },
  headerCell: {
    color: "#666",
    width: 100,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2b2d",
  },
  cell: {
    color: "white",
    width: 100,
    textAlign: "center",
  },
});
