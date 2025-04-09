export function calculateRemainingTime(availability: number, elapsed: number) {
  const totalDurationInSeconds = availability * 3600;
  const remainingTimeInSeconds = totalDurationInSeconds - elapsed;
  const remainingSeconds = Math.round(remainingTimeInSeconds);
  return remainingSeconds;
} 