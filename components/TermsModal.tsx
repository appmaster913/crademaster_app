import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import ServiceTerms from "./TermsService";
import Icon from "react-native-vector-icons/MaterialIcons";

interface TermsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Terms of Service</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="cancel" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <ServiceTerms />
          </View>

          <TouchableOpacity style={styles.finishButton} onPress={onClose}>
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.7,
    backgroundColor: "#181a20",
    borderRadius: 16,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
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
    padding: 4,
  },
  contentContainer: {
    flex: 1,
  },
  finishButton: {
    marginTop: 16,
    padding: 8,
    alignItems: "flex-end",
  },
  finishButtonText: {
    fontSize: 16,
    color: "#E5E7EB",
  },
});

export default TermsModal;
