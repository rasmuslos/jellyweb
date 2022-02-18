import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '$lib/helper/env';
import type { Session } from '$lib/typings';

export const sign = (session: Session): string => jwt.sign(session, JWT_SECRET);
export const verify = (token: string): JwtPayload & Session => jwt.verify(token, JWT_SECRET) as any;