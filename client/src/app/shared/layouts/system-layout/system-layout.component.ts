import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService, TooltipOptions } from '../../services/material.service';

@Component({
  selector: 'app-system-layout',
  templateUrl: './system-layout.component.html',
  styleUrls: ['./system-layout.component.css']
})
export class SystemLayoutComponent implements  AfterViewInit, OnDestroy {

  @ViewChild('floating') floatingRef: ElementRef
  @ViewChild('assigment_tool') assigment_Ref: ElementRef
  @ViewChild('add_category') add_category_Ref: ElementRef

  assigment_tool: TooltipOptions
  add_category: TooltipOptions

  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/analytics', name: 'Аналитика'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавление заказа'},
    {url: '/categories', name: 'Ассортимент'}
  ]
  constructor(private auth: AuthService, private router: Router) { }

  

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef)
    this.assigment_tool = MaterialService.initialTooltip(this.assigment_Ref)
    this.add_category = MaterialService.initialTooltip(this.add_category_Ref)
  }

  ngOnDestroy() {
    this.assigment_tool.destroy()
    this.add_category.destroy()
  }
 
}
