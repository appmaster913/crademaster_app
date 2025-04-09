import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";

const avatarUrl = "https://api.dicebear.com/7.x/bottts/png?seed=Leon";
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

export default function AccountScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [copied1, setCopied1] = useState(false);
  const [userEmail, setUserEmail] = useState("user@example.com");
  const [walletAddr, setWalletAddr] = useState("wallet_address_here");
  const [userInfo] = useState({ referral_code: "REF123" });
  const [tron, setTron] = useState("0.00");
  const [usdt, setUsdt] = useState("0.00");

  const { open, isConnected, address, provider } = useWalletConnectModal();

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      try {
        const storedUserInfoString = await AsyncStorage.getItem("userInfo");
        if (storedUserInfoString) {
          const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
          setUserEmail(parsedUserInfo.email);
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

  const handleButtonPress = async () => {
    // if (isConnected) {
    //   return provider?.disconnect();
    // }
    // return open();
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(
      `https://program.crademaster.com/register?referral=${userInfo?.referral_code}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy1 = async () => {
    await Clipboard.setStringAsync(userInfo?.referral_code);
    setCopied1(true);
    setTimeout(() => setCopied1(false), 2000);
  };

  const steps = [
    { id: 1, title: "Connect Wallet", completed: true },
    { id: 2, title: "Verify Identity", completed: false },
    { id: 3, title: "Start Trading", completed: false },
  ];

  const handleStepComplete = (stepId: number) => {
    console.log(`Completing step ${stepId}`);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView style={styles.container}>
          {/* User Info Section */}
          <View style={styles.navbar}>
            <View style={styles.user}>
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.username}>{userEmail}</Text>
                <Text style={styles.walletAddr}>{walletAddr}</Text>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>UID</Text>
                <Text style={styles.statValue}>36226553</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Grade</Text>
                <Text style={styles.statValue}>Regular User</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Following</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Followers</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
            </View>
          </View>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Get Started</Text>
              <TouchableOpacity
                style={[
                  styles.connectButton,
                  steps[0].completed && styles.connectButtonCompleted,
                ]}
                disabled={steps[0].completed}
                onPress={handleButtonPress}
              >
                <Text
                  style={[
                    styles.connectButtonText,
                    steps[0].completed && styles.connectButtonTextCompleted,
                  ]}
                >
                  {"Connect Wallet"}
                </Text>
              </TouchableOpacity>
              <W3mButton />
              {/* <WalletConnectModal
                    projectId={projectId}
                    providerMetadata={providerMetadata}
                  /> */}
            </View>

            <View style={styles.progressSteps}>
              {/* Step 1 */}
              <View style={styles.stepContainer}>
                <View style={styles.stepIconContainer}>
                  <View
                    style={[
                      styles.stepIcon,
                      steps[0].completed && styles.stepIconCompleted,
                    ]}
                  >
                    {steps[0].completed ? (
                      <MaterialIcons name="check" size={20} color="#000" />
                    ) : (
                      <Text style={styles.stepNumber}>1</Text>
                    )}
                  </View>
                </View>
                <View style={styles.verificationCard}>
                  <View style={styles.verificationContent}>
                    <View>
                      <Text style={styles.verifyTitle}>
                        {t("Verify Account")}
                      </Text>
                      <Text style={styles.verifySubtitle}>
                        {t(
                          "Complete identity verification to access all CradeMaster services"
                        )}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.verifyButton}
                      //   onPress={() => router.push("/securityverification")}
                    >
                      <Text style={styles.verifyButtonText}>Verify Now</Text>
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={require("../../assets/images/kcc.png")}
                    style={styles.verifyImage}
                  />
                </View>
              </View>

              {/* Step 2 */}
              <View style={styles.stepContainer}>
                <View style={styles.stepIconContainer}>
                  <View
                    style={[
                      styles.stepIcon,
                      steps[1].completed && styles.stepIconCompleted,
                    ]}
                  >
                    {steps[1].completed ? (
                      <MaterialIcons name="check" size={20} color="#000" />
                    ) : (
                      <Text style={styles.stepNumber}>2</Text>
                    )}
                  </View>
                </View>
                <View style={styles.verificationCard1}>
                  <View style={styles.verificationContent}>
                    <View>
                      <Text style={styles.verifyTitle}>{t("Deposit")}</Text>
                      <Text style={styles.verifySubtitle}>{t("Pending")}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Step 3 */}
              <View style={styles.stepContainer}>
                <View style={styles.stepIconContainer}>
                  <View
                    style={[
                      styles.stepIcon,
                      steps[2].completed && styles.stepIconCompleted,
                    ]}
                  >
                    {steps[2].completed ? (
                      <MaterialIcons name="check" size={20} color="#000" />
                    ) : (
                      <Text style={styles.stepNumber}>3</Text>
                    )}
                  </View>
                </View>
                {/* <Text style={styles.stepTitle}>Start Trading</Text> */}
              </View>
            </View>
          </View>

          {/* Balance Section */}
          <View style={styles.balanceSection}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Estimated Balance:</Text>
              <View style={styles.balanceActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => router.push("/(tabs)")}
                >
                  <Text style={styles.actionButtonText}>Deposit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => router.push("/(tabs)/explore")}
                >
                  <Text style={styles.actionButtonText}>Withdraw</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.balanceDetails}>
              <Text style={styles.balanceAmount}>{tron} TRX</Text>
              <Text style={styles.balanceAmount}>{usdt} USDT</Text>
            </View>
          </View>

          {/* Referral Section */}
          <View style={styles.referralSection}>
            <Text style={styles.sectionTitle}>Referral</Text>
            <View style={styles.referralContent}>
              <View style={styles.qrContainer}>
                <QRCode
                  value={walletAddr || "No Wallet Connected"}
                  size={100}
                  backgroundColor="white"
                />
              </View>

              <View style={styles.referralLinks}>
                <View style={styles.linkItem}>
                  <Text style={styles.linkLabel}>Invite Link</Text>
                  <View style={styles.linkInputContainer}>
                    <TextInput
                      style={styles.linkInput}
                      value={`https://program.crademaster.com/register?referral=${userInfo?.referral_code}`}
                      editable={false}
                    />
                    <TouchableOpacity
                      style={styles.copyButton}
                      onPress={handleCopy}
                    >
                      {copied ? (
                        <Text style={styles.copyText}>Copied!</Text>
                      ) : (
                        <Icon name="clipboard" size={18} color="#666" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.linkItem}>
                  <Text style={styles.linkLabel}>My Invitation Code</Text>
                  <View style={styles.linkInputContainer}>
                    <TextInput
                      style={styles.linkInput}
                      value={userInfo?.referral_code}
                      editable={false}
                    />
                    <TouchableOpacity
                      style={styles.copyButton}
                      onPress={handleCopy1}
                    >
                      {copied1 ? (
                        <Text style={styles.copyText}>Copied!</Text>
                      ) : (
                        <Icon name="clipboard" size={18} color="#666" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
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
  navbar: {
    marginTop: 30,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 8,
  },
  userInfo: {
    height: 70,
    justifyContent: "space-between",
  },
  username: {
    color: "white",
    marginTop: 10,
  },
  walletAddr: {
    color: "white",
  },
  statsContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 50,
    width: "100%",
  },
  statItem: {
    alignItems: "flex-start",
  },
  statLabel: {
    color: "#666",
  },
  statValue: {
    color: "white",
  },
  progressSection: {
    marginTop: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#2a2b2d",
    padding: 15,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressTitle: {
    color: "white",
    fontSize: 16,
  },
  progressSteps: {
    marginVertical: 20,
    width: "80%",
  },
  connectButton: {
    backgroundColor: "#1a1b1d",
    padding: 8,
    borderRadius: 5,
  },
  connectButtonText: {
    color: "white",
  },
  verificationCard: {
    flexDirection: "row",
    backgroundColor: "#232321",
    padding: 10,
    borderRadius: 15,
    borderColor: "#ffc000",
    borderWidth: 1,
  },
  verificationCard1: {
    flexDirection: "row",
    backgroundColor: "#232321",
    padding: 10,
    borderRadius: 15,
    borderColor: "gray",
    borderWidth: 1,
  },
  verificationContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  verifyTitle: {
    color: "white",
    fontSize: 15,
  },
  verifySubtitle: {
    color: "#666",
    fontSize: 10,
  },
  verifyButton: {
    backgroundColor: "#ffc000",
    padding: 8,
    borderRadius: 5,
    width: "50%",
  },
  verifyButtonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 12,
  },
  verifyImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  balanceSection: {
    width: "100%",
    padding: 15,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLabel: {
    color: "white",
    fontSize: 16,
  },
  balanceActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#2a2b2d",
    padding: 8,
    borderRadius: 5,
  },
  actionButtonText: {
    color: "white",
  },
  balanceDetails: {
    marginTop: 10,
  },
  balanceAmount: {
    color: "white",
    fontSize: 12,
  },
  referralSection: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2a2b2d",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
  },
  referralContent: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  qrContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "white",
    marginRight: 20,
  },
  referralLinks: {
    flex: 1,
    width: "100%",
  },
  linkItem: {
    marginTop: 10,
  },
  linkLabel: {
    color: "white",
  },
  linkInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    borderColor: "#2a2b2d",
    borderWidth: 1,
    marginTop: 6,
  },
  linkInput: {
    flex: 1,
    color: "white",
    height: 50,
    padding: 12,
    fontSize: 13,
    width: "100%",
  },
  copyButton: {
    padding: 12,
  },
  copyText: {
    color: "#666",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  stepIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2a2b2d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  stepIconCompleted: {
    backgroundColor: "#ffc000",
  },
  stepNumber: {
    color: "white",
    fontSize: 16,
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: "#2a2b2d",
    marginRight: 10,
  },
  stepLineCompleted: {
    backgroundColor: "#ffc000",
  },
  stepTitle: {
    color: "white",
    fontSize: 16,
  },
  connectButtonCompleted: {
    backgroundColor: "#ffc000",
  },
  connectButtonTextCompleted: {
    color: "#000",
  },
});
