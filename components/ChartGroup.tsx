import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ChartGroup() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Chart Group Component</Text>
      {/* Add actual chart implementation here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    color: "white",
  },
});
