import "server-only";

const ADMIN_EMAILS = [
  "admin@thegetovr.in",
  "Shivdeepraina@gmail.com",
  "Dikshitmishra1@gmail.com",

  // Add more admin emails here when needed
  // "another-admin@example.com",
];

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}
