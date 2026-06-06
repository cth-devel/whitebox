export type ServiceArea = "inside-riyadh" | "outside-riyadh";
export type DeliverySpeed = "same-day" | "next-day";

export interface RateRow {
  area: ServiceArea;
  minWeight: number; // exclusive lower bound (0 means "from 0 kg")
  maxWeight: number; // inclusive upper bound
  sameDayRate: number;
  nextDayRate: number | null; // null = not available for this zone
  deliveryNote: string;
}

export const RATE_TABLE: RateRow[] = [
  {
    area: "inside-riyadh",
    minWeight: 0,
    maxWeight: 5,
    sameDayRate: 35,
    nextDayRate: 30,
    deliveryNote: "Same / Next Day",
  },
  {
    area: "inside-riyadh",
    minWeight: 5,
    maxWeight: 15,
    sameDayRate: 40,
    nextDayRate: 35,
    deliveryNote: "Same / Next Day",
  },
  {
    area: "outside-riyadh",
    minWeight: 0,
    maxWeight: 5,
    sameDayRate: 45,
    nextDayRate: null,
    deliveryNote: "Within 2–3 Days",
  },
  {
    area: "outside-riyadh",
    minWeight: 5,
    maxWeight: 15,
    sameDayRate: 50,
    nextDayRate: null,
    deliveryNote: "Within 2–3 Days",
  },
];

export const EXTRA_KG_RATE = 4; // SAR per kg over 15 kg
export const MIN_MONTHLY_SHIPMENTS = 300; // rate valid for 300+ monthly shipments

/**
 * Returns the SAR rate for given inputs, or null if inputs are invalid.
 * For Outside Riyadh, speed is ignored (always standard 2–3 day rate).
 * For weight >15 kg, adds +4 SAR per extra kg on top of the 5–15 kg tier rate.
 */
export function calculateRate(
  area: ServiceArea,
  weight: number,
  speed: DeliverySpeed
): number | null {
  if (weight <= 0) return null;

  // Cap at 15 to find the correct tier; compute overage separately
  const baseWeight = Math.min(weight, 15);

  const row =
    RATE_TABLE.find(
      (r) =>
        r.area === area &&
        baseWeight > r.minWeight &&
        baseWeight <= r.maxWeight
    ) ??
    // Handles exactly 0 edge case by falling back to first tier
    RATE_TABLE.find((r) => r.area === area && r.minWeight === 0);

  if (!row) return null;

  const baseRate =
    speed === "next-day" && row.nextDayRate !== null
      ? row.nextDayRate
      : row.sameDayRate;

  const extraKg = Math.max(0, weight - 15);
  return baseRate + extraKg * EXTRA_KG_RATE;
}
