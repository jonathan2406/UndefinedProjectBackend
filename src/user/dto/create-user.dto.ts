export class CreateUserDto {
    readonly name: string;
    readonly available_lios: number;
    readonly password: string;
    readonly profile_picture_url: string;
    readonly role: string;
    readonly username: string;
    readonly bio: string;
    readonly email: string;
    readonly company: string;
}