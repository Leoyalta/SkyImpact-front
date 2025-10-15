import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [MatCardModule, MatButtonModule, FaIconComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
faGithub = faGithub
}
