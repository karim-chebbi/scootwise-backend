import pricing from "../config/pricing.js";

export const calculateRideCost = (start, end) => {
  const minutes = Math.ceil((end - start) / 60000);

  return Number(
    (pricing.unlockFee + minutes * pricing.pricePerMinute).toFixed(2),
  );
};
