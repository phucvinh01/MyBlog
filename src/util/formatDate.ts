export default function formatDate(dateStr: string): string {
  // Parse the ISO 8601 string into a Date object
  const date = new Date(dateStr);

  // Get today's date in the same format for comparison
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Check if the formatted date matches today
  if (date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) === today) {
    return "Today";
  } else {
    // Format the date as desired if it's not today
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}