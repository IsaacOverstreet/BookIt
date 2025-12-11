import axios from "axios";

import { handleApiError } from "@/lib/handleError";
import { ApplyPromoSchema } from "@/lib/validatorFE";
import { toast } from "react-toastify";

interface PayloadType {
  timeId: string;
  quantity: number;
}

interface ResponseType {
  success: boolean;
  message: string;
  data?: ResultType;
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
    const message = handleApiError(error);
    return {
      success: false,
      message,
    };
  }
}

interface PromoPayLoadType {
  timeId: string;
  quantity: number;
  promo?: string;
}

interface PromoResponse {
  success: boolean;
  message: string;
  data?: Promodata;
}
interface Promodata {
  discount: number;
  discountRate: number;
  discountTotal: number;
  discountedSubtotal: number;
  taxAmount: number;
  taxRate: number;
}

export async function applyPromo(
  payload: PromoPayLoadType
): Promise<PromoResponse> {
  try {
    console.log(payload);
    const validated = ApplyPromoSchema.parse(payload);
    const res = await axios.post<PromoResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/promo/promo-code`,
      validated
    );
    console.log("🚀 ~ res:", res.data);
    const toastMessage = res.data.message;
    console.log("🚀 ~ toastMessage:", toastMessage);
    toast.success(toastMessage);
    return res.data;
  } catch (error) {
    const message = handleApiError(error);
    return {
      success: false,
      message,
    };
  }
}
