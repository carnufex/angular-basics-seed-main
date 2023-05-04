import { Routes } from '@angular/router';

// containers
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';

// components
import { DonutListComponent } from './containers/donut-list/donut-list.component';

export const AdminRoutes: Routes = [
  {
    path: 'donuts',
    loadComponent: () =>
      import('./containers/donut-list/donut-list.component').then(
        (x) => x.DonutListComponent
      ),
  },
  {
    path: 'donuts/new',
    loadComponent: () =>
      import('./containers/donut-single/donut-single.component').then(
        (x) => x.DonutSingleComponent
      ),
    data: {
      isEdit: false,
    },
  },
  {
    path: 'donuts/:id',
    loadComponent: () =>
      import('./containers/donut-single/donut-single.component').then(
        (x) => x.DonutSingleComponent
      ),
    data: {
      isEdit: true,
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'donuts',
  },
];
