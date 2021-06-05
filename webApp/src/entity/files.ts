import {Random} from '../common/utils';

export class Files {
  id: number | undefined;

  sha1: string | undefined;

  md5: string | undefined;

  /** 文件存储路径 */
  path: string | undefined;

  /** 文件存储名称 */
  name: string | undefined;

  /** 文件被引用次数 */
  quoteNumber: number | undefined;

  constructor(data = {} as {
    id?: number,
    sha1?: string,
    md5?: string,
    path?: string,
    name?: string,
    quoteNumber?: number
  }) {
    this.id = data.id;
    this.sha1 = data.sha1;
    this.md5 = data.md5;
    this.path = data.path;
    this.name = data.name;
    this.quoteNumber = data.quoteNumber;
  }


  static getOneFile(): Files {
    return new Files({
      id: Random.nextNumber(),
      path: 'path' + Random.nextString(),
      name: 'name' + Random.nextString(),
      sha1: 'sha1' + Random.nextString(),
      md5: 'md5' + Random.nextString(),
      quoteNumber: Random.nextNumber(4),
    });
  }
}
