import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from './account.service';
import { Subscription } from "rxjs";

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreatecAccountComponent implements OnInit {


    accountForm: FormGroup;
    id: string;
    private subscription: Subscription;

    accountTypes = [
        'CREDIT',
        'DEBIT'
    ];

    constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,  private  router:Router, private accountService:AccountService) { 

        this.accountForm = formBuilder.group({
          'accountData': formBuilder.group({
            // 'accountNumber': ['', [Validators.required]],
            'nickName': ['', [Validators.required]],
            'balance': ['', [Validators.required]],
            'accountType': ['', [Validators.required]]
            
          }),      
        });

        this.subscription = activatedRoute.params.subscribe(
            (param: any) => {
                this.id = param['id'];
                console.log("received id: " + this.id);
            }
        );
    
        this.accountForm.statusChanges.subscribe(
          (data: any) => console.log(data)
        );
    
    } // end of constructor

    // save the customer
    onSubmit() {   
        let account = this.accountForm.value.accountData;
        

        account.ssn = this.id;
        account.accountNumber = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('modified account');
        console.log(account);

        var myDate = new Date();  
        

        this.accountService.createAccount(account).subscribe((result)=>{
        console.log(result);
        if ( result['status'] =="SUCCESS"){
            console.log ('account created successfully');
            this.router.navigateByUrl('customer/accounts?id=' + this.id + '&showMsg=0');
        }else{
            console.log ('status' + result['status']);
        }
        });


        
    }

    ngOnInit(): void {
    }
}

