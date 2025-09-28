import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.scss']
})
export class NavigationComponent {
  @Output() sectionChange = new EventEmitter<string>();
  
  activeSection = 'upload';

  setActiveSection(section: string): void {
    this.activeSection = section;
    this.sectionChange.emit(section);
  }
}