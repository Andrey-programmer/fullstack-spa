import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { of } from 'rxjs'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { switchMap } from 'rxjs/operators'

import { CategoriesService } from 'src/app/shared/services/categories.service'
import { MaterialService } from 'src/app/shared/services/material.service'

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup
  isNew = true
  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService) { }

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
              return of(null)
            }
          }
        )
      )
      .subscribe(
        category => {
          // console.log("Category", category)
          if(category) {
            this.form.patchValue({
              name: category.name
            })
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  onSubmit() {
    
  }

}
