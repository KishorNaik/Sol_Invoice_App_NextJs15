import { stripeConfig } from "@/config/env";
import Stripe from "stripe";

export const stripePaymentObject = new Stripe(stripeConfig.secretKey as string);
