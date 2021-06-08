import {User} from './user';
import {Random} from '../common/utils';
import {Files} from './files';

/**
 * 附件实体
 */
export class Attachment {
  /** id */
  id: number;

  /** 附件原始名称 */
  originName: string | undefined;

  /** 文件 */
  file: Files | null;

  /** 附件扩展名 */
  ext: string | undefined;

  /** 创建用户 */
  createUser: User | null;

  /** 被删与否 */
  deleted = false;

  /**
   * 保存到用户计算机的名称.
   */
  saveName: string;

  constructor(data = {} as {
    id?: number,
    originName?: string,
    file?: Files,
    ext?: string,
    createUser?: User
  }) {
    this.id = data.id;
    this.originName = data.originName;
    this.file = data.file ? data.file : null;
    this.ext = data.ext;
    this.createUser = data.createUser ? data.createUser : null;
  }

  static getOneAttachment(): Attachment {
    return new Attachment({
      id: Random.nextNumber(),
      originName: 'originName' + Random.nextString(),
      ext: 'ext' + Random.nextString(),
      file: Files.getOneFile()
    });
  }
}
