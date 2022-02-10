<template>
    <div class="home">
        <h1>Monty Hall Problem</h1>
        <problem-navigation v-on:show-explanation="toggleExplanation" wikiLink="https://en.wikipedia.org/wiki/Monty_Hall_problem" :showingExplanation="showExplanation"></problem-navigation>
        <div v-if="!showExplanation">
            <Introduction>
                <p>In this game you are given a choice of three doors. Behind one door is a car, behind the other two is nothing. After you choose a door, the host of the game will open one of the other doors, not containing the car. At this point you are given a choice to either keep the same door, or choose the other one. Once you make that choice, the host will open your door revealing whether you've won the car or lost.</p>
                <p><strong>Do you switch your initial choice to the remaining door? Or do you keep the same one? Does it matter?</strong></p>
            </Introduction>
            <p class="buttons">
                <button :disabled="sim.manager.running" type="button" :class="{ 'active': !sim.manager.running }" v-on:click="startPlay">Play!</button>
                <button v-if="wonGame" :disabled="sim.manager.running" :class="{ 'active' : !sim.manager.running, 'this-sim-running' : sim.manager.running && !sim.withSwitch }" v-on:click="simulate(false)" type="button">Simulate - Don't Switch Doors</button>
                <button v-if="wonGame" :disabled="sim.manager.running" :class="{ 'active' : !sim.manager.running, 'this-sim-running' : sim.manager.running && sim.withSwitch }" v-on:click="simulate(true)" type="button">Simulate - Switch Doors</button>
                <button class="active" v-if="sim.manager.running && wonGame" v-on:click="stopSim">Stop Simulation</button>
            </p>
            <MontyGame v-if="playing" v-on:won-game="playerWonGame" :hostOpensDoor="hostOpensDoor" />
            <div class="simulation-display" v-if="showSimResults">
                <p class="simulation-notes"><strong>Simulations ({{sim.withSwitch ? "Switch Doors" : "Don't Switch Doors"}}):</strong> {{sim.manager.runs}} - <strong>Wins:</strong> {{sim.wins}}, <strong>Losses:</strong> {{sim.losses}}</p>
                <div class="bar-charts">
                    <BarChart style="float:left;" :values="getBarChartValues('doors')" :chartId="'doors'" :labels="getBarChartLabels('doors')" :title="'Car Behind Which Door? (%)'"></BarChart>
                    <BarChart style="float: left; margin-left: 10px;" :values="getBarChartValues('wins')" :chartId="'wins'" :labels="getBarChartLabels('wins')" :title="'Wins vs Losses (%)'"></BarChart>
                    <div style="clear: both">&nbsp;</div>
                    <div class="post-sim-information" v-if="sim.manager.runs > 200">
                        <p>The car has a 1&frasl;3 chance of being behind any one door.</p>
                        <p v-if="sim.withSwitch">But did you guess <em>that switching your choice</em> after the host opens an empty one, <em>doubles your chances of winning?</em></p>
                        <p v-else>But did you guess that <em>keeping your original door</em> after the host opens an empty one, <em>cuts your chances of winning in half</em>?</p>
                        <p>Click the "Explanation" button up top to find out why.</p>
                    </div>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div v-else>
            <h2>How it Works</h2>
            <p>In the <strong>Monty Hall game</strong> - loosely based on the game show "Let's Make a Deal", there are three doors in front of you. Behind one of the doors there's a car, and behind the other two there's nothing (or, in the original format, goats). The problem reaches its crux when, after choosing one of the doors, the host opens one of the remaining doors. The odds for <strong>switching vs keeping your original door</strong> are quite surprising, so let's break them down.</p>
            <p>When choosing the first door, <strong>each door has a 1&frasl;3 chance of containing the car</strong>. Picking either one of the doors gives you an equal chance of winning or losing.</p>
            <img class="expl-image" src="~@/assets/monty_hall/doors_expl1.jpg" />
            <p>Once you've picked a door, the host opens one of the remaining doors. Obviously, he would never open the one with the car behind it so <strong>he opens an empty door</strong> instead. If you already have the car, then he'll open a door randomly. At this point, since there are only two doors remaining, the odds have changed. Most people assume that the odds are now 50/50 (or 1&frasl;2) that the car is behind either your door or the remaining door.</p>
            <img class="expl-image" src="~@/assets/monty_hall/doors_expl2.jpg" />
            <p>But is that correct? The actual odds can be calculated using <a href="https://en.wikipedia.org/wiki/Monty_Hall_problem#Bayes'_theorem" target="_blank">Bayes' Theoren</a> or &mdash; way easier, if you ask me &mdash; shown very clearly using a simple table!</p>
            <img class="expl-image" src="~@/assets/monty_hall/doors_expl3.jpg" />
            <p style="text-align: center;"><em>Keep in mind that the host removes one of the empty doors!</em></p>
            <p>It's clear from the above table that <strong>switching the selected door to the remaining door <i>doubles</i> your chances of winning</strong> so you should always switch doors! Sure, sometimes you'll have chosen the correct door, but <em>statistically</em> that only happens once every three games! If wrapping your head around the paradox is hard, you can think about it like this: <strong>Your original door only contains a car 1 in 3 times, but the remaining door contains a car 2 out of 3 times</strong> (only not containing a car when you chose the car with your first choice.)</p>
            <img class="expl-image" src="~@/assets/monty_hall/doors_expl4.jpg" />
            <p><strong>So go ahead and click "Hide Explanation" up at the top of the page to Play the game yourself or simulate {{ sim.manager.maxRuns }} runs!</strong> <i>(You'll need to win the game at least once to run the simulations, but you now have the knowledge to do that easily.)</i></p>
        </div>
    </div>
</template>

<script>
    import ProblemNavigation from './ProblemNavigation.vue';
    import MontyGame from './MontyGame.vue';
    import BarChart from './BarChart.vue';
    import Introduction from './Introduction.vue';

    import * as f from '../funcs.js';
    import { SimManager } from '../SimManager.js';

    export default {
        name: 'MontyHall',
        props: {

        },
        methods: {
            startPlay() {
                this.stopSim();
                this.showSimResults = false;

                this.playing = false;
                setTimeout(() => { this.playing = true; }, 1);
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
                    return [this.sim.wins * 100.0 / this.sim.manager.runs, this.sim.losses * 100.0 / this.sim.manager.runs];
                } else {
                    let dat = [];
                    dat.push(this.sim.carBehindDoor[0] * 100.0 / this.sim.manager.runs);
                    dat.push(this.sim.carBehindDoor[1] * 100.0 / this.sim.manager.runs);
                    dat.push(this.sim.carBehindDoor[2] * 100.0 / this.sim.manager.runs);

                    return dat;
                }
            },
            toggleExplanation() {
                this.showExplanation = !this.showExplanation;
            },
            playerWonGame() {
                this.wonGame = true;
            },
            simulate(withSwitch) {
                if (!this.sim.manager.running) {
                    this.playing = false;
                    this.showSimResults = true;

                    this.sim.wins = 0;
                    this.sim.losses = 0;
                    this.sim.withSwitch = withSwitch;
                    this.sim.carBehindDoor = [0, 0, 0];

                    this.sim.manager.startSim();

                    this.simulateTick();
                }
            },
            stopSim() {
                this.sim.manager.stopSim();
            },
            simulateTick() {
                const carDoor = f.rand(3);
                const firstChoice = f.rand(3);

                this.sim.carBehindDoor[carDoor]++;

                const hostOpens = this.hostOpensDoor(carDoor, firstChoice);

                if (this.sim.withSwitch) {
                    // switch door
                    const finalChoice = [0, 1, 2].find(n => n !== firstChoice && n !== hostOpens);
                    if (finalChoice === carDoor) this.sim.wins++;
                    else this.sim.losses++;
                } else {
                    if (firstChoice === carDoor) this.sim.wins++;
                    else this.sim.losses++;
                }

                this.sim.manager.runNextTick(this.simulateTick);
            },
            hostOpensDoor(carDoor, firstChoice) {
                let hostOpens = 0;
                if (carDoor === firstChoice) { // player picked right door
                    let doorChoice = [0, 1, 2].filter(n => n !== carDoor);
                    hostOpens = doorChoice[f.rand(2)];
                } else {
                    hostOpens = [0, 1, 2].find(n => n !== carDoor && n !== firstChoice);
                }

                return hostOpens;
            },
        },
        components: {
            ProblemNavigation,
            BarChart,
            Introduction,
            MontyGame,
        },
        beforeMount() {
            this.sim.manager = new SimManager();
        },
        data() {
            return {
                playing: false,
                wonGame: false,
                showSimResults: false,
                showExplanation: false,
                sim: {
                    manager: null,
                    wins: 0,
                    losses: 0,
                    withSwitch: false,
                    carBehindDoor: [0, 0, 0],
                },
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>