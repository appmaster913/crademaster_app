import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
import TermsModal from "@/components/TermsModal";
import PrivacyModal from "@/components/PrivacyModal";

// const logoURL = require("@/assets/images/logo.png");

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [referral, setReferral] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [checkboxError, setCheckboxError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState("");
  const [warning1, setWarning1] = useState("");
  const [warning2, setWarning2] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPassword1Focused, setIsPassword1Focused] = useState(false);
  const [isPassword2Focused, setIsPassword2Focused] = useState(false);
  const [isReferralFocused, setIsReferralFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [password1Error, setPassword1Error] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const toast = useToast();
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationInputs, setVerificationInputs] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef<Array<TextInput | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Optional: Add email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(text));
  };

  const handleReferralChange = (text: string) => {
    setReferral(text);
  };

  const handleRegister = async () => {
    if (!isAgree) {
      toast.show("You must agree to the Terms of Service and Privacy Policy.", {
        type: "warning",
        placement: "top",
        duration: 4000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.crademaster.com/auth/register/",
        {
          email,
          password1,
          password2,
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        toast.show(response.data.detail, {
          type: "success",
          placement: "top",
          duration: 4000,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.email ||
        error.response?.data?.password1 ||
        error.response?.data?.password2 ||
        error.response?.data?.message ||
        "Registration failed";

      toast.show(errorMessage, {
        type: "danger",
        placement: "top",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.crademaster.com/auth/register/verify-email/",
        {
          email,
          verification_code: verificationCode,
        }
      );

      if (response.status === 200) {
        toast.show("Verification successful!", {
          type: "success",
          placement: "top",
          duration: 4000,
        });

        setTimeout(() => {
          router.replace("/(auth)/login");
        }, 2000);
      }
    } catch (error: any) {
      toast.show(error.response?.data?.message || "Verification failed", {
        type: "danger",
        placement: "top",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange1 = (index: number, value: string) => {
    const newInputs = [...verificationInputs];
    newInputs[index] = value;
    setVerificationInputs(newInputs);

    // Update verification code
    setVerificationCode(newInputs.join(""));

    // Auto-focus next input
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    // Auto-focus previous input on backspace
    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePassword1Change = (text: string) => {
    setPassword1(text);
    validatePassword(text);
    if (password2.length > 0) {
      validateConfirmPassword();
    }
  };

  const handlePassword2Change = (text: string) => {
    setPassword2(text);
    // Clear error if passwords match
    if (text === password1) {
      setPassword2Error("");
    } else if (text.length >= password1.length) {
      // Only show error if confirm password is complete and doesn't match
      setPassword2Error("Passwords do not match");
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPassword1Error("Password is required");
      return false;
    }
    if (password.length < 8) {
      setPassword1Error("Password must be at least 8 characters");
      return false;
    }
    setPassword1Error("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (!password2) {
      setPassword2Error("");
      return false;
    }
    if (password2 === password1) {
      setPassword2Error("");
      return true;
    }
    setPassword2Error("Passwords do not match");
    return false;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#181a20" }}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {/* Header Section */}
          <View style={{ padding: 20, width: "80%" }}>
            <View>
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
            </View>
          </View>

          <Text style={{ fontSize: 24, color: "white", textAlign: "center" }}>
            Welcome to CradeMaster
          </Text>

          {!success ? (
            <View style={{ padding: 20, width: "80%" }}>
              {/* Email Input */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: "white", marginBottom: 8 }}>
                  {t("Email")}
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "#1a1b1d",
                    padding: 12,
                    borderRadius: 8,
                    color: "white",
                    borderWidth: 1,
                    borderColor: emailError
                      ? "red"
                      : isEmailFocused
                      ? "#ffc000"
                      : "#2a2b2d",
                  }}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  placeholder="Email"
                  placeholderTextColor="gray"
                  onChangeText={handleEmailChange}
                />
                {isValid === false && (
                  <Text style={{ color: "red" }}>Invalid email address.</Text>
                )}
              </View>

              {/* Password Input */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: "white", marginBottom: 8 }}>
                  {t("Password")}
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "#1a1b1d",
                    padding: 12,
                    borderRadius: 8,
                    color: "white",
                    borderWidth: 1,
                    borderColor: password1Error
                      ? "red"
                      : isPassword1Focused
                      ? "#ffc000"
                      : "#2a2b2d",
                  }}
                  onFocus={() => setIsPassword1Focused(true)}
                  onBlur={() => setIsPassword1Focused(false)}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                  onChangeText={handlePassword1Change}
                />
                {password1Error && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {password1Error}
                  </Text>
                )}
              </View>

              {/* Confirm Password Input */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: "white", marginBottom: 8 }}>
                  {t("Confirm Password")}
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "#1a1b1d",
                    padding: 12,
                    borderRadius: 8,
                    color: "white",
                    borderWidth: 1,
                    borderColor: password2Error
                      ? "red"
                      : isPassword2Focused
                      ? "#ffc000"
                      : "#2a2b2d",
                  }}
                  onFocus={() => setIsPassword2Focused(true)}
                  onBlur={() => setIsPassword2Focused(false)}
                  placeholder="Confirm Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                  onChangeText={handlePassword2Change}
                />
                {password2Error && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {password2Error}
                  </Text>
                )}
              </View>

              {/* Referral ID Input */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: "white", marginBottom: 8 }}>
                  Referral ID(Optional)
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "#1a1b1d",
                    padding: 12,
                    borderRadius: 8,
                    color: "white",
                    borderWidth: 1,
                    borderColor: isReferralFocused ? "#ffc000" : "#2a2b2d",
                  }}
                  onFocus={() => setIsReferralFocused(true)}
                  onBlur={() => setIsReferralFocused(false)}
                  placeholder="Referral ID (Optional)"
                  placeholderTextColor="gray"
                  value={referral}
                  onChangeText={handleReferralChange}
                />
              </View>

              {/* Terms Checkbox */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsAgree(!isAgree);
                    if (!isAgree) setCheckboxError(null);
                  }}
                  style={{ marginRight: 10, marginTop: 4 }}
                >
                  {/* Custom Checkbox Implementation */}
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 2,
                      borderColor: "gray",
                      backgroundColor: isAgree ? "#ffc000" : "transparent",
                      borderRadius: 4,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {isAgree && <Text style={{ color: "white" }}>✓</Text>}
                  </View>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "white" }}>
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
                  {checkboxError && (
                    <Text style={{ color: "red", marginTop: 4 }}>
                      {checkboxError}
                    </Text>
                  )}
                </View>
              </View>

              {/* Warning Messages */}
              <Text style={{ color: "red", marginTop: 5 }}>{warning}</Text>
              <Text style={{ color: "red", marginTop: 5 }}>{warning1}</Text>
              <Text style={{ color: "red", marginTop: 5 }}>{warning2}</Text>

              {/* Register Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Registering..." : "Register"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Verification Section */
            <View style={{ padding: 20 }}>
              <Text
                style={{ fontSize: 24, color: "white", textAlign: "center" }}
              >
                Email Verification
              </Text>
              <Text
                style={{ color: "white", textAlign: "center", marginTop: 10 }}
              >
                Please enter the 6-digit verification code that was sent to{" "}
                {email}
              </Text>

              {/* Verification Code Input */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#1a1b1d",
                      borderRadius: 8,
                      color: "white",
                      textAlign: "center",
                      borderColor: "yellow",
                      borderWidth: 1,
                    }}
                    maxLength={1}
                    keyboardType="numeric"
                    value={verificationInputs[index]}
                    onChangeText={(value) => handleInputChange1(index, value)}
                  />
                ))}
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleVerify}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Verifying..." : "Verify Email"}
                </Text>
              </TouchableOpacity>

              {/* Resend Section */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "white" }}>didn't receive? </Text>
                <TouchableOpacity onPress={handleRegister}>
                  <Text style={{ color: "#ffc000" }}>Resend Email</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Footer */}
          {!success && (
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
                <Text style={{ color: "#ffc000", marginLeft: 10 }}>Log in</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Modals */}
          <Modal
            visible={isOpenModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsOpenModal(false)}
          >
            {/* Terms of Service Modal Content */}
          </Modal>

          <Modal
            visible={isOpenModal1}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsOpenModal1(false)}
          >
            {/* Privacy Policy Modal Content */}
          </Modal>
        </ScrollView>
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
  button: {
    backgroundColor: "#ffc000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 0,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});
