export class User {
    id: string;
    name: string;
    password: string;
    profile_picture_url: string;
    role: string;
    username: string;
    bio: string;
    email: string;
    company: string;
    available_lios: number;
    lios_sent: Record<string, string>;
    lios_received: Record<string, string>;
    groups: string[];
    following: string[];
    followers: string[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
      }
}
  