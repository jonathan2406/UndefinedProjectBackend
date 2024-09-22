export class CreateUserDto {
    readonly name: string;
    readonly password: string;
    readonly profile_picture_url: string;
    readonly role: string;
    readonly username: string;
    readonly bio: string;
    readonly email: string;
    readonly company: string;
    readonly available_lios: number;
    readonly lios_sent: Record<string, string>;
    readonly lios_received: Record<string, string>;
    readonly groups: string[];
    readonly followers: string[];
    readonly following: string[];

}
  