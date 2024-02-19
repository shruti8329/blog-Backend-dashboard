import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-blog-dashboard';
}
