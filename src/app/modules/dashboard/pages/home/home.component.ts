import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.scss'] 
})
export class HomeComponent implements OnInit {

  title: string = "Bienvenidos a la página principal";

  constructor() {}

  ngOnInit(): void {
    console.log('HomeComponent cargado');
  }


  changeTitle(newTitle: string): void {
    this.title = newTitle;
  }
}
