import { useAuthStore } from "@/store/authStore";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Gesture,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TermsModal from "../../components/TermsModal";
import PrivacyModal from "../../components/PrivacyModal";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuthStore();
  const toast = useToast();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isWalletFocused, setIsWalletFocused] = useState(false);
  const [isAmountFocused, setIsAmountFocused] = useState(false);
  const router = useRouter();
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.crademaster.com/auth/login/",
        {
          email: username,
          password,
        }
      );

      if (response.status === 200) {
        console.log("Login successful'", response.data);
        // Save token and user info to AsyncStorage
        await Promise.all([
          AsyncStorage.setItem("userToken", response.data.access),
          AsyncStorage.setItem("userInfo", JSON.stringify(response.data.user)),
        ]);

        // Update auth store
        setToken(response.data.access);

        toast.show("Login successful!", {
          type: "success",
          placement: "top",
          duration: 2000,
        });

        // Navigate to dashboard
        router.replace("/(tabs)/dashboard");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.show(message, {
        type: "danger",
        placement: "top",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail(username);
    if (!isEmailValid) return;
    login();
    // Add your submit logic here
  };

  const handleEmailChange = (text: string) => {
    setUsername(text);
    validateEmail(text);
  };

  const inputStyle = (isFocused: boolean, error?: string) => ({
    backgroundColor: "#1a1b1d",
    padding: 12,
    borderRadius: 8,
    color: "white",
    borderWidth: 1,
    borderColor: error ? "red" : isFocused ? "#ffc000" : "#2a2b2d",
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#181a20" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
              {/* Header */}
              <View style={{ padding: 20, width: "80%", marginTop: 50 }}>
                {/* Logo Section */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/images/CM_logo.png")}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 20, color: "white" }}>
                      <Text style={{ color: "#ffc000" }}>C</Text>
                      rade
                      <Text style={{ color: "#008ad1" }}>M</Text>
                      aster
                    </Text>
                    <Text style={{ color: "#ffc000" }}>
                      AI-Auto Trading System
                    </Text>
                  </View>
                </View>

                {/* Language Selector - Consider using a modal or picker */}
                <TouchableOpacity style={{ marginTop: 0 }}>
                  {/* Add language selector implementation */}
                </TouchableOpacity>
              </View>

              {/* Main Content */}
              <View style={{ padding: 20, width: "80%" }}>
                <Text
                  style={{ fontSize: 24, color: "white", marginBottom: 20 }}
                >
                  Welcome to CradeMaster
                </Text>

                {/* Email Input */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: "white", marginBottom: 8 }}>Email</Text>
                  <TextInput
                    style={inputStyle(isEmailFocused, emailError)}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    value={username}
                    onChangeText={handleEmailChange}
                  />
                  {emailError ? (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                      {emailError}
                    </Text>
                  ) : null}
                </View>

                {/* Password Input */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ color: "white", marginBottom: 8 }}>
                    Password
                  </Text>
                  <TextInput
                    style={inputStyle(isPasswordFocused)}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    secureTextEntry
                    autoCapitalize="none"
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                {/* Terms Checkbox */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setIsAgree(!isAgree)}
                    style={{
                      width: 24,
                      height: 24,
                      borderWidth: 1,
                      borderColor: isAgree ? "#ffc000" : "#2a2b2d",
                      borderRadius: 4,
                      marginRight: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: isAgree ? "#ffc000" : "transparent",
                    }}
                  >
                    {isAgree && (
                      <Icon
                        name="check"
                        size={18}
                        color={isAgree ? "#000" : "#fff"}
                      />
                    )}
                  </TouchableOpacity>
                  <Text style={{ color: "white", flex: 1 }}>
                    By creating an account, I agree to CradeMaster's{" "}
                    <Text
                      style={{
                        color: "#3b82f6",
                        textDecorationLine: "underline",
                      }}
                      onPress={() => setIsTermsModalVisible(true)}
                    >
                      Terms of Service
                    </Text>{" "}
                    and{" "}
                    <Text
                      style={{
                        color: "#3b82f6",
                        textDecorationLine: "underline",
                      }}
                      onPress={() => setIsPrivacyModalVisible(true)}
                    >
                      Privacy Policy
                    </Text>
                  </Text>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: "#ffc000",
                    padding: 15,
                    borderRadius: 8,
                    alignItems: "center",
                  }}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    {loading ? "Loading..." : "Login"}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      router.replace("/(auth)/register");
                    }}
                  >
                    <Text style={{ color: "#ffc000", marginRight: 10 }}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ color: "white" }}>or</Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.replace("/(auth)/login");
                    }}
                  >
                    <Text style={{ color: "#ffc000", marginLeft: 10 }}>
                      Log in
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <TermsModal
        isVisible={isTermsModalVisible}
        onClose={() => setIsTermsModalVisible(false)}
      />
      <PrivacyModal
        isVisible={isPrivacyModalVisible}
        onClose={() => setIsPrivacyModalVisible(false)}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20 },
});
