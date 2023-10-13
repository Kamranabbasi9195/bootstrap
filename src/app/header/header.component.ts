import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
 import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './header.model'; // Import your EmployeeModel

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  formValue: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();

  constructor(private fb: FormBuilder,
    private api :ApiService) {
    this.formValue = this.fb.group({
      name: [''],
      ojt: [''],
      date: [''],
      time: ['']
    });
  }

  ngOnInit(): void {
    // You can add any initialization logic here if needed
  }

  postEmployeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.ojt = this.formValue.value.ojt;
    this.employeeModelObj.date = this.formValue.value.date;
    this.employeeModelObj.time = this.formValue.value.time;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe({
      next: (res: any) => {
        // Handle successful response
        console.log(res);
        alert("Employee added successfull")
        this.formValue.reset();
      },
      error: (err: any) => {
        // Handle error
        alert("Please try again")
      }
    });
    
  }
}
