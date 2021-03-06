import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from './customer.service';
import { NotifierService } from '../util/notifier.service';

@Component({
  selector: 'app-createc-customer',
  templateUrl: './createc-customer.component.html',
  styleUrls: ['./createc-customer.component.scss']
})
export class CreatecCustomerComponent implements OnInit {

  customerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,  private  router:Router, 
    private customerService:CustomerService) { 

    this.customerForm = formBuilder.group({
      'customerData': formBuilder.group({
        'ssn': ['', [Validators.required]],
        'email': ['', [Validators.required]],
        'firstName': ['', [Validators.required]],
        'lastName': ['', [Validators.required]],
        'address': [''],
        
      }),      
    });

    this.customerForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );

  } // end of constructor



  // save the customer
  onSubmit() {   
    let customer = this.customerForm.value.customerData;
    console.log(customer);

    this.customerService.createCustomer(customer).subscribe((result)=>{
      console.log(result);
      if ( result['status'] =="SUCCESS")
      {
        console.log ('customer created successfully');

        // show success message on customers list page
        
        this.router.navigateByUrl('customer?showMsg=0');
  //      this.notifier.notify();
      }else{
        console.log ('status' + result['status']);
      }
    });
    
  }

  ngOnInit() {
  }

}
