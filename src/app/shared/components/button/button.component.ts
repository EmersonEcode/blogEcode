import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() text: string = 'Clique';
  @Input() styleType: 'primary' | 'secondary' = 'primary';
  @Output() buttonClick = new EventEmitter<void>();


  onClick() {    
    this.buttonClick.emit();
  }
}
