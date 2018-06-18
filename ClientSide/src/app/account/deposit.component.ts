import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  private subscription: Subscription;
  private ssn: string;
  private accountNumber: number;
  private customer: {} = { ssn: '' };
  private account: {} = { balance: '' };
  private amount: number;
  depositForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private accountService: AccountService) {

    this.depositForm = formBuilder.group({
      'depositData': formBuilder.group({
        'accountNumber':[''],
        'amount': ['', [Validators.required]],
      }),
    });
    // get the query parameters: ssn && accountNumber
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.ssn = param['ssn'];
        this.accountNumber = param['accountNumber'];

        console.log("ssn: " + this.ssn);
        console.log("account Number: " + this.accountNumber);


        //if (param['showMsg'])
        // this.showSuccessMsg = true;
      }
    );

  }

  ngOnInit() {

    // get customer information from server
    this.accountService.getCustmer(this.ssn).subscribe((customer) => {

      this.customer = customer;
      console.log('customer retrieved from server: ' + JSON.stringify(this.customer));

      // extract the current account from the customer object
      Observable.from(customer['accounts'])
        .filter((account: {}, index: number) => {
          return account['accountNumber'] == this.accountNumber;
        })
        .subscribe((account) => { // the extracted account

          console.log('current account:' + JSON.stringify(account));
          this.account = account;
        })

    })
  }


  // deposit money
  deposit() {
    this.activatedRoute.queryParams.subscribe(
      (param: any) => {

        let depositInfo = this.depositForm.value.depositData;
        depositInfo.ssn = param['ssn'];
        depositInfo.accountNumber = param['accountNumber'];
        console.log('deposit info:' + JSON.stringify(depositInfo));

        // call the server to deposit the money
        this.accountService.deposit(depositInfo).subscribe((response) => {
          console.log("deposit response from the server"+ JSON.stringify(response));

          if (response['status']=='SUCCESS'){
            this.router.navigateByUrl('customer/accounts?id=' + this.ssn + '&showMsg=0');
          }
        });
        ;

      }
    );



    // customer ssn
    // account number 
    // amount
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
