import { z } from "zod";

export const checkoutSchema = z.object({
  accountType: z.string().min(1, "Enter Your Account Name: Bkash, Nagad..."),
  accountNumber: z.string().min(1, "Enter Your Account Number"),
  transactionId: z.string().min(1, "Enter Your Transaction Id"),
  phone: z
    .string()
    .min(1, "Enter Your Phone Number")
    .regex(/^(\+88)?(01[3-9]\d{8})$/, "Invalid Phone Number"),
});
