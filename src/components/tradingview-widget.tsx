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
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const chartHeight = Math.max(500, Math.round(window.innerHeight * 0.8));

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: chartHeight,
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

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [symbol, interval, range]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{ width: "100%" }}
    />
  );
}
