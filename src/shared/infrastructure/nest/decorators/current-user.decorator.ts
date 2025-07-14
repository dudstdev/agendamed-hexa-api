import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

import { TokenPayload } from "@/sessions/infrastructure/auth";

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    return request.user as TokenPayload;
  },
);
