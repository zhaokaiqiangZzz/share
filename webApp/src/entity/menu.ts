import { Authority } from './authority';

export class Menu {
  id: number;
  name: string;
  router: string;
  authority: Array<Authority>;
  checked: boolean;
  selected: boolean;
}
