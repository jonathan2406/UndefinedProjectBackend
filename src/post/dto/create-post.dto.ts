export class CreatePostDto {
  userId: string; // ID del usuario que hace el post
  content: string; // Contenido del post
  commentCount: number; // Número de comentarios
  comments: CommentDto[]; // Lista de comentarios
  likesCount: number; // Contador de "me gusta"
  }


// DTO para los comentarios dentro de un post
export class CommentDto {
  content: string; // El contenido del comentario
  authorId: string; // El ID del autor del comentario
  }
