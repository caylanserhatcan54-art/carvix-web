import { Suspense } from "react";
import PaymentClient from "./PaymentClient";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Yükleniyor...</div>}>
      <PaymentClient />
    </Suspense>
  );
}
