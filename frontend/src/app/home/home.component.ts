import { Component } from '@angular/core';

import { Role, User } from '@app/_models';
// import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';

import { AccountService,UserService} from '@app/_services';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    loading = false;
    userFromApi: User;
    userService: any;

    constructor(private accountService: AccountService,) {
        this.user = this.accountService.userValue;
        
        // this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
        //     this.loading = false;
        //     this.userFromApi = user;
        // });
    }

    get isUser() {
        return this.user && this.user.role === Role.User;
    }
    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }
    // ngOnInit() {
    //     this.loading= true;
    //         this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
    //             this.loading = false;
    //             this.userFromApi = user;
    //         });
//  this.accountService.getById(id).pipe(first()).subscribe(users => this.users = users)
        
    }
// }