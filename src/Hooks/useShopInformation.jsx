import { useQuery } from "@tanstack/react-query";
import { getDetails } from "../Services/Api";

const DEFAULT_SHOP_INFO = {
  copy_right: "",
  facebook_link: "",
  twitter_link: "",
  instagram_link: "",
  about_us: "",
  our_story: "",
  privacy_policy: "",
  terms_of_service: "",
};

const SHOP_INFO_ROUTES = [
  "/admin/shop-information",
  "/shop-information",
  "/user/shop-information",
];

const normalizeShopInformation = (response) => {
  const payload =
    response?.data?.shopInformation || response?.data || response || {};

  return {
    ...DEFAULT_SHOP_INFO,
    ...payload,
  };
};

const fetchShopInformation = async () => {
  let lastError;

  for (const route of SHOP_INFO_ROUTES) {
    try {
      const response = await getDetails(route);
      return normalizeShopInformation(response);
    } catch (errorResponse) {
      lastError = errorResponse;

      const statusCode = errorResponse?.status;
      if (statusCode && statusCode >= 500) {
        throw new Error("Unable to load shop information right now.");
      }
    }
  }

  throw new Error(
    lastError?.data?.message || "Shop information is not available yet."
  );
};

export const useShopInformation = () => {
  return useQuery({
    queryKey: ["shop-information"],
    queryFn: fetchShopInformation,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
  });
};
