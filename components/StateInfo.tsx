import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { calculateRemainingTime } from "../utils/timeUtils";
import { useTimeState } from "@/store/useTime";
import { useRemainTime } from "@/store/useCounting";
import { useLang } from "@/store/useLang";
import langList from "@/assets/langList.json";
// import i18n from "@/utils/multiLang";

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
type Props = {
  signal: boolean;
  setSignal: React.Dispatch<React.SetStateAction<boolean>>;
};

const { width, height } = Dimensions.get("window");
const isTablet = width > height;
const isSmall = width + height < 1501;

export default function StateInfo({ signal, setSignal }: Props) {
  // const [signal, setSignal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { timeRemaining, setTimeRemaining } = useRemainTime();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [totalUsage, setTotalUsage] = useState<string>("");
  const [percent, setPercent] = useState<string>("");
  const { setTimeState } = useTimeState();
  const { lang, setLang } = useLang();
  const [selectedLang, setSelectedLang] = useState(langList[0]);

  // Add convertHoursToString utility function
  const convertHoursToString = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  // useEffect(() => {
  //   switch (lang) {
  //     case "en":
  //       i18n.changeLanguage("en");
  //       break;
  //     case "cn":
  //       i18n.changeLanguage("cn");
  //       break;
  //     case "rn":
  //       i18n.changeLanguage("ru");
  //       break;
  //     default:
  //       i18n.changeLanguage("kn");
  //   }
  // }, [lang]);

  useEffect(() => {
    loadUserInfo();
  }, []);

  // Add IP address fetching effect
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

  const loadUserInfo = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("userToken");
      const storedUserInfo = await AsyncStorage.getItem("userInfo");

      if (storedUserInfo) {
        const parsedUserInfo: UserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
        setTotalUsage(convertHoursToString(parsedUserInfo.total_execute));
        setPercent(parsedUserInfo.profit_percent);

        if (
          parsedUserInfo.elapsed > 0 &&
          parsedUserInfo.elapsed < parsedUserInfo.availability.hours * 3600
        ) {
          setSignal(true);
        }
      }

      // Fetch latest user details
      if (storedToken) {
        const response = await axios.get(
          "https://api.crademaster.com/api/user-details/",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (response.status === 200) {
          const remainingTime = calculateRemainingTime(
            response.data.availability.hours,
            Math.floor(response.data.elapsed)
          );
          setTimeRemaining(remainingTime);
          await AsyncStorage.setItem("userInfo", JSON.stringify(response.data));

          if (
            response.data.elapsed > 0 &&
            response.data.elapsed <= response.data.availability.hours * 3600
          ) {
            setSignal(true);
          }
        }
      }
    } catch (error) {
      console.error("Error loading user info:", error);
      await AsyncStorage.removeItem("userToken");
      // router.replace("/(auth)/login");
    }
  };

  const handleActivate = async () => {
    if (!signal && !loading) {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await axios.post(
          "https://api.crademaster.com/api/activate/",
          { data: {} },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (token) {
          setSignal(true);
        } else {
          // router.replace("/(auth)/login");
        }
      } catch (error: any) {
        console.error("Error:", error.response?.data);
        if (error.response?.data?.code === "token_not_valid") {
          await AsyncStorage.removeItem("userToken");
          // router.replace("/(auth)/login");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Timer effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (signal) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime < 1) {
            clearInterval(intervalId);
            setSignal(false);
            return 0;
          }
          setTimeState(prevTime);
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [signal]);

  const formattedTime = useMemo(() => {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [timeRemaining]);

  // Update the language selection handler
  const handleLanguageChange = () => {
    const currentIndex = langList.findIndex(
      (lang) => lang.code === selectedLang.code
    );
    const nextIndex = (currentIndex + 1) % langList.length;
    const newLang = langList[nextIndex];

    setSelectedLang(newLang);
    setLang(newLang.code);
    i18n.changeLanguage(newLang.code);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.oneCell}>
          <Text style={[styles.timeText, signal && styles.timeTextActive]}>
            {formattedTime}
          </Text>
        </View>
        <View style={styles.oneCell}>
          <TouchableOpacity
            style={[
              styles.button,
              signal ? styles.buttonActive : styles.buttonInactive,
            ]}
            onPress={!loading ? handleActivate : undefined}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Loading..." : signal ? t("ON") : t("OFF")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.oneCell}>
          <TouchableOpacity
            style={styles.myButton}
            onPress={() => {
              // AsyncStorage.setItem("sidebar", "true");
            }}
          >
            <Text style={styles.buttonText}>MY</Text>
          </TouchableOpacity>
        </View>

        {/* Add language selection button */}
        {/* <View style={styles.oneCell}>
          <TouchableOpacity
            style={styles.langButton}
            onPress={handleLanguageChange}
          >
            <Text style={styles.buttonText}>{selectedLang.label}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: isTablet ? 10 : 20,
    gap: 20,
  },
  stateContainer: {
    gap: 10,
  },
  stateText: {
    color: "white",
    fontSize: 14,
  },
  oneCell: {
    marginRight: isTablet ? 10 : 0,
    width: "30%",
    // flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  timeText: {
    fontSize: isTablet ? 14 : 24,
    color: "white",
  },
  timeTextActive: {
    color: "#00ff00",
  },
  button: {
    padding: isTablet ? 8 : 10,
    borderRadius: 8,
    // minWidth: 100,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: "#00ff00",
  },
  buttonInactive: {
    backgroundColor: "#ff0000",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    height: "80%",
  },
  myButton: {
    backgroundColor: "#1a1b1d",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    // minWidth: 100,
    padding: isTablet ? 8 : 10,
  },
  langButton: {
    backgroundColor: "#2a2b2d",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    padding: isTablet ? 8 : 10,
  },
});
