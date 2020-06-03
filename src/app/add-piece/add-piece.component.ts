import { PieceService } from '../services/piece.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-piece',
  templateUrl: './add-piece.component.html',
  styleUrls: ['./add-piece.component.scss']
})
export class AddPieceComponent implements OnInit {

  pieceForm: FormGroup;
  private regexPattern = /^\d*$/;
  private utilsValidators = [
    Validators.pattern(this.regexPattern), 
    Validators.min(1)
  ];

  constructor(private formBuilder: FormBuilder,
              private pieceService: PieceService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.pieceForm = this.formBuilder.group({
      montant: ['', [Validators.required, Validators.pattern(this.regexPattern), Validators.min(1), Validators.max(10), Validators.maxLength(2)]],
      utils: ['', this.utilsValidators],
    });
    this.pieceForm.get('montant').valueChanges.subscribe(value => {
      if (value && value != null) {
        this.pieceForm.get('utils').setValidators(this.utilsValidators.concat(Validators.max(value * 5)))
      } else {
        this.pieceForm.get('utils').setValidators(this.utilsValidators);
      }
    });
  }

  onSavePiece() {
    const montant = +this.pieceForm.get('montant').value;
    const utils = +this.pieceForm.get('utils').value;
    this.pieceService.addPiece(montant, utils);
    // TODO: A afficher recu (creer une nouvelle page)
    this.router.navigate(['/posts']);
  }
}