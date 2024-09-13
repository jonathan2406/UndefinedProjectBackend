export class Admin {
  id: string;
  name: string;
  email: string;
  role: string;

  constructor(partial: Partial<Admin>) {
    Object.assign(this, partial);
  }
}
