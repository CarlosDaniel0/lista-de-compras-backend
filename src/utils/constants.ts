export const databaseErrorResponse = (message: string) => ({
  status: false,
  message: message ?? "Database connection failed",
});
