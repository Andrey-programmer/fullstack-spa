import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core'

import { PositionsService } from 'src/app/shared/services/positions.service'
import { MaterialService, ModalOptions } from 'src/app/shared/services/material.service'
import { Position } from 'src/app/shared/interfaces/interfaces'
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    this.modal.open()
  }

  addPosition() {
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
      () => {
        this.modal.close()
        this.form.reset()
        this.form.enable()
      }
    )
  }

  onDeletePosition() {

  }

  ngOnDestroy() {
    this.modal.destroy()
  }

}
