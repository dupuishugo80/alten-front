import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  messageEnvoye = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  onSubmit() {
    this.contactForm.markAllAsTouched();
    
    if (this.contactForm.valid) {
      this.messageEnvoye = true;
      this.contactForm.reset();
      
      setTimeout(() => {
        this.messageEnvoye = false;
      }, 3000);
    }
  }
}