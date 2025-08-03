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
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { ResumeBasicComponent, ResumeClassicComponent, ResumeMinimalComponent, ResumeModernComponent, ResumePdfTemplate } from '../resume-pdf-template/resume-pdf-template';
import { MatDialog } from '@angular/material/dialog';
declare const pdfMake: any;
declare var Razorpay: any;

declare var html2pdf: any;
@Component({
  selector: 'app-resume',
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    FormsModule,
    MatCardModule,
    MatSpinner,
    DragDropModule,
    MatDivider,
    MatIcon,
    ReactiveFormsModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class Resume implements OnInit {
  success = '';
  error = '';
  loading = false;
  resume = {
    name: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: [{ degree: '', institution: '', year: '' }],
    experience: [{ role: '', company: '', duration: '' }],
    projects: [{ title: '', description: '', link: '' }],
    skills: ['']
  }
  premiumStatus = false;
  showPdf: boolean = false;
  selectedTemplate: any;

  constructor(private resumeService: ResumeService,
    private auth: Auth, private snackBar: MatSnackBar,
    private dialog: MatDialog, // <-- Inject 
    private razorpayService: RazorpayService) { }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted:', this.resume);
      // Send to backend here
      this.save(this.resume);
    }
  }

  addItem(section: string) {
    console.log('Adding item to section:', section);
    console.log('Current resume state:', this.resume);
    (this.resume as any)[section].push(
      section === 'education'
        ? { degree: '', institution: '', year: '' }
        : section === 'experience'
          ? { role: '', company: '', duration: '' }
          : { title: '', description: '' }
    );
  }

  removeItem(section: string, index: number) {
    (this.resume as any)[section].splice(index, 1);
  }

  drop(event: CdkDragDrop<any[]>, section: string) {
    moveItemInArray((this.resume as any)[section], event.previousIndex, event.currentIndex);
  }


  save(resume: any) {
    console.log('Saving resume:', resume);
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
        this.resume = data.resumeData;
        // this.name = data.name;
        // this.email = data.email;
        // this.summary = data.summary;
        // this.skills = data.skills;
      },
      error: (err: any) => {
        console.error('Failed to load resume', err);
        this.error = 'Failed to load resume';
      }
    });
    this.premiumStatus = this.auth.isPremiumUser();
  }

  saveResume(): void {
    this.resumeService.saveResume(this.resume).subscribe({
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
    // if (!this.auth.isPremiumUser()) {
    //   this.snackBar.open('Upgrade to premium to download PDF.', 'Close', { duration: 3000 });
    //   return;
    // }

    // const docDefinition = {
    //   content: [
    //     { text: this.resume.name, style: 'header' },
    //     { text: `Email: ${this.resume.email}` },
    //     { text: `Phone: ${this.resume.phone}` },
    //     { text: `Summary: ${this.resume.summary}` },
    //     { text: `Education: ${this.resume.education}` },
    //     { text: `Experience: ${this.resume.experience}` },
    //   ],
    //   styles: {
    //     header: {
    //       fontSize: 22,
    //       bold: true
    //     }
    //   }
    // };

    // pdfMake.createPdf(docDefinition).download('resume.pdf');

    // downloadPDF(): void {
    if (!this.auth.isPremiumUser()) {
      this.snackBar.open('PDF download is for premium users only!', 'Close', { duration: 3000 });
      return;
    }

    const docDefinition: any = {
      content: [
        { text: 'Resume', style: 'header' },
        { text: `Full Name: ${this.resume.name || ''}`, style: 'subheader' },
        { text: `Email: ${this.resume.email || ''}` },
        { text: `Phone: ${this.resume.phone || ''}` },
        { text: `Address: ${this.resume.address || ''}`, margin: [0, 0, 0, 10] },

        { text: 'Summary', style: 'sectionHeader' },
        { text: this.resume.summary || '', margin: [0, 0, 0, 10] },

        { text: 'Skills', style: 'sectionHeader' },
        {
          ul: this.resume.skills?.length ? this.resume.skills : ['No skills listed'],
          margin: [0, 0, 0, 10]
        },

        { text: 'Education', style: 'sectionHeader' },
        ...(this.resume.education?.length ? this.resume.education.map((edu: any) => ({
          text: `${edu.degree} - ${edu.institution} (${edu.year})`, margin: [0, 2]
        })) : [{ text: 'No education details available', margin: [0, 2] }]),

        { text: 'Experience', style: 'sectionHeader' },
        ...(this.resume.experience?.length ? this.resume.experience.map((exp: any) => ({
          text: `${exp.role} at ${exp.company} (${exp.duration})`, margin: [0, 2]
        })) : [{ text: 'No experience details available', margin: [0, 2] }]),

        { text: 'Projects', style: 'sectionHeader' },
        ...(this.resume.projects?.length ? this.resume.projects.map((proj: any) => ({
          text: `${proj.title} - ${proj.description}`, margin: [0, 2]
        })) : [{ text: 'No projects listed', margin: [0, 2] }])
      ],
      styles: {
        header: { fontSize: 22, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
        subheader: { fontSize: 16, bold: true, margin: [0, 0, 0, 4] },
        sectionHeader: { fontSize: 14, bold: true, decoration: 'underline', margin: [0, 10, 0, 4] }
      }
    };

    pdfMake.createPdf(docDefinition).download(`${this.resume.name || 'resume'}.pdf`);
    this.snackBar.open('PDF downloaded successfully', 'Close', { duration: 3000 });
  }

  payAndUnlockPremium() {
    this.razorpayService.createOrder(this.resume).subscribe((order: any) => {
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
          name: this.resume.name,
          email: this.resume.email, // optional
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
        console.log('Payment verified successfully', res, response);
        alert('You are now a Premium user!');
        this.auth.setPremium(true); // update UI
      },
      (err) => {
        console.error('Payment verification failed', err);
        alert('Payment failed. Please try again.');
      }
    );
  }

  selectTemplate(selectedTemplate: any, resume: any) {
    console.log('Selected template:', selectedTemplate);
    if (selectedTemplate == 'classic') {
      this.dialog.open(ResumeClassicComponent, { data: resume });
    } else if (selectedTemplate == 'modern') {
      this.dialog.open(ResumeModernComponent, { data: resume });
    } else if (selectedTemplate == 'minimal') {
      this.dialog.open(ResumeMinimalComponent, { data: resume });
    } else {
      this.dialog.open(ResumeBasicComponent, { data: resume });
    }
  }
}
