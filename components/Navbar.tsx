import React from "react";
import { View, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

interface NavbarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

export default function Navbar({ toggleSidebar, isOpen }: NavbarProps) {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: "#181a20",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity onPress={toggleSidebar}>
        {isOpen ? (
          <IconSymbol name="xmark" size={24} color="#fff" />
        ) : (
          <View>
            <View
              style={{
                width: 24,
                height: 2,
                backgroundColor: "#fff",
                marginBottom: 5,
              }}
            />
            <View
              style={{
                width: 24,
                height: 2,
                backgroundColor: "#fff",
                marginBottom: 5,
              }}
            />
            <View style={{ width: 24, height: 2, backgroundColor: "#fff" }} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
