import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo/vector-icons
import Privacy from "./PrivacyPolicy";

interface PrivacyModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Privacy Policy</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close-circle-outline" size={28} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <Privacy />

          {/* Footer */}
          <TouchableOpacity style={styles.finishButton} onPress={onClose}>
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#181a20",
    borderRadius: 16,
    padding: 20,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.8,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    padding: 5,
  },
  finishButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
  },
  finishButtonText: {
    color: "#9ca3af",
    fontSize: 14,
  },
});

export default PrivacyModal;
