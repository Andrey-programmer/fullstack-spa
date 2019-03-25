import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth.guard';
import { SystemLayoutComponent } from './system-layout.component';
import { OverviewPageComponent } from 'src/app/overview-page/overview-page.component';
import { AnalyticsPageComponent } from 'src/app/analytics-page/analytics-page.component';
import { HistoryPageComponent } from 'src/app/history-page/history-page.component';
import { OrderPageComponent } from 'src/app/order-page/order-page.component';
import { OrderCategoriesComponent } from 'src/app/order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from 'src/app/order-page/order-positions/order-positions.component';
import { CategoriesPageComponent } from 'src/app/categories-page/categories-page.component';
import { CategoriesFormComponent } from 'src/app/categories-page/categories-form/categories-form.component';

const systemRoutes: Routes = [
    {
        path: '', component: SystemLayoutComponent, canActivate: [AuthGuard], children: [
          {path: 'overview', component: OverviewPageComponent},
          {path: 'analytics', component: AnalyticsPageComponent},
          {path: 'history', component: HistoryPageComponent},
          {path: 'order', component: OrderPageComponent, children: [
            {path: '', component: OrderCategoriesComponent},
            {path: ':id', component: OrderPositionsComponent}
          ]},
          {path: 'categories', component: CategoriesPageComponent},
          {path: 'categories/new', component: CategoriesFormComponent},
          {path: 'categories/:id', component: CategoriesFormComponent},
        ]
      }
]

@NgModule({
    imports: [RouterModule.forChild(systemRoutes)],
    exports: [RouterModule]
})

export class SystemRoutingModule {
    
}