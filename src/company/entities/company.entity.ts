export class Company {
    id: string;
    name: string;
    admin: string[];
    groups: Record<string, unknown>;
    meetings: Record<string, unknown>;
    users: Record<string, unknown>;
  
    constructor(partial: Partial<Company>) {
      Object.assign(this, partial);
    }
  }
  