import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

interface UserInfo {
  email: string;
  cm_wallet: string;
  referral_code: string;
  availability: {
    fee_percentage: number;
    hours: number;
  };
  is_program_active: boolean;
  total_execute: number;
  elapsed: number;
  referred_users: Array<{
    email: string;
    created: string;
    earning: number;
  }>;
  usdt_balance: number;
  tron_balance: number;
  profit_percent: string;
}
const { width, height } = Dimensions.get("window");
const isSmall = width + height < 1501;
const isTablet = width > height;

export default function LogoComponent() {
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [totalUsage, setTotalUsage] = useState<string>("");
  const [percent, setPercent] = useState<string>("");
  const { t } = useTranslation();
  useEffect(() => {
    // Fetch the user's IP address from ipify API
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        setIpAddress(response.data.ip); // Store the IP address
      })
      .catch((error) => {
        console.error("Error fetching IP address: ", error);
      });
  }, []);

  function convertHoursToString(total_execute: number): string {
    // Convert total usage (in hours) to total seconds
    const totalSeconds = total_execute;

    // Calculate hours, minutes, and seconds from total seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Format the result as "HH:MM:SS"
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");

      if (storedUserInfo) {
        const parsedUserInfo: UserInfo = JSON.parse(storedUserInfo);
        setTotalUsage(convertHoursToString(parsedUserInfo.total_execute));
        setPercent(parsedUserInfo.profit_percent);
      }

      // Fetch latest user details
    } catch (error) {
      console.error("Error loading user info:", error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.log}>
        <Image
          source={require("../assets/images/CM_logo.png")}
          style={styles.logoImage}
        />
        <View style={styles.text}>
          <Text style={styles.title}>
            <Text style={{ color: "#ffc000" }}>C</Text>
            rade
            <Text style={{ color: "#008ad1" }}>M</Text>
            aster
          </Text>
          <Text style={styles.subtitle}>AI-Auto Trading System</Text>
        </View>
      </View>
      <View style={styles.stateContainer}>
        <Text style={styles.stateText}>
          {t("Connection IP")}: {ipAddress ? ipAddress : "Loading..."}
        </Text>
        <Text style={styles.stateText}>
          {t("Total usage time")}: {totalUsage}
        </Text>
        <Text style={styles.stateText}>
          {t("Estimated return based on the closing time")}: {percent}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stateContainer: {
    padding: 10,
    flexDirection: isTablet ? "row" : "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: isTablet ? "100%" : "50%",
    // marginTop: 10,
    textAlign: "center",
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    flex: isTablet ? 3 : 1,
  },
  stateText: {
    color: "white",
    fontSize: isSmall ? 8 : 12,
    textAlign: "center",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // flex: 1,
  },
  log: {
    flexDirection: "row",
    alignItems: "center",
    flex: isTablet ? 1 : 1,
    marginRight: isTablet ? 30 : 0,
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  text: {
    marginLeft: 10,
  },
  title: {
    color: "white",
    fontSize: isSmall ? 14 : 20,
  },
  highlight: {
    color: "#ffc000",
  },
  subtitle: {
    color: "#ffc000",
    fontSize: isSmall ? 8 : 12,
  },
});
