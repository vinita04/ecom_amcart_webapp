import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private categoryService: CategoryService, private router: Router) { }

  term = new FormControl('');
  check = new FormControl('');
  products: any[]= [];
  suggestions: string[] = [];
  facets = {};
  facetSearchList: any[] = [];
  isChecked: boolean = false;
  categoryId: string = '';
  subcategoryId: string = '';
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

    this.productService.getSearchedText().subscribe((term: string) => {
      this.searchByText(term);
    });

    this.productService.searchedText$.subscribe((term: string) => {
      this.searchByText(term);
    });
  }

  listProducts() : void {
    if (this.route.snapshot.paramMap.has('categoryId')) {
      this.categoryId = String(this.route.snapshot.paramMap.get('categoryId'));
      if (this.route.snapshot.paramMap.has('subcategoryId')) {
        this.subcategoryId = String(this.route.snapshot.paramMap.get('subcategoryId'));
        this.categoryService.getProductByCategoryandSubCategory(this.categoryId, this.subcategoryId)
        .subscribe(data => {
            this.products = data.products;
          }
        );
      } else {
        this.categoryService.getProductByCategory(this.categoryId)
        .subscribe(data => {
            this.products = data.products;
          }
        );
      }
      this.productService.getFacets('', this.categoryId, this.subcategoryId)
      .subscribe((facets: any) => {
        this.facets = facets;
      });
    } else {
      this.productService.search()
      .subscribe((data: any) => {
        this.products = data.products;
      });
      this.productService.getFacets()
      .subscribe((facets: any) => {
        this.facets = facets;
      });
    }

  }

  searchByText(searchedText: string): void {
    this.products = [];
    this.productService.search(searchedText).subscribe((data: any) => {
      this.products = data.products;
    });
    this.productService.getFacets(searchedText)
    .subscribe((facets: any) => {
      this.facets = facets;
    });
  }

  searchByFacets(key: string, value: string, event: any): void {
    this.products = [];
    this.isChecked = true;
    if (event.currentTarget.checked && (this.facetSearchList.length === 0 || !this.facetSearchList?.find(facet => facet.value === value))) {
      this.facetSearchList.push({key: key, value: value});
    } else {
      this.facetSearchList = this.facetSearchList.filter(facet => facet.value !== value);
    }
    this.productService.search('', this.categoryId, this.subcategoryId, this.facetSearchList).subscribe((data: any) => {
      this.products = data.products;
    });
    this.productService.getFacets('', this.categoryId, this.subcategoryId, this.facetSearchList)
    .subscribe((facets: any) => {
      this.facets = facets;
    });
  }

  onCheckFilterActive(name: string): boolean {
    if (this.facetSearchList.find(facet => facet.value === name)) {
      return true;
    }
    return false;
  }



  pagination(): void {
    this.productService.pagination(this.products.length);
  }
}
