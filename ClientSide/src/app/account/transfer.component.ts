import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  private subscription: Subscription;
  private ssn: string;
  private accountNumber: number;
  private customer: {} = { ssn: '' };
  private account: {} = { balance: '' };
  private accountNumber2 : number;
  private amount: number;
  transferForm: FormGroup;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private accountService: AccountService) {
    
      this.transferForm = formBuilder.group({
        'transferData': formBuilder.group({
          'accountNumber':[''],
          'amount': ['', [Validators.required]],
          'accountNumber2':['', [Validators.required]],
        }),
      });
      // get the query parameters: ssn && accountNumber
      this.subscription = this.activatedRoute.queryParams.subscribe(
        (param: any) => {
          this.ssn = param['ssn'];
          this.accountNumber = param['accountNumber'];
  
          console.log("ssn: " + this.ssn);
          console.log("account Number: " + this.accountNumber);
          console.log("account Number2: " + this.accountNumber2);
  
  
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

// transfer money
transfer() {
  this.activatedRoute.queryParams.subscribe(
    (param: any) => {

      let transferInfo = this.transferForm.value.transferData;
      transferInfo.ssn = param['ssn'];
      transferInfo.accountNumber = param['accountNumber'];
      console.log('transfer info:' + JSON.stringify(transferInfo));

      // call the server to transfer the money
      this.accountService.transfer(transferInfo).subscribe((response) => {
        console.log("transfer response from the server"+ JSON.stringify(response));

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
