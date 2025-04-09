import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ConfirmOrder() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedAmount = await AsyncStorage.getItem("withdraw");
        const storedAddress = await AsyncStorage.getItem("walletAddress");
        setAmount(storedAmount || "");
        setAddress(storedAddress || "");
      } catch (err) {
        setError("Error loading data");
      }
    };

    fetchStoredData();
  }, []);

  const handleConfirmOrder = async () => {
    setError("");

    if (!amount || !address) {
      setError("Invalid amount or address");
      return;
    }

    try {
      setIsProcessing(true);

      await AsyncStorage.multiSet([
        ["transactionStatus", "pending"],
        ["transactionAmount", amount],
        ["transactionAddress", address],
      ]);

      // Simulating process
      setTimeout(() => {
        router.push("/(tabs)/scamrisk");
      }, 1501);
    } catch (err) {
      setError("Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/explore")}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Order</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.main}>
        <View style={styles.getSection}>
          <Text style={styles.willGet}>You will get:</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{amount}</Text>
            <Text style={styles.currency}>USDT</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>Address</Text>
            <Text style={styles.detailContent}>{address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>Network</Text>
            <Text style={styles.detailContent}>TRON</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>Amount</Text>
            <Text style={styles.detailContent}>{amount} USDT</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>Network fee</Text>
            <Text style={styles.detailContent}>0.000000 USDT</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Ensure that the address is correct and on the same network.
          Transactions cannot be cancelled
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.confirmButton, isProcessing && styles.disabledButton]}
          onPress={handleConfirmOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirm</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  main: {
    flex: 1,
    padding: 16,
  },
  getSection: {
    marginBottom: 24,
    textAlign: "center",
  },
  willGet: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  amount: {
    color: "#fff",
    fontSize: 25,
    marginRight: 8,
  },
  currency: {
    color: "#fff",
    fontSize: 18,
  },
  detailsSection: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3a",
  },
  detailTitle: {
    color: "#888",
    fontSize: 14,
  },
  detailContent: {
    color: "#fff",
    fontSize: 14,
  },
  description: {
    color: "#888",
    textAlign: "center",
    marginBottom: 24,
    fontSize: 14,
  },
  errorText: {
    color: "#ff4444",
    textAlign: "center",
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: "#ffc000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
