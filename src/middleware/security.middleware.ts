import { Injectable, NestMiddleware } from '@nestjs/common';
import helmet from 'helmet';
import * as xss from 'xss-clean';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    helmet()(req, res, () => {
      xss()(req, res, next);
    });
  }
}