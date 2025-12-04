import axios from "axios";

import { handleApiError } from "@/lib/handleError";

interface PayloadType {
  timeId: string;
  quantity: number;
}

interface ResponseType {
  success: boolean;
  message: string;
  data: ResultType;
}

interface ResultType {
  title: string;
  date: string;
  time: string;
  quantity: string;
  pricePerTicket: number;
  subTotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

export async function calculateTotalPrice(
  payload: PayloadType
): Promise<ResponseType> {
  try {
    const res = await axios.post<ResponseType>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/calculate-total`,
      payload
    );
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}
