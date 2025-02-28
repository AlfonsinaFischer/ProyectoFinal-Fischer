import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Output() drawerToggle = new EventEmitter<void>(); 

  authUserEmail$!: Observable<string | undefined>;

  constructor(private readonly store: Store) {
    @Component({
      selector: 'app-toolbar',
      templateUrl: './toolbar.component.html',
      styleUrl:
  }
}