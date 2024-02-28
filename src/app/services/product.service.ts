import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.searchServiceUrl;
  productList: any[] = [];
  facetList: any[] = [];
  searchedText$ = new Subject<string>();
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?number=12`);
  }

  getFacets(searchValue?: string, categoryId?: string, subcategoryId?: string, facetCategories?: any[]): Observable<any[]> {
    let url = `${this.apiUrl}/facets?text=`;
    url = this.getUrlPostfix(url, searchValue, categoryId, subcategoryId, facetCategories);
    return this.http.get<any[]>(url);
  }

  search(searchValue?: string, category?: string, subcategoryId?: string, facetCategories?: any[]): Observable<any[]> {
    let url = `${this.apiUrl}/search?number=12&text=`;
    url = this.getUrlPostfix(url, searchValue, category, subcategoryId, facetCategories);
    return this.http.get<any[]>(url);
  }

  getProductById(productCode: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productCode}`);
  }

  autoComplete(text: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/autocomplete?number=12&text=${text}`);
  }

  pagination(fromWhere: number, text?: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?number=12&text=${text}&from=${fromWhere}`);
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

  setProductList(productList: any[]): void {
    this.productList = productList;
  }

  getProductList(): any[] {
    return this.productList;
  }

  setFacetList(facetList: any[]): void {
    this.facetList = facetList;
  }

  getSearchedText(): Observable<string> {
    return this.searchedText$;
  }

}
