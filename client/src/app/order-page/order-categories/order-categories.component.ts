import {
  Component,
  OnInit
} from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-order-categories',
       templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  constructor(private categoriesServices: CategoriesService) {
  }

  categories$: Observable<Category[]>

  ngOnInit() {
    this.categories$ = this.categoriesServices.getAllCategories()
  }

}
