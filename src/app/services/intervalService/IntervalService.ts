import { CallbackFunction } from "../../structures/CallbackFunction";
import { IntervalType } from "./structures/IntervalType";

class IntervalService {

    private subscribers16: CallbackFunction[];
    private subscribers15000: CallbackFunction[];
    private interval16: NodeJS.Timeout | null = null;
    private interval15000: NodeJS.Timeout | null = null;

    public static getInstance(): IntervalService {
        return this.instance || (this.instance = new this());
    }

    private static instance: IntervalService;

    private constructor() {
        this.subscribers16 = [];
        this.subscribers15000 = [];
    }

    public subscribe(type: IntervalType, callback: CallbackFunction): CallbackFunction {
        switch (type) {
            case IntervalType["15000ms"]:
                return this.subscribeTo15000(callback);
            case IntervalType["16ms"]:
                return this.subscribeTo16(callback);
        }
    }

    private subscribeTo15000(callback: CallbackFunction): CallbackFunction {
        this.subscribers15000.push(callback);
        if (!this.interval15000) {
            this.interval15000 = setInterval(() => this.executeCallback(this.subscribers15000), 15000);
        }
        return () => this.removeCallback(callback, this.subscribers15000, this.interval15000);
    }

    private subscribeTo16(callback: CallbackFunction): CallbackFunction {
        this.subscribers16.push(callback);
        if (!this.interval16) {
            this.interval16 = setInterval(() => this.executeCallback(this.subscribers16), 16);
        }
        return () => this.removeCallback(callback, this.subscribers16, this.interval16);
    }

    private removeCallback(callback: CallbackFunction, callbacks: CallbackFunction[], interval: NodeJS.Timeout | null): void {
        callbacks.splice(callbacks.indexOf(callback), 1);
        if (callbacks.length === 0) {
            clearInterval(interval);
        }
    }

    private executeCallback(callbacks: CallbackFunction[]): void {
        callbacks.forEach(callback => callback());
    }
}

export default IntervalService.getInstance();