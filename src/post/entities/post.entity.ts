import {User} from "../../user/entities/user.entity"

export class Comment {
    content: string; // El contenido del comentario
    author: User; // Referencia al usuario que hizo el comentario

    constructor(partial: Partial<Comment>) {
        Object.assign(this, partial);
    }
}

export class Post {
    id: string; // ID del post
    userId: string; // ID del usuario que posteo
    content: string; // Contenido 
    mediaUrl: string | null; // URL opcional para la media asociada al post 
    commentCount: number; // Contador de comentarios
    comments: Comment[]; // Lista de comentarios, cada uno con contenido y autor
    likesCount: number; // Contador de "me gusta"
    createdAt: Date; // Fecha de creación del post

    constructor(partial: Partial<Post>) {
        Object.assign(this, partial);
    }
}
