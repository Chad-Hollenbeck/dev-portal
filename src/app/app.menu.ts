import { appRouteNames } from './app.routes.names';

const MENU_ITEM_TYPES = {
  HEADER: 'header',
  ROUTE: 'route',
  DIVIDER: 'divider',
  SUBMENU: 'submenu'
};


export const APP_MENU = [
  { type: MENU_ITEM_TYPES.HEADER, text: 'NAVIGATION', restricted: false },

  // HOME
  { type: MENU_ITEM_TYPES.ROUTE, text: 'HOME', uri: appRouteNames.HOME, icon: 'fas fa-home', activeUriSegment: '', restricted: false },

];
