import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'lottery',
        loadComponent: () =>
          import('../lottery/lottery.page').then((m) => m.LotteryPage),
      },
      {
        path: 'wooden-fish',
        loadComponent: () =>
          import('../muyu/muyu.page').then((m) => m.Tab2Page),
      },
      {
        path: '',
        redirectTo: '/tabs/lottery',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/lottery',
    pathMatch: 'full',
  },
];
