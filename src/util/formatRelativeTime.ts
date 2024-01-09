export function formatRelativeTime(timestamp: string): string {
  const currentDate = new Date();
  const postDate = new Date(timestamp);
  const timeDifference = currentDate.getTime() - postDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} s ago`;
  } else if (secondsDifference < 3600) {
    const minutesDifference = Math.floor(secondsDifference / 60);
    return `${minutesDifference} m ago`;
  } else if (secondsDifference < 86400) {
    const hoursDifference = Math.floor(secondsDifference / 3600);
    return `${hoursDifference} hour ago`;
  } else {
    const daysDifference = Math.floor(secondsDifference / 86400);
    return `${daysDifference} day ago`;
  }
}