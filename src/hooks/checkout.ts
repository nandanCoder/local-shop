import { wixBrowserClient } from "@/lib/wix-client.browser";
import { useState } from "react";
import { useToast } from "./use-toast";
import {
  getCheckoutUrlForCurrentCart,
  getCheckoutUrlForProductCart,
  getCheckoutUrlForProductCartValues,
} from "@/wix-api/checkout";

export function useCartCheckout() {
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);

    try {
      const checkoutUrl = await getCheckoutUrlForCurrentCart(wixBrowserClient);
      window.location.href = checkoutUrl; // redirect to the wix manage url
    } catch (error) {
      setPending(false);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to load checkout. Please try again.",
      });
    }
  }

  return { startCheckoutFlow, pending };
}

export function useQuickCheckout() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow(values: getCheckoutUrlForProductCartValues) {
    setPending(true);

    try {
      const checkoutUrl = await getCheckoutUrlForProductCart(
        wixBrowserClient,
        values,
      );
      window.location.href = checkoutUrl; // redirect to the wix manage url
    } catch (error) {
      setPending(false);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to load checkout. Please try again.",
      });
    }
  }
  return { startCheckoutFlow, pending };
}
