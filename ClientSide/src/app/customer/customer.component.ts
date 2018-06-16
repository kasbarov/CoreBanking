import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  allCustomers:{}[];

  constructor( private  router:Router, private customerService:CustomerService) { }

  ngOnInit() {
    this.customerService.getAllCustmer().subscribe((_allCustomers)=>{
      this.allCustomers = _allCustomers;
    })
  }

  // nnavigate to create customer
  navCreateCustomer(){
    console.log('navigae to create customer')
    this.router.navigateByUrl('customer/create');
  }
}
