import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SaveButtonImageComponent } from '../buttons/save-button/save-button-image.component';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SaveButtonImageComponent],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent {
  @Output() imageUrlChange = new EventEmitter<string>();
  imageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.imageForm = this.fb.group({
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]], // Validar URL
    });
  }

  onSubmit() {
    if (this.imageForm.valid) {
      this.imageUrlChange.emit(this.imageForm.value.imageUrl);
      this.imageForm.reset();
    }
  }
}
