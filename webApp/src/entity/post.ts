import { Attachment } from './attachment';
import { User } from './user';
import { Menu } from './menu';
import { Authority } from './authority';

export class Post {
  id: number;

  title: string;

  content: string;

  imageUrl: string;

  type: number;

  attachments: Array<Attachment> = new Array<Attachment>();

  createUser: User;

  constructor(data = {} as {
    id?: number,
    title?: string,
    content?: string,
    imageUrl?: string;
    type?: number;
    attachments?: Array<Attachment>;
    createUser?: User;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.imageUrl = data.imageUrl;
    this.type = data.type;
    this.attachments = data.attachments;
    this.createUser = data.createUser;
  }
}
