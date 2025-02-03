export const MAX_REQUEST_TIMEOUT = 2 * 60 * 1000
export const DEBUG = process.env.NODE_ENV === 'development'
export const databaseErrorResponse = (message: string) => ({
  status: false,
  message: message ?? "Database connection failed",
});
