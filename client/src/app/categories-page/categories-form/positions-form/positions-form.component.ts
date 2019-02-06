import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { PositionsService } from 'src/app/shared/services/positions.service'
import { MaterialService, ModalOptions } from 'src/app/shared/services/material.service'
import { Position } from 'src/app/shared/interfaces/interfaces'

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef

  positions: Position[] = []
  loading = false
  modal: ModalOptions
  form: FormGroup
  positionId = null

  constructor(private positionService: PositionsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    })

    this.loading = true
    this.positionService.getAllPositions(this.categoryId)
    .subscribe(
      (positions) => {
        this.positions = positions
        this.loading = false
      },
      (error) => {
        MaterialService.toast(error.error.message)
      }
    )
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  addPosition() {
    this.positionId = null
    this.form.reset()
    this.modal.open()
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

     const completed = () => {
      this.modal.close()
      this.form.reset()
      this.form.enable()
    }

    if(this.positionId) {
      
      newPosition._id = this.positionId
      this.positionService.updatePosition(newPosition)
      .subscribe(
        position => {
          const index = this.positions.findIndex(pos => pos._id === position._id)
          this.positions[index] = position
          console.log(this.positions[index])
          console.log(position)
          MaterialService.toast('Изменения сохранены')
        },
        error => {
          MaterialService.toast(error.error.message)
        },
        completed
      )

    } else {

      this.positionService.createPosition(newPosition)
      .subscribe(
        position => {
          MaterialService.toast('Позиция создана')
          this.positions.push(position)
        },
        error => {
          this.form.enable()
            MaterialService.toast(error.error.message)
        },
        completed
      )
    }
  }

  onDeletePosition(event: any, position: Position) {
    event.stopPropagation()
    const message = window.confirm(`Удалить позицию "${position.name}"?`)

    if(message) {
      this.positionService.deletePosition(position)
      .subscribe(
        (response) => {
          const index = this.positions.findIndex(pos => pos._id === position._id)
          this.positions.splice(index, 1)
          MaterialService.toast(response.message)
        },
        (error) => {
          MaterialService.toast(error.error.message)
        }
      )
    }
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

}
