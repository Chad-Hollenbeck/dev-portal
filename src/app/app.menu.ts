import { appRouteNames } from './app.routes.names';

const MENU_ITEM_TYPES = {
  HEADER: 'header',
  ROUTE: 'route',
  DIVIDER: 'divider',
  SUBMENU: 'submenu'
}


export const APP_MENU = [
  { type: MENU_ITEM_TYPES.HEADER, text: 'NAVIGATION', restricted: false },

  // HOME
  { type: MENU_ITEM_TYPES.ROUTE, text: 'Profile', uri: appRouteNames.PROFILE, icon: 'fas fa-user-tie', activeUriSegment: '', restricted: false },


  { type: MENU_ITEM_TYPES.HEADER, text: 'PROJECTS', restricted: false },
    { type: MENU_ITEM_TYPES.ROUTE, text: 'Coming Soon', uri: '#', icon: 'fas fa-hourglass-half', activeUriSegment: '/coming-soon', restricted: false },


  { type: MENU_ITEM_TYPES.HEADER, text: 'TOOLS', restricted: false },
      { type: MENU_ITEM_TYPES.ROUTE, text: 'Coming Soon', uri: '#', icon: 'fas fa-hourglass-half', activeUriSegment: '/coming-soon', restricted: false },


  { type: MENU_ITEM_TYPES.HEADER, text: 'ADMIN', restricted: true },


  // USERS
  { type: MENU_ITEM_TYPES.ROUTE, text: 'Users', icon: 'fas fa-users', uri: appRouteNames.USERS, activeUriSegment: appRouteNames.USERS, restricted: true}
]
