export default function extractUsernameFromEmail(email: string) {
  const parts = email.split("@");
  return parts[0];
}