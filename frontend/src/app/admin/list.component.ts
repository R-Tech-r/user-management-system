import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';

import { AccountService,UserService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    loading = false;
    user: User;
    userFromApi: User;
    

    constructor(private userService: UserService,private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);

            // this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
            //     this.loading = false;
            //     this.userFromApi = user;
            // });
//  this.accountService.getById(id).pipe(first()).subscribe(users => this.users = users)
        
    }
   

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }
//     getUser(id: string){
//         // const user = this.users.find(x => x.id === id);
//  this.accountService.getById(id).pipe(first()).subscribe(users => this.users = users)
//     }

//     if(role='Admin'){
// return true;
//     }
}

function id(id: any) {
    throw new Error('Function not implemented.');
}
