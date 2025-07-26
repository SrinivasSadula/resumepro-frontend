import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResumeService } from './resume-service';
import { MatButton } from '@angular/material/button';
import { RazorpayService } from '../services/razorpay-service';
declare const pdfMake: any;
declare var Razorpay: any;

@Component({
  selector: 'app-resume',
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    FormsModule,
    MatCardModule,
    MatSpinner,
    ReactiveFormsModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class Resume implements OnInit {
  name = '';
  email = '';
  summary = '';
  skills = '';
  success = '';
  error = '';
  loading = false;
  resumeData: any = {
    name: '',
    email: '',
    phone: '',
    summary: '',
    education: '',
    experience: ''
  };
  premiumStatus = false;
  
  constructor(private resumeService: ResumeService,
    private auth: Auth, private snackBar: MatSnackBar,
    private razorpayService: RazorpayService) { }

  save() {
    const resume = {
      name: this.name,
      email: this.email,
      summary: this.summary,
      skills: this.skills.split(',').map(s => s.trim())
    };
    this.loading = true;
    this.resumeService.saveResume(resume).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Resume saved!', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
        this.success = 'Resume saved!';
        this.error = '';
      },
      error: err => {
        this.loading = false;
        this.error = err.error.message || 'Failed to save resume';
        this.success = '';
      }
    });
  }

  ngOnInit(): void { 
    console.log('Resume component initialized');
    console.log('Resume component initialized');
    this.resumeService.getAllResumes().subscribe({
      next: (data: any) => {
        console.log('Resume data loaded:', data);
        this.resumeData = data;
        this.name = data.name;
        this.email = data.email;
        this.summary = data.summary;
        this.skills = data.skills.join(', ');
      },
      error: (err: any) => {
        console.error('Failed to load resume', err);
        this.error = 'Failed to load resume';
      }
    });
    this.premiumStatus = this.auth.isPremiumUser();
  }

  saveResume(): void {
    this.resumeService.saveResume(this.resumeData).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Resume saved!';
        this.error = '';
        this.snackBar.open('Resume saved successfully', 'Close', { duration: 3000 });
      },
      error: () => {
        this.loading = false;
        this.success = '';
        this.snackBar.open('Failed to save resume', 'Close', { duration: 3000 });
      }
    });
  }

  downloadPdf(): void {
    if (!this.auth.isPremiumUser()) {
      this.snackBar.open('Upgrade to premium to download PDF.', 'Close', { duration: 3000 });
      return;
    }

    const docDefinition = {
      content: [
        { text: this.resumeData.name, style: 'header' },
        { text: `Email: ${this.resumeData.email}` },
        { text: `Phone: ${this.resumeData.phone}` },
        { text: `Summary: ${this.resumeData.summary}` },
        { text: `Education: ${this.resumeData.education}` },
        { text: `Experience: ${this.resumeData.experience}` },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('resume.pdf');
  }

  payAndUnlockPremium() {
    this.razorpayService.createOrder(this.resumeData).subscribe((order: any) => {
      console.log('Order created successfully', order);
      const options = {
        key: 'rzp_test_2dn8T1ylFXoLcx',
        amount: order.amount,
        currency: order.currency,
        name: 'ResumePro',
        description: 'Premium Upgrade',
        order_id: order.id,
        handler: (response: any) => {
          this.verifyPayment(response);
        },
        prefill: {
          name: this.resumeData.name,
          email: this.resumeData.email, // optional
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    });
  }

  verifyPayment(response: any) {
    this.razorpayService.verifyPayment(response).subscribe(
      (res) => {
        console.log('Payment verified successfully',res, response);
        alert('You are now a Premium user!');
        this.auth.setPremium(true); // update UI
      },
      (err) => {
        console.error('Payment verification failed', err);
        alert('Payment failed. Please try again.');
      }
    );
  }
}
