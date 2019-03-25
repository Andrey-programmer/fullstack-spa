import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemLayoutComponent } from './system-layout.component';
import { LoaderModule } from '../../components/loader/loader.module';
import { OverviewPageComponent } from 'src/app/overview-page/overview-page.component';
import { AnalyticsPageComponent } from 'src/app/analytics-page/analytics-page.component';
import { HistoryPageComponent } from 'src/app/history-page/history-page.component';
import { OrderPageComponent } from 'src/app/order-page/order-page.component';
import { CategoriesPageComponent } from 'src/app/categories-page/categories-page.component';
import { CategoriesFormComponent } from 'src/app/categories-page/categories-form/categories-form.component';
import { PositionsFormComponent } from 'src/app/categories-page/categories-form/positions-form/positions-form.component';
import { OrderCategoriesComponent } from 'src/app/order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from 'src/app/order-page/order-positions/order-positions.component';
import { HistoryListComponent } from 'src/app/history-page/history-list/history-list.component';
import { HistoryFilterComponent } from 'src/app/history-page/history-filter/history-filter.component';
import { SystemRoutingModule } from './system-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SystemLayoutComponent,
        OverviewPageComponent,
        AnalyticsPageComponent,
        HistoryPageComponent,
        OrderPageComponent,
        CategoriesPageComponent,
        CategoriesFormComponent,
        PositionsFormComponent,
        OrderCategoriesComponent,
        OrderPositionsComponent,
        HistoryListComponent,
        HistoryFilterComponent
    ],
    imports: [
        CommonModule,
        LoaderModule,
        SystemRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports : [
        SystemLayoutComponent
    ]
})

export class SystemLayoutsModule {

}