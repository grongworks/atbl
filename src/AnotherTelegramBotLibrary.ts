export class Atbl {

    private token : String;

    construct (telegramToken : String) {
        console.log("constructor", telegramToken);
        this.token = telegramToken;
    }

    public printToken () {
        console.log(this);
        console.log("CURRENT TOKEN: ", this.token);
    }

}