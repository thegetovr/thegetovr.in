export function formatDate(date: Date | string): string {
  const target = new Date(date);

  if (isNaN(target.getTime())) {
    return "Invalid date";
  }

  return target.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
export function formatDateTime(date: Date | string): string {
  const target = new Date(date);

  if (isNaN(target.getTime())) {
    return "Invalid date";
  }

  return target.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const target = new Date(date);
  if (isNaN(target.getTime())) {
  return "Invalid date";
}

  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays === 1) {
    return "Yesterday";
  }

  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  return formatDate(target);
}
