import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import toastprovider, { ToastProvider } from "react-native-toast-notifications";

import * as useColorScheme from "@/hooks/useColorScheme";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "./sidebar";
import "../global.css";
import Navbar from "./Navbar";
import { usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/multiLang";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// const queryClient = new QueryClient();

// const projectId = "2129bdab09f5332e4e1a8e00bfb02baf";

// const metadata = {
//   name: "crademaster",
//   description: "crademaster",
//   url: "https://web3modal.com",
//   icons: ["https://avatars.githubusercontent.com/u/37784886"],
//   redirect: {
//     native: "YOUR_APP_SCHEME://",
//     universal: "YOUR_APP_UNIVERSAL_LINK.com",
//   },
// };

// const chains = [mainnet, polygon, arbitrum] as const;

// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// // 3. Create modal
// createWeb3Modal({
//   projectId,
//   // chains,
//   wagmiConfig,
//   enableAnalytics: true, // Optional - defaults to your Cloud configuration
// });

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();

  const colorScheme = useColorScheme.useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Get current route name
  const currentRoute = usePathname();
  const isAuthRoute =
    currentRoute?.includes("login") || currentRoute?.includes("register");

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ToastProvider>
        <I18nextProvider i18n={i18n}>
          {!isAuthRoute && (
            <>
              <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
              <Navbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
            </>
          )}
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#181a20" },
            }}
          >
            <Stack.Screen name="(tabs)" />
            {!isLoggedIn && (
              <>
                <Stack.Screen
                  name="(auth)/login"
                  options={{
                    headerShown: false,
                    animation: "fade",
                  }}
                />
                <Stack.Screen
                  name="(auth)/register"
                  options={{
                    headerShown: false,
                    animation: "fade",
                  }}
                />
              </>
            )}
          </Stack>
        </I18nextProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
