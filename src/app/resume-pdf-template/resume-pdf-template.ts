import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
declare var html2pdf: any;

@Component({
  selector: 'app-resume-pdf-template',
  imports: [CommonModule, MatFormFieldModule],
  templateUrl: './resume-pdf-template.html',
  styleUrl: './resume-pdf-template.css'
})
export class ResumePdfTemplate {
  constructor() {}
  ngOnInit(): void { }
}


@Component({
  selector: 'app-resume-classic',
  imports: [CommonModule, MatFormFieldModule,MatIcon,MatTableModule 
  ],
  templateUrl: './resume-classic.component.html',
  styleUrls: ['./resume-classic.component.css']
})
export class ResumeClassicComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public resume: any,
    public dialogRef: MatDialogRef<ResumeClassicComponent>
  ) {
    console.log('Resume data received:', this.resume);
  }
  downloadResumePDF() {
    const element = document.getElementById('selectedResume');
    const options = {
      filename:  this.resume.name +'_ResumeClassic'+ '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().from(element).set(options).save();
  }
}


@Component({
  selector: 'app-resume-modern',
  imports: [CommonModule, MatFormFieldModule,MatIcon,MatTableModule 
  ],
  templateUrl: './resume-modern.component.html',
  styleUrls: ['./resume-modern.component.css']
})
export class ResumeModernComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public resume: any,
    public dialogRef: MatDialogRef<ResumeModernComponent>
  ) {
    console.log('Resume data received:', this.resume);
  }

  downloadResumePDF() {
    const element = document.getElementById('selectedResume');
    const options = {
      filename:  this.resume.name +'_ResumeModern'+ '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().from(element).set(options).save();
  }
}


@Component({
  selector: 'app-resume-minimal',
  imports: [CommonModule, MatFormFieldModule,MatIcon,MatTableModule 
  ],
  templateUrl: './resume-minimal.component.html',
  styleUrls: ['./resume-minimal.component.css']
})
export class ResumeMinimalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public resume: any,
    public dialogRef: MatDialogRef<ResumeMinimalComponent>
  ) {
    console.log('Resume data received:', this.resume);
  }

  downloadResumePDF() {
    const element = document.getElementById('selectedResume');
    const options = {
      filename:  this.resume.name +'_ResumeMinimal'+ '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().from(element).set(options).save();
  }
}


@Component({
  selector: 'app-resume-basic',
  imports: [CommonModule, MatFormFieldModule,MatIcon,MatTableModule 
  ],
  templateUrl: './resume-basic.component.html',
  styleUrls: ['./resume-basic.component.css']
})
export class ResumeBasicComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public resume: any,
    public dialogRef: MatDialogRef<ResumeBasicComponent>
  ) {
    console.log('Resume data received:', this.resume);
  }

  downloadResumePDF() {
    const element = document.getElementById('selectedResume');
    const options = {
      filename:  this.resume.name +'_ResumeBasic'+ '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().from(element).set(options).save();
  }
}