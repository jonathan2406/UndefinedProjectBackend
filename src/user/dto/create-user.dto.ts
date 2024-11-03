export class CreateUserDto {
    readonly available_rockets: number;
    readonly bio: string;
    readonly company: string;
    readonly email: string;
    readonly name: string;
    readonly password: string;
    readonly profile_picture_url: string;
    readonly role: string;
    readonly username: string;
}