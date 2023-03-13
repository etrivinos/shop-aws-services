export const logRequest = (event: Record<string, any>) => {
  return [
      `PATH: ${event.path}`,
      `METHOD: ${event.httpMethod}`,
      `PATH PARAMETERS: ${event.pathParameters}`
  ].join('\n');
}
