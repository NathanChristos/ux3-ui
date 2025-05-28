
export const toDateTimeInput = (dateString) => {
  const date = new Date(dateString);
  return (new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
}

export const toDateInput = (dateString) => {
  const date = new Date(dateString);
  return (new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()).slice(0, 10);
}