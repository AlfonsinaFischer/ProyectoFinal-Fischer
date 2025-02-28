import { Component } from '@angular/core';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {
  teachers = [
    {
      name: 'Charles Xavier',
      power: 'Telepatía',
      email: 'charles@xavier.edu',
      image: 'https://upload.wikimedia.org/wikipedia/en/e/ea/Professor_X_Design.png'
    },
    {
      name: 'Logan (Wolverine)',
      power: 'Regeneración, garras de adamantium',
      email: 'logan@xavier.edu',
      image: 'https://upload.wikimedia.org/wikipedia/en/3/35/Wolverine_%28James_Howlett%29.png'
    },
    {
      name: 'Ororo Munroe (Storm)',
      power: 'Control del clima',
      email: 'storm@xavier.edu',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Storm_%28Marvel_character%29.png/250px-Storm_%28Marvel_character%29.png'
    },
    {
      name: 'Jean Grey',
      power: 'Telequinesis, Fénix',
      email: 'jean@xavier.edu',
      image: 'https://upload.wikimedia.org/wikipedia/en/3/34/JeanGreyPhoenix.png'
    }
  ];
}
