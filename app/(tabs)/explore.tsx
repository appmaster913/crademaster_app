import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NativeViewGestureHandler,
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import React, { useState, useEffect, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

interface UserInfo {
  email: string;
  cm_wallet: string;
  referral_code: string;
  total_balance: number;
  tron_balance: number;
  usdt_balance: number;
  total_deposits: number;
  total_profits: number;
  profit_percent: string;
  elapsed: number;
  availability: {
    fee_percentage: number;
    hours: number;
  };
}

export default function TabTwoScreen() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");
  const [value, setValue] = useState(0);
  const [walletError, setWalletError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [walletamount, setWalletAmount] = useState(0);

  // Load user info on component mount
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUserInfoString = await AsyncStorage.getItem("userInfo");
        const storedWalletAddress = await AsyncStorage.getItem("connect");

        if (storedWalletAddress) {
          setWalletAddress(storedWalletAddress);
        }

        if (storedUserInfoString) {
          const parsedUserInfo = JSON.parse(storedUserInfoString);
          setWalletAmount(parsedUserInfo.total_balance);
        }
      } catch (error) {
        console.error("Error loading user info:", error);
      }
    };

    loadUserInfo();
  }, []);

  const handleChange = (number: number) => {
    setValue(number);
  };

  const handleSubmit = async () => {
    let isValid = true;

    // Validate wallet address
    if (!walletAddress.trim()) {
      setWalletError("Wallet address is required.");
      isValid = false;
    } else {
      setWalletError("");
    }

    // Validate withdrawal amount
    if (value <= 0) {
      setAmountError("Withdraw amount must be greater than 0.");
      isValid = false;
    } else if (value > walletamount) {
      setAmountError("Withdraw amount exceeds available balance.");
      isValid = false;
    } else {
      setAmountError("");
    }

    if (isValid) {
      try {
        await AsyncStorage.setItem("withdraw", value.toString());
        await AsyncStorage.setItem("walletAddress", walletAddress);
        router.push("/(tabs)/confirmorder");
      } catch (error) {
        console.error("Error saving withdrawal data:", error);
        // You might want to show an error message to the user here
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Withdraw</Text>
          </View>

          <View style={styles.main}>
            {/* Crypto Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Crypto</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  enabled={false}
                  selectedValue="USDT"
                  style={styles.picker}
                >
                  <Picker.Item
                    style={styles.pickerItem}
                    label="USDT"
                    value="USDT"
                  />
                </Picker>
              </View>
            </View>

            {/* Network Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Network</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  enabled={false}
                  selectedValue="TRON"
                  style={styles.picker}
                >
                  <Picker.Item
                    style={styles.pickerItem}
                    label="TRON(TRX-20)"
                    value="TRON"
                  />
                </Picker>
              </View>
            </View>

            {/* Wallet Address Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Wallet Address</Text>
              <TextInput
                style={styles.input}
                value={walletAddress}
                onChangeText={setWalletAddress}
                placeholder="Enter your wallet address"
                placeholderTextColor="gray"
              />
              {walletError ? (
                <Text style={styles.error}>{walletError}</Text>
              ) : null}
            </View>

            {/* Amount Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Withdraw Amount</Text>
              <TextInput
                style={styles.input}
                value={value.toString()}
                onChangeText={(text) => {
                  const num = parseFloat(text);
                  if (!isNaN(num) && num <= walletamount) {
                    setValue(num);
                  }
                }}
                keyboardType="numeric"
                placeholder="Enter amount"
                placeholderTextColor="gray"
              />
              {amountError ? (
                <Text style={styles.error}>{amountError}</Text>
              ) : null}
            </View>

            {/* Slider */}
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={walletamount}
              value={value}
              onValueChange={handleChange}
            />

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            {/* Limits Info */}
            <View style={styles.limitsContainer}>
              <View style={styles.limitRow}>
                <Text style={styles.limitLabel}>Minimum Deposit Limit</Text>
                <Text style={styles.limitValue}>0.000000 USDT</Text>
              </View>
              <View style={styles.limitRow}>
                <Text style={styles.limitLabel}>Deposit Fees</Text>
                <Text style={styles.limitValue}>0.000000 USDT</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#181a20",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 0,
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  pickerItem: {
    fontSize: 12,
  },
  main: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    borderColor: "#2a2b2d",
    borderWidth: 1,
  },
  picker: {
    color: "white",
  },
  input: {
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    borderColor: "#2a2b2d",
    borderWidth: 1,
    padding: 12,
    color: "white",
    height: 50,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  slider: {
    width: "100%",
    height: 40,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: "#ffc000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  submitButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  limitsContainer: {
    marginTop: 20,
  },
  limitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  limitLabel: {
    color: "#666",
  },
  limitValue: {
    color: "white",
  },
});
