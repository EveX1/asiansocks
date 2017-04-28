export default class Rectangle {
    constructor(hauteur) {
        this._hauteur = hauteur;
    }

    get hauteur() {
        return this._hauteur;
    }

    info(){
        console.log(this.hauteur)
    }
}

