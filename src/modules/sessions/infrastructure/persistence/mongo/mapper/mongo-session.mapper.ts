import { SessionEntity } from "@/sessions/core/domain";
import { MongoSessionModel } from "@/sessions/infrastructure/persistence";
import { UniqueEntityID } from "@/shared/domain";

export class MongoSessionMapper {
  static toDomain(raw: MongoSessionModel): SessionEntity {
    return SessionEntity.create(
      {
        accountId: new UniqueEntityID(raw.accountId),
        clientId: raw.clientId,
        refreshToken: raw.refreshToken,
        createdAt: raw.createdAt,
        expiresAt: raw.expiresAt,
        revokedAt: raw.revokedAt ?? undefined,
        ipAddress: raw.ipAddress ?? undefined,
        userAgent: raw.userAgent ?? undefined,
      },
      new UniqueEntityID(raw._id),
    );
  }

  static toMongo(session: SessionEntity): MongoSessionModel {
    return {
      _id: session.id.toString(),
      accountId: session.accountId.toString(),
      clientId: session.clientId,
      refreshToken: session.refreshToken,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      revokedAt: session.revokedAt ?? null,
      ipAddress: session.ipAddress ?? null,
      userAgent: session.userAgent ?? null,
    };
  }
}
