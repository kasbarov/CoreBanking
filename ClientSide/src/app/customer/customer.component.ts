import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from './customer.service';
import { NotifierService } from '../util/notifier.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  showSuccessMsg: boolean = false;
  allCustomers: {}[];

  constructor(private router: Router, private customerService: CustomerService, private route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      console.log(params);
      if (params['showMsg'])
        this.showSuccessMsg = true;
    });

  }

  ngOnInit() {
    // this.showSuccessMsg =false;
    this.customerService.getAllCustmer().subscribe((_allCustomers) => {
      this.allCustomers = _allCustomers;

    })
  }

  // nnavigate to create customer
  navCreateCustomer() {
    console.log('navigae to create customer')
    this.router.navigateByUrl('customer/create');
  }


}
