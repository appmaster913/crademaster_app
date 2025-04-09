import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; // For icons

export default function ScamRisk() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checkboxError, setCheckboxError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  // Handle Confirm Button Click
  const handleConfirmClick = async () => {
    if (!isChecked) {
      setCheckboxError("Please acknowledge the risk before proceeding.");
      return;
    }

    setCheckboxError("");
    setIsLoading(true);

    // try {
    //   // ... existing API call code ...

    //   if (response.ok) {
    //     Alert.alert("Success", "Withdrawal request submitted successfully.");
    //     router.push("/(tabs)/explore");
    //   } else {
    //     setApiError(data.message || "An error occurred during withdrawal.");
    //   }
    // } catch (error) {
    //   setApiError("Failed to connect to the server. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <View style={styles.container}>
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
      {/* <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/explore")}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
      </View> */}

      <View style={styles.main}>
        {/* <Text style={styles.title}>Scam Risk Warning</Text> */}
        <Text style={styles.description}>
          Recently, <Text style={styles.highlight}>online scams</Text> have
          become more serious. Scammers may use high returns as bait to attract
          you to transfer assets to their fraudulent addresses/
          <Text style={styles.highlight}>fake trading platform</Text>. In order
          to gain your trust, you may withdraw successfully with{" "}
          <Text style={styles.highlight}>a small amount</Text>. Once you
          transfer a large sum of funds, you may find yourself unable to
          withdraw anymore. Under the pretext of{" "}
          <Text style={styles.highlight}>
            taxes/audit fees/Anti-Money Laundering
          </Text>{" "}
          regulations, etc..., scammers would ask you to transfer more funds to
          them. If you encounter the above situation, please terminate all
          transactions.
        </Text>

        <View style={styles.checkboxContainer}>
          <Pressable
            style={[styles.checkbox, isChecked && styles.checkboxChecked]}
            onPress={() => setIsChecked(!isChecked)}
          >
            {isChecked && <Icon name="check" size={14} color="#fff" />}
          </Pressable>
          <Text style={styles.checkboxLabel}>
            I fully understand the potential risks associated with asset
            withdrawal and confirm that I would like to continue withdrawing my
            assets.
          </Text>
        </View>

        {checkboxError ? (
          <Text style={styles.errorText}>{checkboxError}</Text>
        ) : null}
        {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.push("/(tabs)/dashboard")}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={!isLoading ? handleConfirmClick : undefined}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Confirm</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1b1d",
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

  main: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#facc15", // yellow-300
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 24,
    textAlign: "center",
  },
  highlight: {
    color: "#ad254b", // yellow-300
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 30,
    width: "100%",
  },
  checkboxLabel: {
    flex: 1,
    marginLeft: 8,
    color: "#ffffff",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 8,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    height: 40,
    backgroundColor: "#facc15",
    borderRadius: 10,
    marginRight: 32,
    justifyContent: "center",
  },
  confirmButton: {
    flex: 1,
    height: 40,
    backgroundColor: "#facc15",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "#334155", // slate-700
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#2a2b2d",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  checkboxChecked: {
    backgroundColor: "#2a2b2d",
  },
});
