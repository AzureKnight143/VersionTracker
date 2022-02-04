import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Software } from '../models/software';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  public softwares: Software[];
  public version: string;
  public message: string;

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getSoftwareVersions(): void {
    if (this.version && this.version.match(/^(\d+\.)(\d+\.)(\d+)$/)) {
      this.message = "";
      this.http.get<Software[]>(`${this.baseUrl}software/${this.version}`).subscribe(result => {
        this.softwares = result;
      }, error => this.message = error);
    } else {
      this.softwares = [];
      this.message = "Invalid Version Number"
    }
  }
}
