import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";

import { SessionEntity } from "@/sessions/core/domain";
import { SessionsPortOut } from "@/sessions/core/port/out";
import {
  MongoSessionMapper,
  MongoSessionModel,
} from "@/sessions/infrastructure/persistence";
import { MongooseService } from "@/shared/infrastructure";

@Injectable()
export class MongoSessionRepository implements SessionsPortOut {
  constructor(private readonly mongooseService: MongooseService) {}

  private get model(): Model<MongoSessionModel> {
    return this.mongooseService.getModel<MongoSessionModel>("sessions");
  }

  async findById(sessionId: string): Promise<SessionEntity | null> {
    const session = await this.model.findById(sessionId).lean();

    if (!session) {
      return null;
    }

    return MongoSessionMapper.toDomain(session);
  }

  async findSessionsByAccountId(accountId: string): Promise<SessionEntity[]> {
    const sessions = await this.model.find({ accountId }).lean();

    return sessions.map((session) => MongoSessionMapper.toDomain(session));
  }

  async findByAccountIdAndClientId(
    accountId: string,
    clientId: string,
  ): Promise<SessionEntity | null> {
    const session = await this.model.findOne({
      accountId,
      clientId,
      revokedAt: null,
    });

    if (!session) return null;

    return MongoSessionMapper.toDomain(session);
  }

  async findByRefreshToken(
    refreshToken: string,
  ): Promise<SessionEntity | null> {
    const session = await this.model.findOne({ refreshToken }).lean();

    if (!session) {
      return null;
    }

    return MongoSessionMapper.toDomain(session);
  }

  async save(session: SessionEntity): Promise<void> {
    const data = MongoSessionMapper.toMongo(session);

    await this.model.updateOne({ _id: data._id }, data).exec();
  }

  async create(session: SessionEntity) {
    const data = MongoSessionMapper.toMongo(session);

    await this.model.create(data);
  }

  async revoke(sessionId: string): Promise<void> {
    await this.model
      .updateOne(
        { _id: sessionId, revokedAt: null },
        { $set: { revokedAt: new Date() } },
      )
      .exec();
  }
}
