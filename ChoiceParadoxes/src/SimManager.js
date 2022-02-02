export class SimManager {
    constructor() {
        this.init();
    }

    init() {
        this.running = false;
        this.maxRuns = 1500;
        this.wait = 500;
        this.runs = 1;
    }

    startSim() {
        this.init();
        this.running = true;
    }

    stopSim() {
        this.running = false;
    }

    getNextTickWait() {
        if (!this.running || this.runs === this.maxRuns) return -1;
        else {
            this.runs++;

            if (this.wait > 1) this.wait -= 50;
            if (this.wait < 0) this.wait = 0;

            return this.wait;
        }
    }

    runNextTick(fn) {
        const nextWait = this.getNextTickWait();
        if (nextWait === -1) this.stopSim();
        else setTimeout(fn, nextWait);
    }
}