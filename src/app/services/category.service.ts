import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.searchServiceUrl;
  constructor(private http: HttpClient) {}

  getProductByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/${category}`);
  }

  getProductByCategoryandSubCategory(category: string, subcategory: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/${category}/${subcategory}`);
  }

}
