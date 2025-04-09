import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useEvaluationAmount } from "@/store/useEvaluationAmount";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  signal: boolean;
}

interface UserInfo {
  email: string;
  cm_wallet: string;
  referral_code: string;
  total_balance: number;
  tron_balance: number;
  total_deposits: number;
  total_profits: number;
  profit_percent: string;
  elapsed: number;
  availability: {
    fee_percentage: number;
    hours: number;
  };
}

export default function BalanceTable({ signal }: Props) {
  console.log("signal", signal);
  const { t } = useTranslation();
  const { evaluation } = useEvaluationAmount();
  console.log("evaluation", evaluation);
  const [totalBalance, setTotalBalance] = useState<number>();
  const [orderAvailable, setOrderAvailable] = useState<number>();
  const [totalDeposits, setTotalDeposits] = useState<number>();
  const [entryAmount, setEntryAmount] = useState<number>();
  const [totalProfits, setTotalProfits] = useState<number>();
  const [roi, setRoi] = useState<string>();
  const [elapse, setElapse] = useState<number>(0);

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      try {
        const storedUserInfoString = await AsyncStorage.getItem("userInfo");
        if (storedUserInfoString) {
          const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
          setTotalBalance(parsedUserInfo.total_balance);
          setOrderAvailable(parsedUserInfo.tron_balance);
          setEntryAmount(
            parsedUserInfo.total_balance - parsedUserInfo.tron_balance
          );
          setElapse(parsedUserInfo.elapsed);
          setTotalDeposits(parsedUserInfo.total_deposits);
          setTotalProfits(parsedUserInfo.total_profits);
          setRoi(parsedUserInfo.profit_percent);
        }
      } catch (error) {
        console.error("Error reading user info from AsyncStorage:", error);
      }
    };

    getUserInfo();
  }, []);

  return (
    <View style={styles.tableContainer}>
      <View style={styles.row}>
        <Text style={styles.title}>{t("Balance (USDT)")}</Text>
        <Text style={styles.content}>{totalBalance ?? "0.00"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>{t("Order available")}</Text>
        <Text style={styles.content}>{signal ? "0" : totalBalance}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>{t("Entry amount")}</Text>
        <Text style={styles.content}>{signal ? totalBalance : "0"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>{t("Evaluation amount")}</Text>
        <Text style={styles.content}>{signal ? evaluation : "0"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>{t("Profit and loss")}</Text>
        <Text style={[styles.content, styles.highlight]}>
          {totalBalance ? totalProfits ?? "0.00" : "0.00"}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>{t("ROI")}</Text>
        <Text style={[styles.content, styles.highlight]}>
          {totalBalance ? roi ?? "0%" : "0%"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    width: "100%",
    padding: 10,
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
