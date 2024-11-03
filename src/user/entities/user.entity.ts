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
    available_rockets: number;
    rockets_sent: Record<string, string>;
    rockets_received: Record<string, string>;
    groups: string[];
    following: string[];
    followers: string[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
      }
}
  