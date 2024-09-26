export class Admin {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(partial: Partial<Admin>) {
    Object.assign(this, partial);
  }
}
