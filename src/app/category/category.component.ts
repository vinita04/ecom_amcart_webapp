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
    private categoryService: CategoryService) {
    }

  term = new FormControl('');
  check = new FormControl('');
  products: any[]= [];
  suggestions: string[] = [];
  facets = {};
  facetSearchList: any[] = [];
  isChecked: boolean = false;
  categoryId: string = '';
  subcategoryId: string = '';
  totalProducts: number;
  numOfPages: number;
  activePage: number = 1;
  startingIndex: number;
  endIndex: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() : void {
    if (this.route.snapshot.paramMap.has('rawQuery')) {
      this.searchByText(String(this.route.snapshot.paramMap.get('rawQuery')));
    } else if (this.route.snapshot.paramMap.has('categoryId')) {
      this.categoryId = String(this.route.snapshot.paramMap.get('categoryId'));
      if (this.route.snapshot.paramMap.has('subcategoryId')) {
        this.subcategoryId = String(this.route.snapshot.paramMap.get('subcategoryId'));
        this.categoryService.getProductByCategoryandSubCategory(this.categoryId, this.subcategoryId)
        .subscribe(data => {
          this.populateData(data);
        });
      } else {
        this.categoryService.getProductByCategory(this.categoryId)
        .subscribe(data => {
          this.populateData(data);
        });
      }
      this.productService.getFacets('', this.categoryId, this.subcategoryId)
      .subscribe((facets: any) => {
        this.facets = facets;
      });
    } else {
      this.productService.search()
      .subscribe((data: any) => {
        this.populateData(data);
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
      this.populateData(data);
    });
    this.productService.getFacets(searchedText)
    .subscribe((facets: any) => {
      this.facets = facets;
    });
  }

  searchByFacets(key: string, value: string, event: any): void {
    this.products = [];
    this.isChecked = true;
    this.activePage = 1;
    if (event.currentTarget.checked && (this.facetSearchList.length === 0 || !this.facetSearchList?.find(facet => facet.value === value))) {
      this.facetSearchList.push({key: key, value: value});
    } else {
      this.facetSearchList = this.facetSearchList.filter(facet => facet.value !== value);
    }
    this.productService.search('', this.categoryId, this.subcategoryId, this.facetSearchList).subscribe((data: any) => {
      this.populateData(data);
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

  pagination(event): void {
    const searchedString = this.route.snapshot.paramMap.has('rawQuery') ? this.route.snapshot.paramMap.get('rawQuery') : "";
    this.productService.pagination(Number((event.target.innerText-1)*12), searchedString)
    .subscribe((data: any) => {
      this.activePage = event.target.innerText;
      this.populateData(data);
    });
    this.productService.pagination(Number((event.target.innerText-1)*12), searchedString)
    .subscribe((data: any) => {
      this.activePage = event.target.innerText;
      this.populateData(data);
    });
  }

  populateData(data: any) {
    this.startingIndex = 1;
    this.products = data.products;
    this.totalProducts = data.total;
    this.endIndex = this.endIndex >= data.total || data.total < 12 ? data.total : 12*this.activePage
    this.startingIndex = this.activePage == 1 ? 1 : (this.activePage-1)*12;
    this.numOfPages = Math.ceil(this.totalProducts/12);
  }
}
