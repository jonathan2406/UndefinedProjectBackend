import * as admin from 'firebase-admin';
import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { v4 as uuidv4 } from 'uuid'; // Para generar nombres únicos

@Injectable()
export class PostService {

  constructor(
    @Inject('FIREBASE_ADMIN_TOKEN') private readonly firebaseApp: admin.app.App
  ) {}

  private firestore = this.firebaseApp.firestore();
  private postCollection = this.firestore.collection('post');
  private storage = this.firebaseApp.storage();  // Inicializa Firebase Storage

  /**
   * Crea un nuevo post con la URL del archivo (imagen) ya subida.
   * El archivo no se sube directamente desde el cliente, sino que se obtiene a través de una URL.
   */
  async createPost(createPostDto: CreatePostDto, file: Express.Multer.File) {
    const postRef = this.postCollection.doc();
    const postData = {
        ...createPostDto,
        id: postRef.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Si se proporciona un archivo, lo subimos a Firebase Storage
    if (file) {
        const mediaUrl = await this.uploadMedia(postRef.id, file);
        postData['mediaUrl'] = mediaUrl;
    }

    await postRef.set(postData);
    return { id: postRef.id, ...postData };
}
  /**
   * Sube el archivo al Storage.
   * 
   * @param postId - ID del post asociado
   * @param file - El archivo proporcionado por el cliente
   * @returns La URL pública del archivo en Firebase Storage
   */
  private async uploadMedia(postId: string, file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket(); 
    const fileName = `posts/${postId}/${uuidv4()}`; // Define la ruta en el bucket con un nombre único
    
    const storageFile = bucket.file(fileName);

    // Subir el archivo al bucket
    await new Promise((resolve, reject) => {
        const fileStream = storageFile.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
        
        fileStream.on('error', reject);
        fileStream.on('finish', resolve);
        fileStream.end(file.buffer);  // Subir desde el buffer de Multer
    });

    // Obtener la URL pública del archivo subido
    const [url] = await storageFile.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
    });

    return url;
}

  async getAllPosts() {
    const snapshot = await this.postCollection.get();
    const posts = snapshot.docs.map(doc => doc.data());
    return posts;
  }

  async getPostById(id: string) {
    const postDoc = await this.postCollection.doc(id).get();
    if (!postDoc.exists) {
      throw new Error('Post not found');
    }
    return postDoc.data();
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    const postRef = this.postCollection.doc(id);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      throw new Error('Post not found');
    }

    const updatedPostData = {
      ...updatePostDto,
      updatedAt: new Date().toISOString(),
    };

    await postRef.update(updatedPostData);

    return { id, ...updatedPostData };
  }

  async deletePost(id: string): Promise<void> {
    const postRef = this.postCollection.doc(id);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      throw new Error('Post not found');
    }

    await postRef.delete();
  }
}