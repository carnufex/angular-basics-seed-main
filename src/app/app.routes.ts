import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { DonutService } from './admin/service/donut.service';

export const AppRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((x) => x.AdminRoutes),
    providers: [importProvidersFrom(HttpClientModule), DonutService],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin/donuts',
  },
  {
    path: '**',
    redirectTo: 'admin',
  },
];
