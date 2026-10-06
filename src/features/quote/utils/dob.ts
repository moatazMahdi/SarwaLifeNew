export type DobParts = { day: number | null; month: number | null; year: number | null };

export const EMPTY_DOB: DobParts = { day: null, month: null, year: null };

const pad = (n: number) => String(n).padStart(2, '0');

export function dobToString(d: DobParts): string {
  if (!d.day || !d.month || !d.year) return '';
  return `${pad(d.day)}/${pad(d.month)}/${d.year}`;
}

function daysInMonth(month: number | null, year: number | null) {
  if (!month) return 31;
  return new Date(year ?? 2000, month, 0).getDate();
}

const EASTERN_DIGITS = '٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹';

function toWesternDigits(s: string): string {
  return s.replace(/[٠-٩۰-۹]/g, (d) =>
    String(EASTERN_DIGITS.indexOf(d) % 10),
  );
}

export function digitsOf(text: string): string {
  return toWesternDigits(text).replace(/\D/g, '').slice(0, 8);
}

export function withSlashes(d: string): string {
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

export function partsOf(d: string): DobParts {
  return {
    day: d.length >= 2 ? Number(d.slice(0, 2)) || null : null,
    month: d.length >= 4 ? Number(d.slice(2, 4)) || null : null,
    year: d.length === 8 ? Number(d.slice(4)) || null : null,
  };
}

export function isRealDate({ day, month, year }: DobParts): boolean {
  if (!day || !month || !year) return false;
  if (month > 12 || day > daysInMonth(month, year)) return false;
  const thisYear = new Date().getFullYear();
  return year > thisYear - 110 && year <= thisYear;
}
