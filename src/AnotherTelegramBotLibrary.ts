export class Atbl {

    private token : String;

    construct (telegramToken : String) {
        this.token = telegramToken;
    }

    public printToken () {
        console.log("CURRENT TOKEN: ", this.token);
    }

}