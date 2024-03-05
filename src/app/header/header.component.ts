import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private keycloakService: KeycloakService, private productService: ProductService,
    private router: Router) {
  }

  isLoggedIn: boolean = false;
  suggestions: string[] = [];
  userName: string = '';
  fullName: string = '';
  term = new FormControl('');
  filteredOptions: any;
  ngOnInit(): void {

    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
    this.keycloakService.isLoggedIn()
    .then(result => {
        this.isLoggedIn = result;
        if (this.isLoggedIn) {
          this.getToken();
        }
    })
    .catch( reason => console.log( reason ) );
  } else if (localStorage.getItem('userName') !== undefined && localStorage.getItem('userName') !== ''
    && localStorage.getItem('userName') !== null) {
      this.isLoggedIn = true;
      this.userName = String(localStorage.getItem('userName'));
      this.fullName = String(localStorage.getItem('fullName'));
    }
  }
  filterValues(search: string) {
    return this.suggestions.filter(value=>
    value.toLowerCase().indexOf(search.toLowerCase()) === 0);
}
  login() {
    this.keycloakService.login();
  }

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.keycloakService.logout().then(() => this.keycloakService.clearToken());
  }

  private getToken(): Promise<any> {
    return this.keycloakService.getToken()
      .then(token => {
        localStorage.setItem('token', token);
        this.userName = this.isLoggedIn ? this.keycloakService.getUsername() : '';
        this.loadProfile().then(user => {
          window.location.reload();
        });
        localStorage.setItem('userName', this.userName);
      })
      .catch(reason => console.log(reason));
  }
  private loadProfile(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.isLoggedIn) {
        this.keycloakService.loadUserProfile()
        .then(data => {
          resolve(data);
          this.fullName = data.firstName + ' ' + data.lastName;
          localStorage.setItem('fullName', this.fullName);
        })
        .catch(error => console.log(error))
      } else{
        console.log('user not logged in')
      }
  })
  }

  searchByText(searchedText: FormControl): void {
    this.router.navigate(['/category/rawQuery', searchedText.value]);
    this.term.setValue(null);
    this.suggestions = [];
  }

  onChangeHandlerAutoComplete(): void {
    const typedString = (<HTMLInputElement>document.getElementById("search_query")).value;
    this.productService.autoComplete(String(typedString)).subscribe((suggestions: any) => {
      this.suggestions = suggestions;
    });
  }

}
