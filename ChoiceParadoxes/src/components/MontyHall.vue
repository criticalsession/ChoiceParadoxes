<template>
    <div class="home">
        <h1>Monty Hall Problem</h1>
        <problem-navigation v-on:show-explanation="showExplanation" wikiLink="https://en.wikipedia.org/wiki/Monty_Hall_problem"></problem-navigation>
        <h2>Play the Game</h2>
        <p>In this game you are given a choice of three doors. Behind one door is a car, behind the other two is nothing. After you choose a door, the host of the game will open one of the other doors, not containing the car. At this point you are given a choice to either keep the same door, or choose the other one. Once you make that choice, the host will open your door revealing whether you've won the car or lost.</p>
        <div class="game">

        </div>
        <div v-if="playedGame" class="simulation">
            <button :disabled="simRunning" v-on:click="simulate(false)" type="button">Simulate - No Switching</button> <button :disabled="simRunning" v-on:click="simulate(true)" type="button">Simulate Switching</button> <button v-if="simRunning" v-on:click="stopSim">Stop Simulation</button>
        </div>
        <div class="simulation-display" v-if="ranSimOnce">
            <p class="simulation-notes"><strong>Simulations ({{withSwitch ? "Switch Doors" : "Don't Switch Doors"}}):</strong> {{simulationRuns}} - <strong>Wins:</strong> {{wins}}, <strong>Losses:</strong> {{losses}}</p>
            <BarChart :values="getBarChartValues()"></BarChart>
        </div>
        <div style="clear: both"></div>
    </div>
</template>

<script>
    import ProblemNavigation from './ProblemNavigation.vue';
    import BarChart from './BarChart.vue';

    export default {
        name: 'MontyHall',
        props: {

        },
        methods: {
            getBarChartValues() {
                return [this.wins * 100.0 / this.simulationRuns, this.losses * 100.0 / this.simulationRuns];
            },
            doorClass(no) {
                let cl = { };

                if (this.display.carDoor === no) cl.blue = true;
                if (this.display.firstChoice === no) cl.red = true;
                if (this.display.finalChoice === no && this.display.win) cl.green = true;
                if (this.display.finalChoice === no && !this.display.win) cl.orange = true;
                if (this.display.hostOpens === no) cl.pink = true;

                return cl;
            },
            showExplanation() {
                alert('explain');
            },
            simulate(withSwitch) {
                if (!this.simRunning) {
                    this.simRunning = true;
                    this.ranSimOnce = true;

                    this.wait = 500;
                    this.simulationRuns = 0;
                    this.wins = 0;
                    this.losses = 0;
                    this.withSwitch = withSwitch;
                    this.maxRuns = 5000;

                    this.simulateTick();
                }
            },
            stopSim() {
                this.simRunning = false;
            },
            simulateTick() {
                this.simulationRuns++;

                this.display.carDoor = this.rand(3);
                this.display.firstChoice = this.rand(3);

                this.display.hostOpens = this.hostOpensDoor(this.display.carDoor, this.display.firstChoice);

                if (this.withSwitch) {
                    // switch door
                    this.display.finalChoice = [1, 2, 3].find(n => n !== this.display.firstChoice && n !== this.display.hostOpens);
                    if (this.display.finalChoice === this.display.carDoor) {
                        this.wins++;
                        this.display.win = true;
                    }
                    else {
                        this.losses++;
                        this.display.win = false;
                    }
                } else {
                    this.display.finalChoice = this.display.firstChoice;

                    if (this.display.firstChoice === this.display.carDoor) {
                        this.wins++;
                        this.display.win = true;
                    }
                    else {
                        this.losses++;
                        this.display.win = false;
                    }
                }

                if (this.wait > 1) this.wait -= 50;
                else if (this.wait < 0) this.wait = 0;

                if (this.simRunning && this.maxRuns > 1) {
                    this.maxRuns--;
                    setTimeout(this.simulateTick, this.wait);
                } else if (this.maxRuns <= 1) {
                    this.stopSim();
                }
            },
            hostOpensDoor(carDoor, firstChoice) {
                let hostOpens = 0;
                if (carDoor === firstChoice) { // player picked right door
                    let doorChoice = [1, 2, 3].filter(n => n !== carDoor);
                    if (carDoor === 1) doorChoice = [2, 3];
                    else if (carDoor === 2) doorChoice = [1, 3];
                    else doorChoice = [1, 2];

                    hostOpens = doorChoice[this.rand(2) - 1];
                } else {
                    hostOpens = [1, 2, 3].find(n => n !== carDoor && n !== firstChoice);
                }

                return hostOpens;
            },
            rand(max) {
                return Math.floor(Math.random() * max) + 1;
            },
        },
        components: {
            ProblemNavigation,
            BarChart,
        },
        data() {
            return {
                playedGame: true,
                simulationRuns: 0,
                wins: 0,
                losses: 0,
                simRunning: false,
                wait: 500,
                withSwitch: false,
                display: {
                    firstChoice: 0,
                    carDoor: 0,
                    hostOpens: 0,
                    finalChoice: 0,
                    win: false,
                },
                maxRuns: 5000,
                ranSimOnce: false,
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .door {
        float: left;
        width: 100px;
        height: 100px;
        text-align: center;
        box-sizing: border-box;
        margin-left: 20px;
        padding-top: 10px;
        border: solid 4px black;
    }
    .legend span {
        display: inline-block;
    }
    .blue {
        background-color: darkblue;
        color: white;
    }
    .red {
        background-color: darkred;
        color: white;
    }
    .orange {
        background-color: orangered;
        color: white;
    }
    .green {
        background-color: green;
        color: white;
    }
    .pink {
        background-color: deeppink;
        color: white;
    }
</style>