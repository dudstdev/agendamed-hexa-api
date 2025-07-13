import { Document, Schema } from "mongoose";

import { MongoSessionModel } from "@/sessions/infrastructure/persistence";

export interface SessionDocument
  extends Document,
    Omit<MongoSessionModel, "_id"> {}

export const mongoSessionSchema = new Schema<SessionDocument>(
  {
    _id: {
      type: String,
      default: () => crypto.randomUUID() as string,
    },
    accountId: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    collection: "sessions",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    id: false,
  },
);

mongoSessionSchema.index(
  { accountId: 1, clientId: 1 },
  { unique: true, partialFilterExpression: { revokedAt: null } },
);

mongoSessionSchema.index({ revokedAt: 1 }, { expireAfterSeconds: 2592000 });
