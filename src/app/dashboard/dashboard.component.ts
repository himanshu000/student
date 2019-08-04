import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import {MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MatSnackBar, MatSort} from '@angular/material';

import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { ConfirmationComponent } from '../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  students: Student[];
  displayedColumns: string[] = [
    'sNo',
    'name',
    'category',
    'dateOfBirth',
    'fatherName',
    'motherName',
    'lastClassScore',
    'action'
  ];
  dataSource;
  dialogRef: MatDialogRef<ConfirmationComponent>;
  category = '';
  categories = [
    {value: '', viewValue: 'All'},
    {value: 'domestic', viewValue: 'Domestic'},
    {value: 'international', viewValue: 'International'}
  ];
  filteredData: Student[];
  studentKey = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private studentService: StudentService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe((result: Student[]) => {
      this.students = result;
      this.dataSource = new MatTableDataSource<Student>(this.students);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.studentKey = filterValue.trim().toLowerCase();
    this.filterData();
  }

  onCategorySelection() {
    this.filterData();
  }

  filterData() {
    this.filteredData = this.students;
    if (this.studentKey) {
      this.filteredData = this.filteredData.filter((student) => {
        return student.name.toLowerCase().includes(this.studentKey);
      });
    }
    if (this.category) {
      this.filteredData = this.filteredData.filter((student) => {
        return student.category === this.category;
      });
    }
    this.dataSource = new MatTableDataSource<Student>(this.filteredData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  viewStudent(id) {
    console.log(id);
    // this.router.navigate(['/student/view', id]);
  }

  editStudent(id) {
    console.log(id);
    // this.router.navigate(['/student/edit', id]);
  }

  addStudent() {
    console.log('test');
    // this.router.navigate(['/student/add']);
  }

  deleteStudent(id) {
    this.dialogRef = this.dialog.open(ConfirmationComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.deleteStudent(id).subscribe((data) => {
          this.snackBar.open('Student deleted successfully');
          this.students = data;
          this.filterData();
        });
      }
      this.dialogRef = null;
    });
  }
}
