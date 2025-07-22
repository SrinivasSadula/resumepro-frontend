import { Component } from '@angular/core';
import { PaymentService } from './payment-service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  imports: [CommonModule,MatButton],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})

export class Payment {
  
  isPaying = false;
  message = '';

  constructor(private paymentService: PaymentService) {}

  payNow() {
    this.isPaying = true;

    this.paymentService.createOrder().subscribe({
      next: (order: any) => {
        const options = {
          key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
          amount: order.amount,
          currency: 'INR',
          name: 'ResumePro Premium',
          description: 'Unlock resume PDF and templates',
          order_id: order.id,
          handler: (response: any) => this.verify(response),
          prefill: {
            name: '',
            email: '',
            contact: ''
          }
        };
        const rzp = new Razorpay(options);
        rzp.open();
        this.isPaying = false;
      },
      error: () => {
        this.message = 'Failed to initiate payment';
        this.isPaying = false;
      }
    });
  }

  verify(response: any) {
    this.paymentService.verifyPayment(response).subscribe({
      next: () => {
        this.message = '🎉 Payment successful! Premium unlocked.';
      },
      error: () => {
        this.message = '❌ Payment verification failed';
      }
    });
  }
}
