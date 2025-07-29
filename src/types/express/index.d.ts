// src/types/express/index.d.ts

import { UserDocument } from '../../models/users.model';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument | null;
    }
  }
}

// This is needed to make the file a module
export {};
