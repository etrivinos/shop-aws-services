export const validateRequest = (event) => {
  const isRequestEvent = event.type === "REQUEST";
  if(!isRequestEvent) throw new Error('Request error');
}
