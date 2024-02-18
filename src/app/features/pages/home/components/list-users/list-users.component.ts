import { MatTableDataSource } from '@angular/material/table';
import { User } from './../../../../../core/types/user';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UpdateUserComponent } from '../../../../../shared/components/popup/update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../../../core/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
  //: ChangeDetectionStrategy.OnPush
})
export class ListUsersComponent implements OnInit {
  @Output() refresh: EventEmitter<any> = new EventEmitter();

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, user: User  ): void {
    const dialogRef =  this.dialog.open(UpdateUserComponent, {
      width: '400px',
      height: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        user
      }
    }

    );
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
       if (result) {
        this.refresh.emit(result);
       }

     });
  }


  constructor(  private cdref: ChangeDetectorRef , public dialog: MatDialog, private usersService : UsersService) {}
  @Input() listUser : Array<User> = [];
  dataSource = new MatTableDataSource<User>(this.listUser);
  displayedColumns: string[] = [];
  ngOnInit(): void {
    this.displayedColumns = ['first_name'];//
     // this.listUser = data;
     console.log( this.listUser);
     this.dataSource.data = this.listUser;
     this.dataSource.data = [...this.dataSource.data];
     console.log(this.dataSource.data[0].first_name)
     this.displayedColumns = ['name', 'email'  , 'phone', 'edit'];
     this.cdref.detectChanges();

  }

}
