import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  itemForm: FormGroup;
  categories: any[] = [];
 
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
     
    });
  }
 
  ngOnInit(): void {
    this.loadCategories();
  }
 
  loadCategories(): void {
    this.httpService.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }
 
  onSubmit(): void {
    if (this.itemForm.valid) {
      const formData = this.itemForm.value;
      this.httpService.createCategory(formData).subscribe(response => {
        console.log('Category created:', response);
        this.loadCategories(); // Refresh list
      });
    }
  }
 
  onUpdate(categoryId: number): void {
    if (this.itemForm.valid) {
      const formData = this.itemForm.value;
      this.httpService.updateCategory(formData, categoryId).subscribe(response => {
        console.log('Category updated:', response);
        this.loadCategories(); // Refresh list
      });
    }
  }
}
