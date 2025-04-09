import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useRemainTime } from "@/store/useCounting";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  signal: boolean;
};

interface UserInfo {
  total_balance: number;
  tron_balance: number;
  total_profits: number;
  executes: ExecuteItem[];
}

interface ExecuteItem {
  amount: number;
  profit: number;
  created: string;
}
const { width, height } = Dimensions.get("window");
const isTablet = width > height;

export default function AiTable({ signal }: Props) {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalProfits, setTotalProfits] = useState<number>(0);
  const [numberofExecutes, setNumberofExecutes] = useState<number>(0);
  const { timeRemaining } = useRemainTime();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const storedUserInfoString = await AsyncStorage.getItem("userInfo");
        if (storedUserInfoString) {
          const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
          setUserInfo(parsedUserInfo);
          setTotalBalance(parsedUserInfo.total_balance);
          setTotalProfits(parsedUserInfo.total_profits);
          setNumberofExecutes(parsedUserInfo.executes.length);
        }
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    };

    getUserInfo();
  }, []);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <View style={styles.tableContainer}>
      <View style={styles.row}>
        <Text style={styles.title}>MY AI</Text>
        <Text style={styles.content}>{formattedTime}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Order available</Text>
        <Text style={styles.content}>
          {signal ? "0.00" : totalBalance.toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Profit and loss</Text>
        <Text style={[styles.content, styles.highlight]}>
          {numberofExecutes
            ? (totalProfits / numberofExecutes).toFixed(2)
            : totalProfits.toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Entry amount</Text>
        <Text style={styles.content}>
          {signal ? totalBalance.toFixed(2) : "0.00"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    width: isTablet ? "100%" : "90%",
    height: isTablet ? "auto" : "100%",
    padding: 10,
    // marginTop: 10,
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    color: "#666",
  },
  content: {
    color: "white",
  },
  highlight: {
    color: "#ffc000",
  },
});
