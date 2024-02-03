import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all?number=15`);
  }
  getFacets(searchValue?: string, categoryId?: string, subcategoryId?: string, facetCategories?: any[]): Observable<any[]> {
    let url = `${this.apiUrl}/facets?text=`;
    url = this.getUrlPostfix(url, searchValue, categoryId, subcategoryId, facetCategories);
    return this.http.get<any[]>(url);
  }
  search(searchValue?: string, category?: string, subcategoryId?: string, facetCategories?: any[]): Observable<any[]> {
    let url = `${this.apiUrl}/search?number=15&text=`;
    url = this.getUrlPostfix(url, searchValue, category, subcategoryId, facetCategories);
    return this.http.get<any[]>(url);
  }
  getProductById(productCode: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productCode}`);
  }

  autoComplete(text: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/autocomplete?number=10&text=${text}`);
  }

  getUrlPostfix(url: string, searchValue?: string, categoryId?: string, subcategoryId?: string, facetCategories?: any[]): string {
    if (searchValue !== undefined) {
      url = `${url}${searchValue}`;
    }
    if (categoryId !== undefined) {
      if (subcategoryId !== undefined && subcategoryId !== '') {
        url = `${url}&categoryPath=${categoryId}/${subcategoryId}`;
      } else {
        url = `${url}&categoryPath=${categoryId}`;
      }
    }
    if (facetCategories !== undefined && facetCategories.length > 0) {
      facetCategories.forEach(facet => {
        url = `${url}&${facet.key.toLowerCase()}=${facet.value}`;
      });
    }
    return url;
  }



}
