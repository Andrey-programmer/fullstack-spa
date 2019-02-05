import { Component, OnInit } from '@angular/core'
import { CategoriesService } from '../shared/services/categories.service'
import { Category } from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  loading = false
  categories: Category[] = []

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.loading = true

    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categories = categories
      this.loading = false
    })
  }

}
