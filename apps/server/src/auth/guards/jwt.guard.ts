import { AuthenticationError } from '@nestjs/apollo';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest<any>(context);
    const res = this.getResponse<any>(context);

    // const req = this.getRequest<IncomingMessage & { user?: User }>(context);
    const checkJwt = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://sarasate.eu.auth0.com/.well-known/jwks.json',
        }) as GetVerificationKey,
        audience: 'actions',
        algorithms: ['RS256'],
        issuer: 'https://sarasate.eu.auth0.com/',
      }),
    );

    try {
      await checkJwt(req, res);
      req.user = req.auth;
      return true;
    } catch (error) {
      throw new AuthenticationError('not authorized', error);
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getResponse<T>(context: ExecutionContext): T {
    return context.switchToHttp().getResponse();
  }

  protected getToken(request: {
    headers: Record<string, string | string[]>;
  }): string {
    const authorization = request.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new Error('Invalid Authorization Header');
    }
    const [_, token] = authorization.split(' ');
    return token;
  }
}
