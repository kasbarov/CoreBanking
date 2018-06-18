import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AccountService } from './account.service';


@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
  })
export class AccountComponent implements OnInit{

   
  private subscription: Subscription;
  id: string;

  customer:{};

  accounts:{}[];
  showSuccessMsg: boolean = false;


  constructor(private  router:Router,private activatedRoute: ActivatedRoute, private accountService:AccountService) {

    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.id = param['id'];
        console.log("got id: " + this.id);
        
        if (param['showMsg'])
        this.showSuccessMsg = true;
      }
    );
    
  }

  ngOnInit(): void {

    this.accountService.getCustmer(this.id).subscribe((customer)=>{
      this.customer = customer;
      this.accounts = customer["accounts"];
      console.log(this.customer);
      console.log(this.accounts);
    })

  }

  // nnavigate to create customer
  navCreateAccount(){
    console.log('navigae to create account')
    this.router.navigateByUrl('account/create/' + this.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
