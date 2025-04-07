const formatTime = (ISODate: string): string => {
  const date = new Date(ISODate);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default formatTime;
