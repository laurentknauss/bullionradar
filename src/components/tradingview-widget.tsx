"use client";

import { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  symbol: string; // XAUEUR, XAGEUR
  interval?: string; // D, W, M
  range?: string; // 1D, 1W, 1M, 6M, 12M, 60M, 120M, ALL
}

export function TradingViewWidget({
  symbol,
  interval = "D",
  range,
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `OANDA:${symbol}`,
      interval: interval,
      timezone: "Europe/Paris",
      theme: "dark",
      style: "1",
      locale: "fr",
      backgroundColor: "rgba(26, 26, 26, 1)",
      gridColor: "rgba(64, 64, 64, 0.3)",
      hide_top_toolbar: true,
      hide_legend: false,
      hide_volume: true,
      save_image: false,
      calendar: false,
      studies: [],
      support_host: "https://www.tradingview.com",
      ...(range && { range }),
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, interval, range]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{ height: "80vh", minHeight: "500px", width: "100%" }}
    />
  );
}
