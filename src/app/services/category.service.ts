import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/products';
  constructor(private http: HttpClient) {}

  getProductByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/${category}`);
  }

  getProductByCategoryandSubCategory(category: string, subcategory: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/${category}/${subcategory}`);
  }

}
