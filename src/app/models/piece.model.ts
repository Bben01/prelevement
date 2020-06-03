export class Piece {
    date: number;
    constructor(public montant: number, public utilisations: number = 1) {
        this.date = Date.now();
        this.utilisations = montant * 5 - utilisations;
    }

    take() {
        this.utilisations--;
        return this.utilisations > 0;
    }
}