import { Piece } from './../models/piece.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class PieceService {

  pieces: Piece[];
  consumed: Piece[];
  utilisRestantes: number;
  utilisSubject = new Subject<number>();
  piecesSubject = new Subject<Piece[]>();
  consumedSubject = new Subject<Piece[]>();

  constructor() { 
    this.getUtils();
  }

  getUtils() {
    firebase.database().ref('/pieces')
      .on("value", (data: firebase.database.DataSnapshot) => {
        this.pieces = data.val() ? data.val() : [];
        this.remaining();
        this.emit();
      })
    firebase.database().ref('/consumed')
    .on("value", (data: firebase.database.DataSnapshot) => {
      this.consumed = data.val() ? data.val() : [];
      this.emitConsumed();
    })
  }

  emit() {
    this.utilisSubject.next(this.utilisRestantes);
    this.piecesSubject.next(this.pieces);
  }

  emitConsumed() {
    this.consumedSubject.next(this.consumed);
  }

  remaining() {
    this.utilisRestantes = 0;
    this.pieces.forEach((piece) => this.utilisRestantes += piece.utilisations);
  }

  use(): number {
    if (this.utilisRestantes <= 0) {
      return -1;
    }
    
    // sorts by date
    this.pieces.sort((a, b) => a.date - b.date)
    let date = this.pieces[0].date;
    this.pieces[0].utilisations--;
    if (this.pieces[0].utilisations === 0) {
      let piece = this.pieces.splice(0, 1)[0];
      this.consumed.push(piece);
    }
    this.utilisRestantes--;
    this.pushPieces();
    this.pushConsumed();
    return date;
  }

  pushPieces() {
    firebase.database().ref('/pieces').set(this.pieces);
    this.emit();
  }

  pushConsumed() {
    firebase.database().ref('/consumed').set(this.consumed);
    this.emitConsumed();
  }

  addPiece(montant: number, utils: number = 1) {
    this.pieces.push(new Piece(montant, utils))
    this.utilisRestantes += montant * 5 - utils;
    this.pushPieces();
  }

  addOne(pieceId: number)
  {
    let piece = this.pieces.find((piece) => {
      return piece.date === pieceId;
    })
    if (!piece) {
      let pieceIndex = this.consumed.map((piece) => {
        return piece.date;
      }).indexOf(pieceId);
      // piece = this.consumed.find((piece, index, arr) => {
      //   piece.date === pieceId;
      // });
      piece = this.consumed.splice(pieceIndex, 1)[0];
      this.pieces.push(piece);
    }
    piece.utilisations++
    this.utilisRestantes++;
    this.pushPieces();
    this.pushConsumed();
  }
}
