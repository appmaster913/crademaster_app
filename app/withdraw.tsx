import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WithdrawScreen() {
  const [walletAddress, setWalletAddress] = useState("");
  const [value, setValue] = useState(0);
  const [walletError, setWalletError] = useState("");
  const [amountError, setAmountError] = useState("");
  const walletamount = 1000; // Example maximum amount

  const handleChange = (number: number) => {
    setValue(number);
  };

  const handleSubmit = () => {
    // Add your submit logic here
  };

  return (
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
                <Picker.Item label="USDT" value="USDT" />
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
                <Picker.Item label="TRON(TRX-20)" value="TRON" />
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
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    marginVertical: 20,
  },
  title: {
    fontSize: 40,
    color: "white",
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
    borderColor: "#ffc000",
    borderWidth: 1,
  },
  picker: {
    color: "white",
  },
  input: {
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    borderColor: "#ffc000",
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
