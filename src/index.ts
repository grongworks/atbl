import axios from "axios";

export default class Atbl {

    private telegramBaseUrl : string = "https://api.telegram.org/bot";
    private token : string;
    private updateId : bigint | null = null;

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

    /**
     * official method sendMessage
     * references to: https://core.telegram.org/bots/api#sendDice
     */
    public async sendDice (to: string) {
        try {
            const data = await this.executeMethod("sendDice", {
                chat_id: to,
                emoji: "🎲"
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * accepts messages sent with preceding /
     * references to: https://core.telegram.org/bots/api#getupdates
     */
    public async getMessages (callbacks : object = {}) {
        try {
            const data = await this.executeMethod("getUpdates",
                (this.updateId === null)
                    ? { allowed_updates: ["message"] }
                    : { allowed_updates: ["message"], offset: this.updateId }
            );

            for (const message of data.result) {
                this.updateId = message.update_id + 1;
                if (callbacks[message.message?.text]) {
                    const callback = callbacks[message.message?.text];
                    callback(message.message?.chat?.id);
                }
            }

            return data;
        } catch (error) {
            console.log(error);
        }
    }
}
