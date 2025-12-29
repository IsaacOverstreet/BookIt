import CheckOutForm from "@/components/checkOutForm";

interface CheckoutProps {
  searchParams: { total?: string };
}
export interface CheckoutTotalType {
  title: string;
  date: string; // ISO date string
  time: string; // "HH:MM"
  quantity: number;
  pricePerTicket: number;
  subTotal: number;
  taxRatePercent: number;
  taxAmount: number;
  total: number;
  timeId: string;
}

export default async function Details({ searchParams }: CheckoutProps) {
  const { total } = await searchParams;

  if (!total) {
    return <div>No data provided</div>;
  }

  const decoded = decodeURIComponent(total);

  const data: CheckoutTotalType = JSON.parse(decoded);

  return <CheckOutForm checkoutTotal={data} />;
}
