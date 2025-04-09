import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import Icon from "react-native-vector-icons/FontAwesome";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default function HomeScreen() {
  const [copied, setCopied] = useState(false);
  const [walletAddr, setWalletAddr] = useState("Your wallet address here");
  const [usdt, setUsdt] = useState("0.00");
  const [tron, setTron] = useState("0.00");
  const [note] = useState(true);

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      try {
        const storedUserInfoString = await AsyncStorage.getItem("userInfo");
        if (storedUserInfoString) {
          const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
          // setUserEmail(parsedUserInfo.email);
          setWalletAddr(parsedUserInfo.cm_wallet);
          setTron(parsedUserInfo.tron_balance.toString());
          setUsdt(parsedUserInfo.usdt_balance.toString());
          // setTotalBalance(parsedUserInfo.total_balance);
          // setOrderAvailable(parsedUserInfo.tron_balance);
        }
      } catch (error) {
        console.error("Error reading user info from AsyncStorage:", error);
      }
    };

    getUserInfo();
  }, []);

  const handleCopyWallet = async () => {
    await Clipboard.setStringAsync(walletAddr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Deposit</Text>
          </View>

          <View style={styles.main}>
            <Text style={styles.description}>
              Please initiate a USDT transfer to your designated Crademaster
              wallet address below.
            </Text>

            <View style={styles.balanceRow}>
              <Text style={styles.balanceLabel}>USDT balance :</Text>
              <Text style={styles.balanceValue}>{usdt}</Text>
            </View>

            <View style={styles.balanceRow}>
              <Text style={styles.balanceLabel}>TRON balance :</Text>
              <Text style={styles.balanceValue}>{tron}</Text>
            </View>

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

            {/* QR Code Section */}
            <View style={styles.qrContainer}>
              <View style={styles.qrcodeContainer}>
                <QRCode
                  value={walletAddr || "No Wallet Connected"}
                  size={100}
                  backgroundColor="white"
                />
              </View>

              <View style={styles.walletAddressContainer}>
                <Text style={styles.label}>Wallet Address</Text>
                <View style={styles.inputWithCopy}>
                  <TextInput
                    style={styles.input}
                    value={walletAddr}
                    editable={false}
                  />
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={handleCopyWallet}
                  >
                    {copied ? (
                      <Text style={styles.copyText}>Copied!</Text>
                    ) : (
                      <Icon name="clipboard" size={18} color="#666" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {note && (
              <View style={styles.noteContainer}>
                <Text style={styles.noteHeader}>Note:</Text>
                <Text style={styles.noteContent}>
                  Deposit may take from a few minutes to over 30 minutes.
                </Text>
              </View>
            )}
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
    marginTop: 0,
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  main: {
    width: "100%",
  },
  description: {
    color: "#666",
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  balanceLabel: {
    color: "white",
  },
  balanceValue: {
    color: "white",
  },
  inputGroup: {
    marginTop: 20,
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
    fontSize: 12,
    // height: "10%",
  },
  picker: {
    color: "white",
    fontSize: 12,
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 30,
    padding: 10,
    width: "100%",
  },
  walletAddressContainer: {
    width: "100%",
    marginTop: 20,
  },
  inputWithCopy: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    borderColor: "#2a2b2d",
    borderWidth: 1,
    marginTop: 6,
  },
  input: {
    flex: 1,
    color: "white",
    height: 30,
    padding: 8,
    fontSize: 13,
  },
  copyButton: {
    padding: 12,
  },
  copyText: {
    color: "#666",
  },
  noteContainer: {
    borderColor: "#ef4444",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
  },
  noteHeader: {
    color: "#ef4444",
  },
  pickerItem: {
    fontSize: 12,
    // padding: 8,
  },
  noteContent: {
    color: "white",
  },
  qrcodeContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "white",
    marginRight: 20,
  },
});
