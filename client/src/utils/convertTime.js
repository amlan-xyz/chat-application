export function convertTime(dateTimeString) {
  // Validate input format
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(dateTimeString)) {
    throw new Error(
      "Invalid date-time format. Please use YYYY-MM-DDTHH:mm:ss.sssZ."
    );
  }

  // Parse the dateTimeString into a JavaScript Date object
  const date = new Date(dateTimeString);

  // Get the hour in 12-hour format, minutes, day of the week, and month
  const hour = String(date.getHours() % 12 || 12).padStart(2, "0"); // Use % 12 for 12-hour format
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const monthIndex = date.getMonth(); // Zero-indexed (0 for January)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[monthIndex];

  // Determine am/pm based on original hour
  const amPm = date.getHours() >= 12 ? "PM" : "AM";

  // Check if date is today or yesterday
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
  const isYesterday =
    date.getDate() === today.getDate() - 1 &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  // Format the output string according to user-specified requirements
  let output;
  if (isToday) {
    output = `Today , ${hour}:${minutes} ${amPm}`;
  } else if (isYesterday) {
    output = `Yesterday , ${hour}:${minutes} ${amPm}`;
  } else {
    output = ` ${day} ${month},  ${hour}:${minutes} ${amPm}`;
  }

  return output;
}
