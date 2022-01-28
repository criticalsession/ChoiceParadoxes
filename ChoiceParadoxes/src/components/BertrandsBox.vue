<template>
    <div class="home">
        <h1>Bertrand's Box Paradox</h1>
        <problem-navigation v-on:show-explanation="showExplanation" wikiLink="https://en.wikipedia.org/wiki/Bertrand's_box_paradox"></problem-navigation>
        <Instructions>
            <p>There are three boxes. One box contains 2 gold coins, one contains 2 silver coins, and one contains 1 silver and 1 gold coin. You pick a box and one coin from the box. If it's gold...</p>
            <p><strong>...what are the odds that the second coin is also gold?</strong></p>
        </Instructions>
        <p class="buttons">
            <button v-on:click="startPlay" :disabled="simRunning" type="button" :class="{ 'active' : !simRunning}">Play!</button>
            <button :disabled="simRunning" :class="{ 'active' : !simRunning, 'this-sim-running' : simRunning } " v-if="wonGame" v-on:click="simulate()" type="button">Simulate</button>
            <button class="active" v-if="simRunning && wonGame" v-on:click="stopSim">Stop Simulation</button>
        </p>
        <BBoxGame v-if="playing" v-on:won-game="playerWonGame" :funcFillBoxes="fillBoxes" />
        <div class="simulation-display" v-if="showSimResults">
            <p class="simulation-notes"><strong>Simulations:</strong> {{simulationRuns}} - First Coin: {{firstGold}} gold, {{firstSilver}} silver; of those gold, the second coin was: {{same}} gold, {{different}} silver</p>
            <div class="bar-charts">
                <BarChart style="float:left" :values="getBarChartValues('goldvsilver')" :chartId="'goldvsilver'" :labels="getBarChartLabels('goldvsilver')" :title="'First Coin Type (%)'"></BarChart>
                <BarChart style="float:left; margin-left: 10px;" :values="getBarChartValues('twogold')" :chartId="'twogold'" :labels="getBarChartLabels('twogold')" :title="'Second Coin After First Gold (%)'"></BarChart>
                <div style="clear: both">&nbsp;</div>
                <div class="post-sim-information" v-if="simulationRuns > 200">
                    <p>Finding that first GOLD coin is obviously a 50/50 chance.</p>
                    <p>But did you guess that a second GOLD coin is twice as likely as a SILVER one?<br />Or did you think it's also 50/50?</p>
                    <p>Click the "Explanation" button up top to find out why.</p>
                </div>
            </div>
        </div>
        <div style="clear: both"></div>
    </div>
</template>

<script>
    import ProblemNavigation from './ProblemNavigation.vue';
    import BarChart from './BarChart.vue';
    import Instructions from './Instructions.vue';
    import BBoxGame from './BBoxGame.vue';
    import * as f from '../funcs.js';

    export default {
        name: 'BertrandsBox',
        components: {
            ProblemNavigation,
            BarChart,
            Instructions,
            BBoxGame,
        },
        methods: {
            showExplanation() {

            },
            startPlay() {
                this.showSimResults = false;
                this.playing = false;
                setTimeout(() => { this.playing = true; }, 1);
            },
            getBarChartLabels(whichOne) {
                if (whichOne === 'goldvsilver') {
                    return ['Gold', 'Silver'];
                } else {
                    return ['Gold', 'Silver'];
                }
            },
            getBarChartValues(whichOne) {
                if (whichOne === 'goldvsilver') {
                    return [this.firstGold * 100.0 / this.simulationRuns, this.firstSilver * 100.0 / this.simulationRuns];
                } else {
                    return [this.same * 100.0 / this.firstGold, this.different * 100.0 / this.firstGold];
                }
            },
            simulate() {
                if (!this.simRunning) {
                    this.playing = false;

                    this.simRunning = true;
                    this.showSimResults = true;

                    this.wait = 500;
                    this.simulationRuns = 0;
                    this.same = 0;
                    this.different = 0;
                    this.maxRuns = 3000;
                    this.firstGold = 0;
                    this.firstSilver = 0;

                    this.simulateTick();
                }
            },
            stopSim() {
                this.simRunning = false;
            },
            fillBoxes() {
                let options = [[1, 1], [1, 2], [2, 2]];
                let boxes = [];

                for (let i = 0; i < 3; i++) {
                    // pick set at random
                    let index = f.rand(options.length);
                    let option = options[index];
                    options.splice(index, 1);

                    boxes.push(option);
                }

                return boxes;
            },
            simulateTick() {
                this.simulationRuns++;

                const boxes = this.fillBoxes();
                const chosenBox = this.chooseBox(boxes);
                if (chosenBox !== [1, 1]) {
                    const chosenCoinIndex = f.rand(2);
                    const coin = chosenBox[chosenCoinIndex];
                    if (coin === 2) {
                        this.firstGold++;

                        // take next coin
                        const nextCoin = chosenCoinIndex === 0 ? 1 : 0;
                        if (chosenBox[nextCoin] === 2) {
                            this.same++;
                        } else {
                            this.different++;
                        }
                    } else {
                        this.firstSilver++;
                    }
                } else {
                    this.firstSilver++;
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
            chooseBox(boxes) {
                return boxes[f.rand(3)];
            },
            playerWonGame() {
                this.wonGame = true;
            },
        },
        data() {
            return {
                simulationRuns: 0,
                same: 0,
                different: 0,
                simRunning: false,
                wonGame: false,
                wait: 500,
                maxRuns: 3000,
                showSimResults: false,
                firstGold: 0,
                firstSilver: 0,
                playing: false,
            };
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>