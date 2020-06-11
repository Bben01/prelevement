export class Post {
  date: number;
  constructor(public name: string, 
              public pieceId: number, 
              public comment: string, 
              public surname: string, 
              public phone: string,
              public email: string) {
    this.date = Date.now();
    if (comment === "") {
      this.comment = "Pas de commentaire";
    }
  }
}