import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  signupForm: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished'];
  forbiddenNamesList = ['Test'];
  ngOnInit(){
    this.signupForm = new FormGroup({
      'project': new FormControl(null, Validators.required,  this.asyncForbiddenNames),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    });
  }

  forbiddenNames(control: FormControl): {[s: string] : boolean}{
    if(this.forbiddenNamesList.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }

  asyncForbiddenNames(control: FormControl): Observable<any> | Promise<any>{
    const promise = new Promise<any>((resolve, reject) =>{
      setTimeout(() =>{
        if(control.value === 'Test'){
          resolve({'nameIsForbidden': true});
        }else{
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
  onSubmit(){
    console.log(this.signupForm);
  }
}
