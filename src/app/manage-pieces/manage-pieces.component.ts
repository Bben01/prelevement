import { Subscription } from 'rxjs';
import { PieceService } from './../services/piece.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Piece } from '../models/piece.model';

@Component({
  selector: 'app-manage-pieces',
  templateUrl: './manage-pieces.component.html',
  styleUrls: ['./manage-pieces.component.scss']
})
export class ManagePiecesComponent implements OnInit, OnDestroy {
  pieces: Piece[] = [];
  consumed: Piece[] = [];
  pieceSubsciption: Subscription;
  consumedSubscription: Subscription;

  constructor(private pieceService: PieceService) { 
  }
  

  ngOnInit(): void {
    this.pieceSubsciption = this.pieceService.piecesSubject.subscribe(
      (pieces: Piece[]) => {
        this.pieces = pieces;
        this.pieces ? this.sort() : {};
      }
    );
    this.consumedSubscription = this.pieceService.consumedSubject.subscribe(
      (consumed: Piece[]) => {
        this.consumed = consumed;
        this.consumed ? this.sort(true) : {};
      }
    );
    this.pieceService.emit();
    this.pieceService.emitConsumed();
  }

  ngOnDestroy(): void {
    this.pieceSubsciption.unsubscribe();
    this.consumedSubscription.unsubscribe();
  }

  toString(index: number, checkPiece: boolean = true) {
    let sum = checkPiece ? this.pieces[index].montant : this.consumed[index].montant;
    return "Pièce de " + sum + (sum === 1 ? " shekel" : " shekels");
  }

  alert() {
    return this.pieceService.utilisRestantes <= 0;
  }

  sort(consumed: boolean= false) {
    consumed ? this.consumed.sort((a, b) => a.date - b.date) : this.pieces.sort((a, b) => a.date - b.date);
  }

}
