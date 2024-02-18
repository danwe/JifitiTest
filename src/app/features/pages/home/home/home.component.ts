import { UpdateUserComponent } from './../../../../shared/components/popup/update-user/update-user.component';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../../../../core/types/user';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent implements OnInit   {
popupNewUser() {

}


  constructor(private usersService : UsersService , public dialog: MatDialog)  {}
  ngOnInit(): void {
    this.listUser = [];
    this.usersService.getAllUsers().subscribe((data: any) => {
      this.listUser = data;
      this.displayedColumns = ['first_name'];
      console.log(data);
    })
  }
  listUser: Array<User> = [];

  displayedColumns: string[] = [];

  refreshListFun() {
    setTimeout(() =>{//
      this.usersService.getAllUsers().subscribe((data: any) => {
       this.listUser = [];
       setTimeout(() =>{//
        this.listUser = [...data];
      },100);
        console.log(data);
      })
    },10);

  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef =  this.dialog.open(UpdateUserComponent, {
      width: '400px',
      height: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
    }

    );
    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
      if (result) {
        this.refreshListFun();
      }

    });
  }
  refreshList() {
    this.refreshListFun();
  }
}


