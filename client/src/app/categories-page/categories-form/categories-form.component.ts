import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { of } from 'rxjs'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { switchMap } from 'rxjs/operators'

import { CategoriesService } from 'src/app/shared/services/categories.service'
import { MaterialService } from 'src/app/shared/services/material.service'
import { Category} from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('imageLoader') inputRef: ElementRef

  form: FormGroup
  isNew = true
  image: File
  imagePreview: any
  category: Category

  constructor(
    private route: ActivatedRoute, 
    private categoriesService: CategoriesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required )
    })
    
    this.form.disable()
   /*  this.route.params.subscribe((params: Params) => {
      if(params['id']) {
        // Редактируем форму
        this.isNew = false
      } else {
      }
    }) */

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if(params['id']) {
              this.isNew = false
              return this.categoriesService.getCategoryById(params['id'])
            } else {
              return of(null)//of  - превращает любые данные в Observable
            }
          }
        )
      )
      .subscribe(
        (category: Category) => {
          // console.log("Category", category) 
          if(category) {
            this.category = category
            this.form.patchValue({
              name: category.name
            })
            this.imagePreview = category.imageSrc 
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if(this.isNew) {
      obs$ = this.categoriesService.createCategory(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.updateCategory(this.category._id, this.form.value.name, this.image)
    }

    obs$.subscribe(
      (category: Category) => {
        this.category = category
        MaterialService.toast(this.isNew ? 'Категория добавлена':'Изменения сохранены')
        this.form.enable()
      },
      (error) => {
        MaterialService.toast(error.error.message)
      }
    )
  }

  loadImage() {
    this.inputRef.nativeElement.click()
  }

  onImageUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    // Создаем объект ридера
    const reader = new FileReader()
    
    reader.readAsDataURL(file)  //Помещаем в него файл
    // Кидаем загруженный файлы в Превьюху
    reader.onload = () => {
      this.imagePreview = reader.result
    }
 
  }

  deleteCategory() {
    //Подтверждение удаления категории
    const message = window.confirm(`Вы уверены что хотите удалить категорию ${this.category.name}?`)
    if(message) {
      this.categoriesService.deleteCategory(this.category._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        )
    }
  }

}
