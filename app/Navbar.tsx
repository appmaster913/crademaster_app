import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { usePathname } from "expo-router";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

const langList = [
  { code: "cn", label: "CN" },
  { code: "en", label: "EN" },
  { code: "kn", label: "KO" },
  // { code: "ru", label: "RU" },
];

export default function Navbar({ toggleSidebar, isOpen }: NavbarProps) {
  const { i18n } = useTranslation();
  const currentRoute = usePathname();
  const isAuthRoute = currentRoute?.startsWith("/(auth)/");

  const handleLanguageChange = () => {
    const currentIndex = langList.findIndex(
      (lang) => lang.code === i18n.language
    );
    const nextIndex = (currentIndex + 1) % langList.length;
    const newLang = langList[nextIndex];
    i18n.changeLanguage(newLang.code);
  };

  const currentLang =
    langList.find((lang) => lang.code === i18n.language) || langList[0];

  if (isAuthRoute) {
    return null;
  }

  return (
    <View
      style={{
        height: 60,
        backgroundColor: "#181a20",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "space-between",
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

      <TouchableOpacity
        style={{
          backgroundColor: "#2c2f38",
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 4,
        }}
        onPress={handleLanguageChange}
      >
        <Text style={{ color: "#fff", fontSize: 14 }}>{currentLang.label}</Text>
      </TouchableOpacity>
    </View>
  );
}
