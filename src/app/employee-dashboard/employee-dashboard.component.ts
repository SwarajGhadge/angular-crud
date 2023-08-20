import { Component } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  formValue !: FormGroup;
  employeeData !:any;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder , private api:ApiService){}
  ngOnInit():void{
    this.formValue = this.formbuilder.group({
      name:[''],
      mobile:[''],
      email:[''],
      age:['']
    })
    this.getAllEmployee()
  }

  clickAddEmployee(){
    this.formValue.reset()
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.name=this.formValue.value.name;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.age=this.formValue.value.age;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      let ref=document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllEmployee()
    },
    err=>{
      console.error(err); 
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res
    })
  }

  deleteAllEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      this.getAllEmployee()
    })
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['age'].setValue(row.age);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.name=this.formValue.value.name;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.age=this.formValue.value.age;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert('updated')
      let ref=document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllEmployee()
    })
  }
}
