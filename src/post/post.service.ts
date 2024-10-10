import * as admin from 'firebase-admin';
import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {

  constructor(
    @Inject('FIREBASE_ADMIN_TOKEN') private readonly firebaseApp: admin.app.App
  ) {}

  private firestore = this.firebaseApp.firestore();
  private postCollection = this.firestore.collection('post');

  async createPost(createPostDto: CreatePostDto) {
    const postRef = this.postCollection.doc();
    const postData = {
      ...createPostDto,
      id: postRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await postRef.set(postData);
    return { id: postRef.id, ...postData };
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