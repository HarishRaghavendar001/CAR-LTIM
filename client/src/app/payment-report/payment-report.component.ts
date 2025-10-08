import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.scss']
})
export class PaymentReportComponent implements OnInit {

  bookingList: any[] = [];
  filteredList: any[] = [];
  paginatedList: any[] = [];

  searchForm!: FormGroup;

  currentPage = 1;
  itemsPerPage = 3;
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.getPaymentReport();
  }

  getPaymentReport() {
    this.httpService.paymentReport().subscribe((data: any) => {
      this.bookingList = data;
      this.filteredList = [...this.bookingList];
      this.updatePagination();
    });
  }

  filterPayments() {
    const query = this.searchForm.get('search')?.value?.trim().toLowerCase();
    if (!query) {
      this.filteredList = [...this.bookingList];
    } else {
      this.filteredList = this.bookingList.filter(val => {
        const username = val.booking?.user?.username?.toLowerCase() || '';
        const id = val.id?.toString() || '';
        return username.includes(query) || id.includes(query);
      });
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  clearSearch() {
    this.searchForm.reset();
    this.filteredList = [...this.bookingList];
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredList.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginatedList = this.filteredList.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
}




