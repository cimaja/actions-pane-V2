import type { LucideIcon } from 'lucide-react';
import ConnectorsIcon from '../components/icons/ConnectorsIcon';
import CoreIcon from '../components/icons/CoreIcon';
import FavoritesIcon from '../components/icons/FavoritesIcon';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const mainNavItems: NavItem[] = [
  { id: 'core', label: 'Core', icon: CoreIcon },
  { id: 'connectors', label: 'Connectors', icon: ConnectorsIcon },
  { id: 'favorites', label: 'Favorites', icon: FavoritesIcon },
];