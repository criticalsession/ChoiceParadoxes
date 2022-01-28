<template>
    <div class="home">
        <h1>Monty Hall Problem</h1>
        <problem-navigation v-on:show-explanation="showExplanation" wikiLink="https://en.wikipedia.org/wiki/Monty_Hall_problem"></problem-navigation>
        <h2>Instructions</h2>
        <Instructions>
            <p>In this game you are given a choice of three doors. Behind one door is a car, behind the other two is nothing. After you choose a door, the host of the game will open one of the other doors, not containing the car. At this point you are given a choice to either keep the same door, or choose the other one. Once you make that choice, the host will open your door revealing whether you've won the car or lost.</p>
            <p><strong>Do you switch your initial choice to the remaining door? Or do you keep the same one? Does it matter?</strong></p>
        </Instructions>
        <p class="buttons">
            <button :disabled="simRunning" type="button" :class="{ 'active': !simRunning }" v-on:click="startPlay">Play!</button>
            <button v-if="playedGame" :disabled="simRunning" :class="{ 'active' : !simRunning, 'this-sim-running' : simRunning && !this.withSwitch }" v-on:click="simulate(false)" type="button">Simulate - Don't Switch Doors</button>
            <button v-if="playedGame" :disabled="simRunning" :class="{ 'active' : !simRunning, 'this-sim-running' : simRunning && this.withSwitch }" v-on:click="simulate(true)" type="button">Simulate - Switch Doors</button>
            <button class="active" v-if="simRunning && playedGame" v-on:click="stopSim">Stop Simulation</button>
        </p>
        <div class="game">

        </div>
        <div class="simulation-display" v-if="showSimResults">
            <p class="simulation-notes"><strong>Simulations ({{withSwitch ? "Switch Doors" : "Don't Switch Doors"}}):</strong> {{simulationRuns}} - <strong>Wins:</strong> {{wins}}, <strong>Losses:</strong> {{losses}}</p>
            <div class="bar-charts">
                <BarChart style="float:left;" :values="getBarChartValues('doors')" :chartId="'doors'" :labels="getBarChartLabels('doors')" :title="'Car Behind Which Door? (%)'"></BarChart>
                <BarChart style="float: left; margin-left: 10px;" :values="getBarChartValues('wins')" :chartId="'wins'" :labels="getBarChartLabels('wins')" :title="'Wins vs Losses (%)'"></BarChart>
            </div>
        </div>
        <div style="clear: both"></div>
    </div>
</template>

<script>
    import ProblemNavigation from './ProblemNavigation.vue';
    import BarChart from './BarChart.vue';
    import Instructions from './Instructions.vue';

    export default {
        name: 'MontyHall',
        props: {

        },
        methods: {
            startPlay() {
                alert('play!');
            },
            getBarChartLabels(which) {
                if (which === 'wins') {
                    return ['wins', 'losses'];
                } else {
                    return ['Door 1', 'Door 2', 'Door 3'];
                }
            },
            getBarChartValues(which) {
                if (which === 'wins') {
                    return [this.wins * 100.0 / this.simulationRuns, this.losses * 100.0 / this.simulationRuns];
                } else {
                    let dat = [];
                    dat.push(this.carBehindDoor[0] * 100.0 / this.simulationRuns);
                    dat.push(this.carBehindDoor[1] * 100.0 / this.simulationRuns);
                    dat.push(this.carBehindDoor[2] * 100.0 / this.simulationRuns);

                    return dat;
                }
            },
            showExplanation() {

            },
            simulate(withSwitch) {
                if (!this.simRunning) {
                    this.simRunning = true;
                    this.showSimResults = true;

                    this.wait = 500;
                    this.simulationRuns = 0;
                    this.wins = 0;
                    this.losses = 0;
                    this.withSwitch = withSwitch;
                    this.maxRuns = 3000;

                    this.simulateTick();
                    this.carBehindDoor = [0, 0, 0];
                }
            },
            stopSim() {
                this.simRunning = false;
            },
            simulateTick() {
                this.simulationRuns++;

                const carDoor = this.rand(3);
                const firstChoice = this.rand(3);

                this.carBehindDoor[carDoor - 1]++;

                const hostOpens = this.hostOpensDoor(carDoor, firstChoice);

                if (this.withSwitch) {
                    // switch door
                    const finalChoice = [1, 2, 3].find(n => n !== firstChoice && n !== hostOpens);
                    if (finalChoice === carDoor) {
                        this.wins++;
                    }
                    else {
                        this.losses++;
                    }
                } else {
                    if (firstChoice === carDoor) {
                        this.wins++;
                    }
                    else {
                        this.losses++;
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
            Instructions,
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
                maxRuns: 300,
                showSimResults: false,
                carBehindDoor: [0,0,0],
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