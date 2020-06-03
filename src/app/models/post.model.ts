export class Post {
  date: number;
  constructor(public name: string, public pieceId: number, public comment: string) {
    this.date = Date.now();
    if (comment === "") {
      this.comment = "Pas de commentaire";
    }
  }
}