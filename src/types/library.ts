import type { ActionModule } from '../data/actions';

export interface ModuleWithCategory extends ActionModule {
  categoryName: string;
}