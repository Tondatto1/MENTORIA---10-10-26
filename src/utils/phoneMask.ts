/**
 * Formats digits into Brazilian phone mask (DD) 9XXXX-XXXX or (DD) XXXX-XXXX.
 * Also handles international numbers if user starts with '+'.
 */
export function formatPhoneNumber(value: string): string {
  if (!value) return '';

  // If user enters an international number starting with '+'
  if (value.startsWith('+')) {
    return '+' + value.slice(1).replace(/[^\d\s-]/g, '').slice(0, 18);
  }

  // Remove non-numeric characters
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  if (phone.startsWith('+')) {
    return phone.replace(/\D/g, '').length >= 10;
  }
  const digits = phone.replace(/\D/g, '');
  // Brazilian phone has 10 or 11 digits (with DDD)
  return digits.length === 10 || digits.length === 11;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}
