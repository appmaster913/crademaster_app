import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");
const isTablet = width > height;

export default function TradingViewCharts() {
  const chartConfig = [
    {
      id: 1,
      exchange: "BINANCE",
      pair: "BTCUSDT",
    },
    {
      id: 2,
      exchange: "BYBIT",
      pair: "BTCUSDT",
    },
    {
      id: 3,
      exchange: "PHEMEX",
      pair: "BTCUSDT",
    },
    {
      id: 4,
      exchange: "KUCOIN",
      pair: "BTCUSDT",
    },
  ];

  const tradingViewWidget = (
    exchange: string,
    symbol: string,
    chartStyle: number = 1
  ) => `
    <div class="tradingview-widget-container" style="height: 100%; width: 100%;">
      <div id="tradingview_${exchange}" style="height: 100%; width: 100%;"></div>
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
        new TradingView.widget({
          "width": "100%",
          "height": "100%",
          "symbol": "${exchange}:${symbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "${exchange === "KUCOIN" ? 1 : chartStyle}",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "container_id": "tradingview_${exchange}"
        });
      </script>
    </div>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.chartContainer}>
          <WebView
            source={{
              html: tradingViewWidget("BINANCE", "BTCUSDT", 1),
            }}
            style={styles.chart}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
        <View style={styles.chartContainer}>
          <WebView
            source={{
              html: tradingViewWidget("BYBIT", "BTCUSDT", 2),
            }}
            style={styles.chart}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.chartContainer}>
          <WebView
            source={{
              html: tradingViewWidget("PHEMEX", "BTCUSDT", 3),
            }}
            style={styles.chart}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
        <View style={styles.chartContainer}>
          <WebView
            source={{
              html: tradingViewWidget("KUCOIN", "BTCUSDT", 4),
            }}
            style={styles.chart}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: "#181a20",
    padding: 10,
    width: "100%",
  },
  container1: {
    flexDirection: isTablet ? "row" : "column",
    width: isTablet ? "50%" : "100%",
  },
  container2: {
    flexDirection: isTablet ? "row" : "column",
    width: isTablet ? "50%" : "100%",
  },
  chartContainer: {
    width: "100%",
    height: isTablet ? 355 : 200,
    margin: 5,
    backgroundColor: "#1a1b1d",
    // borderRadius: 10,
    overflow: "hidden",
  },
  chart: {
    flex: 1,
    backgroundColor: "#232323",
  },
});
