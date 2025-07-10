import { randomInt } from "node:crypto";

export function generateNumericPin(length: number): string {
  const max = 10 ** length;
  const pin = randomInt(0, max).toString();
  return pin.padStart(length, "0");
}
