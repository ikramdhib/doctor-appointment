import { Component, inject, Input } from '@angular/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  @Input() title: string = '';
  @Input() description: string = 'Lorem ipsum dolor sit amet, consecte tur adipiscing elit aliquet iTristique id nibh lobortis nunc';

}
