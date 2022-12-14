import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable } from '@nestjs/common';


@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'refresh-secret-test',
            passReqToCallback: true
        })
    }

    /**
     * @todo: Add validation.
     */
    validate(req: Request, payload: any) {
        const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken
        }
    }
}