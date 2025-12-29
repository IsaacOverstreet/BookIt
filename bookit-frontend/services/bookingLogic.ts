import axios from "axios";

import { handleApiError } from "@/lib/handleError";
import {
  ApplyPromoSchema,
  ApplyPromoSchemaType,
  BookingSchema,
  BookingSchemaType,
} from "@/lib/validatorFE";
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

//apply promo function
export async function applyPromo(
  payload: ApplyPromoSchemaType
): Promise<PromoResponse> {
  try {
    const validated = ApplyPromoSchema.parse(payload);
    const res = await axios.post<PromoResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/promo/promo-code`,
      validated
    );

    const toastMessage = res.data.message;

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

interface CreateBookingResponse {
  success: boolean;
  message: string;
  data?: Promodata;
}

//create booking fucntion
export async function createBooking(
  payload: BookingSchemaType
): Promise<CreateBookingResponse> {
  try {
    const validated = BookingSchema.parse(payload);
    const res = await axios.post<CreateBookingResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/calculate-total/booking`,
      validated
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
