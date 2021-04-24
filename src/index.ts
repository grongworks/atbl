import axios from "axios";

export default class Atbl {

    private telegramBaseUrl : string = "https://api.telegram.org/bot";
    private token : string;

    constructor (telegramToken : string) {
        this.token = telegramToken;
        this.telegramBaseUrl += this.token;
    }

    public printToken () : void {
        console.log("CURRENT TOKEN IS ->", this.token);
    }

    public printUrl () : void {
        console.log("URL IS ->", this.telegramBaseUrl);
    }

    private async executeMethod (methodName : string, payload : object | null = {}) {
        try {
            const response = await axios.post(`${this.telegramBaseUrl}/${methodName}`, { ...payload });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
            throw new Error("error_calling_api");
        }
    }

    /**
     * official method getMe
     * references to: https://core.telegram.org/bots/api#getme
     */
    public async getMe () {
        try {
            const data = await this.executeMethod("getMe");
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * official method sendMessage
     * references to: https://core.telegram.org/bots/api#sendmessage
     */
    public async sendMessage (to : string, message : string) {
        try {
            const data = await this.executeMethod("sendMessage", {
                chat_id: to,
                text: message,
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
}
