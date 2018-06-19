import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  private subscription: Subscription;
  private ssn: string;
  private accountNumber: number;
  private customer: {} = { ssn: '' };
  private account: {} = { balance: '' };
  private amount: number;
  withdrawForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private accountService: AccountService) {
      
      this.withdrawForm = formBuilder.group({
        'withdrawData' : formBuilder.group({
           'accountNumber' : [''],
           'amount':['',[Validators.required]],
        }),
      });

      // get the query parameters: ssn && accountNumber
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.ssn = param['ssn'];
        this.accountNumber = param['accountNumber'];

        console.log("ssn: " + this.ssn);
        console.log("account Number: " + this.accountNumber);

     });
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
  // withdraw money
  withdraw() {
    this.activatedRoute.queryParams.subscribe(
      (param: any) => {

        let withdrawInfo = this.withdrawForm.value.withdrawData;
        withdrawInfo.ssn = param['ssn'];
        withdrawInfo.accountNumber = param['accountNumber'];
        console.log('withdraw info:' + JSON.stringify(withdrawInfo));

        // call the server to withdraw the money
        this.accountService.withdraw(withdrawInfo).subscribe((response) => {
          console.log("withdraw response from the server"+ JSON.stringify(response));

          if (response['status']=='SUCCESS'){
            this.router.navigateByUrl('customer/accounts?id=' + this.ssn + '&showMsg=0');
          }
        });
        ;

      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
