export type MongoSessionModel = {
  _id: string;
  accountId: string;
  clientId: string;
  refreshToken: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: Date | null;
  ipAddress?: string | null;
  userAgent?: string | null;
};
