import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
 
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  updateForm!: FormGroup;
  passwordForm!: FormGroup;
  showPasswordModal = false;
  passwordError:string='';
 
  constructor(private fb: FormBuilder, private authService: AuthService, private httpService: HttpService) {}
 
  ngOnInit(): void {
    this.updateForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['']
    });
 
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
 
    this.loadUserData();
  }
 
  loadUserData() {
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.httpService.getUserById(userId).subscribe({
        next: (user: any) => {
          this.updateForm.patchValue({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          });
        },
        error: (err: any) => {
          console.error('Error fetching user details:', err);
        }
      });
    }
  }
 
  onUpdate() {
    const id = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
 
    if (this.updateForm.valid && id && role) {
      let endpoint = '';
      switch (role.toUpperCase()) {
        case 'ADMINISTRATOR':
          endpoint = `/api/admin/update/${id}`;
          break;
        case 'AGENT':
          endpoint = `/api/agent/update/${id}`;
          break;
        case 'CUSTOMER':
          endpoint = `/api/customer/update/${id}`;
          break;
      }
 
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      });
 
      this.httpService.updateUserByRole(endpoint, this.updateForm.value, headers).subscribe({
        next: (res: any) => {
          console.log('Profile updated successfully:', res);
        },
        error: (err: any) => {
          console.error('Error updating profile:', err);
        }
      });
    }
 
   
  }
 
  openPasswordModal() {
    this.showPasswordModal = true;
  }
 
  closePasswordModal() {
    this.showPasswordModal = false;
  }
 
  
onChangePassword() {
  this.passwordError='';
  if (this.passwordForm.valid) {
    const id = Number(localStorage.getItem('userId'));
    const role = localStorage.getItem('role');
    if (!id || !role) return;
 
    let endpoint = '';
    switch (role.toUpperCase()) {
      case 'ADMINISTRATOR':
        endpoint = `/api/admin/change-password/${id}`;
        break;
      case 'AGENT':
        endpoint = `/api/agent/change-password/${id}`;
        break;
      case 'CUSTOMER':
        endpoint = `/api/customer/change-password/${id}`;
        break;
    }
 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
 
    this.httpService.changePassword(endpoint, this.passwordForm.value, headers).subscribe({
      // next: (res: any) => {
      //   console.log('Password updated successfully:', res);
      //   this.passwordForm.reset();
      //   this.closePasswordModal();
      // },
      // error: (err: any) => {
      //   console.error('Error updating password:', err);
      //   this.passwordError=err.error;
      next: (res: any) => {
        alert(res.message || 'Password updated successfully');
        this.passwordForm.reset();
        this.passwordError=res.message
        this.closePasswordModal();
      },
      error: (err) => {
        const msg = err.error?.message || err.error?.error || 'Error updating password';
        alert(msg);
        this.passwordError=msg;
        console.error('Error updating password:', err);
      }
    });
  }
}
 
}
 
 
 
// onChangePassword() {
//   const id = localStorage.getItem('userId');
//   const formValue = this.passwordForm.value;
 
//   this.http.put(`https://ec2-13-203-198-20.projects.wecreateproblems.com/proxy/5000/api/admin/change-password/${id}`, formValue)
//     .subscribe({
     
//       }
//     });
// }
 
 