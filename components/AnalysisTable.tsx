import React, { useLayoutEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDate_1 } from "../utils/utilize";

interface ExecuteItem {
  amount: number;
  profit: number;
  created: string;
  profit_percent: string;
}

interface ExecuteItemWithAverage extends ExecuteItem {
  average: number;
}

interface UserData {
  executes: ExecuteItem[];
}
const { width, height } = Dimensions.get("window");
const isSmall = width + height < 1501;
const isTablet = width > height;

export default function AnalysisTable() {
  const [executes, setExecutes] = useState<ExecuteItem[]>([]);

  useLayoutEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUserInfoString = await AsyncStorage.getItem("userInfo");
        if (storedUserInfoString) {
          const parsedUserInfo: UserData = JSON.parse(storedUserInfoString);
          setExecutes(parsedUserInfo.executes);
        }
      } catch (error) {
        console.error("Error loading user info from AsyncStorage:", error);
      }
    };

    loadUserInfo();
  }, []);

  const totalProfit = useMemo(
    () => executes.reduce((sum, item) => sum + item.profit, 0),
    [executes]
  );

  const executesWithAverage: ExecuteItemWithAverage[] = useMemo(
    () =>
      executes.map((item) => ({
        ...item,
        average:
          totalProfit !== 0
            ? parseFloat((item.profit / totalProfit).toFixed(2))
            : 0,
      })),
    [executes, totalProfit]
  );

  return (
    <View style={styles.tableContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Percent</Text>
        <Text style={styles.headerText}>Amount</Text>
      </View>
      {executesWithAverage.length >= 1
        ? executesWithAverage.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{formatDate_1(item.created)}</Text>
              <Text style={styles.cell}>{item.profit_percent}</Text>
              <Text style={styles.cell}>{item.profit}</Text>
            </View>
          ))
        : [1, 2, 3, 4, 5].map((_, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>-</Text>
              <Text style={styles.cell}>-</Text>
              <Text style={styles.cell}>-</Text>
            </View>
          ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    width: "100%",
    height: isTablet ? "auto" : "100%",
    padding: 10,
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2b2d",
  },
  headerText: {
    color: "#666",
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  cell: {
    color: "white",
    flex: 1,
    textAlign: "center",
    fontSize: isSmall ? 11 : 12,
  },
});
