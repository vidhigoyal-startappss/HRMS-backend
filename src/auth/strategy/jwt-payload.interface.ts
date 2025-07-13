export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  customPermissions: Record<string, string[]>;
  employeeId: string;
  name?: string;
  firstName?: string;
  lastName?: string;
}
