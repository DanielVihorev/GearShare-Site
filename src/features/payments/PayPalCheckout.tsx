import React, { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID as string;
const API_BASE  = import.meta.env.VITE_API_BASE_URL ?? "";

interface Props {
  partId: string;
  partName: string;
  /** Price in ILS — converted to USD at ~0.27 for PayPal */
  priceIls?: number;
  /** Price directly in USD — takes precedence over priceIls */
  amountUsd?: number;
  onSuccess: (captureId: string) => void;
  onError?: (err: unknown) => void;
}

const ILS_TO_USD = 0.27;

export const PayPalCheckout: React.FC<Props> = ({
  partId,
  partName,
  priceIls,
  amountUsd: amountUsdProp,
  onSuccess,
  onError,
}) => {
  const amountUsd = Math.max(
    0.01,
    amountUsdProp !== undefined
      ? parseFloat(amountUsdProp.toFixed(2))
      : parseFloat(((priceIls ?? 0) * ILS_TO_USD).toFixed(2)),
  );

  return (
    <PayPalScriptProvider options={{ clientId: CLIENT_ID, currency: "USD" }}>
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
        createOrder={async () => {
          const res = await fetch(`${API_BASE}/api/payments/paypal/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ partId, partName, amountUsd }),
          });
          if (!res.ok) throw new Error("Failed to create PayPal order");
          const { orderId } = await res.json();
          return orderId;
        }}
        onApprove={async (data) => {
          const res = await fetch(`${API_BASE}/api/payments/paypal/capture-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderID }),
          });
          if (!res.ok) throw new Error("Failed to capture PayPal order");
          const result = await res.json();
          onSuccess(result.captureId);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};
