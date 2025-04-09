import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LogoComponent from "../../components/LogoComponent";
import StateInfo from "../../components/StateInfo";
import BalanceTable from "../../components/BalanceTable";
import AiTable from "../../components/AiTable";
import SignalTable from "../../components/SignalTable";
import AnalysisTable from "../../components/AnalysisTable";
import ChartGroup from "../../components/ChartGroup";
import StatusTable from "../../components/StatusTable";
import TradingViewCharts from "@/components/TradingViewCharts";

const { width, height } = Dimensions.get("window");
const isTablet = width > height;

export default function DashboardScreen() {
  const [signal, setSignal] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <LogoComponent />
            </View>
            <View style={styles.stateInfo}>
              <StateInfo setSignal={setSignal} signal={signal} />
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.main}>
            {/* Side Info */}
            <View style={styles.addInfo}>
              <View style={styles.balAi}>
                <BalanceTable signal={signal} />
                <AiTable signal={signal} />
              </View>
              <View style={styles.signAnal}>
                <SignalTable />
                <View style={styles.analRoi}>
                  <AnalysisTable />
                </View>
              </View>
            </View>

            {/* Main Info */}
            <View style={styles.mainInfo}>
              <View style={styles.chartsSection}>
                <TradingViewCharts />
              </View>
              <StatusTable />
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
    backgroundColor: "black",
    padding: 10,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: isTablet ? "row" : "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  logo: {
    flex: 3,
    marginRight: 5,
    width: "100%",
  },
  stateInfo: {
    flex: 1,
    width: "100%",
  },
  main: {
    flexDirection: isTablet ? "row" : "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  addInfo: {
    width: "50%",
    marginRight: 20,
    marginTop: isTablet ? 28 : 0,
    flexDirection: "column",
    // alignItems: "flex-start",
    flex: 1,
    // width: "100%",
  },
  balAi: {
    flexDirection: isTablet ? "column" : "row",
    width: "100%",
    justifyContent: isTablet ? "flex-start" : "space-between",
    alignItems: "flex-start",
    gap: 20,
    flex: isTablet ? 0 : 1,
  },
  signAnal: {
    flexDirection: isTablet ? "column" : "row",
    width: "100%",
    justifyContent: isTablet ? "flex-start" : "space-between",
    alignItems: "flex-start",
    gap: 20,
    marginTop: 20,
    flex: 1,
  },
  analRoi: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: isTablet ? "100%" : "90%",
  },
  mainInfo: {
    flex: 4,
    marginTop: 5,
    width: "100%",
  },
  balanceTable: {
    flex: 1,
    minHeight: 150,
    maxHeight: 300,
    marginBottom: 20,
    width: "100%",
    overflow: "scroll",
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    padding: 15,
  },
  aiTable: {
    flex: 1,
    minHeight: 150,
    maxHeight: 300,
    marginBottom: 20,
    width: "100%",
    overflow: "scroll",
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    padding: 15,
  },
  signalTable: {
    flex: 1,
    minHeight: 150,
    maxHeight: 300,
    marginBottom: 20,
    width: "100%",
    overflow: "scroll",
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    padding: 15,
  },
  analysisTable: {
    flex: 1,
    minHeight: 150,
    maxHeight: 300,
    marginBottom: 20,
    width: "100%",
    overflow: "scroll",
    backgroundColor: "#1a1b1d",
    borderRadius: 10,
    padding: 15,
  },
  tableHeader: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableContent: {
    color: "white",
  },
  chartsSection: {
    flex: 1,
    marginTop: 20,
    width: "100%",
  },
});
