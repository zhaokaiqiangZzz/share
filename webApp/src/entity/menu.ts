import { Authority } from './authority';

export class Menu {
  id: number;
  name: string;
  router: string;
  authorityList: Array<Authority>;
  checked = false;
  selected = false;

  constructor(data = {} as {
    id?: number,
    name?: string,
    router?: string;
    authorityList?: Array<Authority>;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.router = data.router;
    this.authorityList = data.authorityList;
  }
}
