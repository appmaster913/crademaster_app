import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  TouchableOpacity,
  Easing,
} from "react-native";
import { useAuthStore } from "@/store/authStore";
import { useRouter, Href } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  console.log("isOpen", isOpen);
  const { isLoggedIn, logout } = useAuthStore();
  const router = useRouter();
  const slideAnim = new Animated.Value(-300);
  const fadeAnim = new Animated.Value(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Slide animation
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.cubic),
    }).start();

    const hanlelogout = () => {
      router.replace("/(auth)/login");
    };
    // Fade animation for backdrop
    Animated.timing(fadeAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const MenuItem = ({
    title,
    icon,
    onPress,
  }: {
    title: string;
    icon: string;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      className="flex-row items-center p-4 mb-2 rounded-xl hover:bg-gray-100 active:bg-gray-200"
    >
      {/* <IconSymbol name={icon} size={24} color="#666" /> */}
      <Text className="ml-3 text-lg font-medium text-white">{title}</Text>
    </Pressable>
  );

  return (
    <>
      {/* Animated Backdrop */}
      {isOpen && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 40,
            opacity: fadeAnim,
          }}
        >
          <TouchableOpacity
            style={{ width: "100%", height: "100%" }}
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          />
        </Animated.View>
      )}

      {/* Sidebar Content */}
      <Animated.View
        className="absolute left-0 top-0 h-full w-[280px] bg-gray-950 shadow-lg z-50"
        style={{
          transform: [{ translateX: slideAnim }],
        }}
      >
        <View className="flex-1 p-5 pt-14">
          <Text className="text-2xl font-bold mb-8 text-white">
            {t("Menu")}
          </Text>

          <MenuItem
            title={t("Home")}
            icon="house"
            onPress={() => router.push("/(tabs)/dashboard")}
          />
          <MenuItem
            title={t("My Account")}
            icon="person.fill"
            onPress={() => router.push("/(tabs)/account")}
          />
          <MenuItem
            title={t("Deposit")}
            icon="arrow.down.circle.fill"
            onPress={() => router.push("/(tabs)")}
          />
          <MenuItem
            title={t("Withdraw")}
            icon="arrow.up.circle.fill"
            onPress={() => router.push("/(tabs)/explore")}
          />

          <View className="mt-auto">
            <MenuItem
              title={t("Logout")}
              icon="arrow.right.square.fill"
              onPress={() => router.push("/(auth)/login")}
            />
          </View>
        </View>
      </Animated.View>
    </>
  );
}
