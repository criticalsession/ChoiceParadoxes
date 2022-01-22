<template>
    <div class="home">
        <h1>Bertrand's Box Paradox</h1>
        <problem-navigation v-on:show-explanation="showExplanation" wikiLink="https://en.wikipedia.org/wiki/Bertrand's_box_paradox"></problem-navigation>
        <Instructions>
            <p>There are three boxes. One box contains 2 gold coins, one contains 2 silver coins, and one contains 1 silver and 1 gold coin. You pick a box and one coin from the box. If it's gold...</p>
            <p><strong>...what are the odds that the second coin is also gold (not silver)?</strong></p>
        </Instructions>
        <p class="buttons">
            <button v-on:click="startPlay" :disabled="simRunning" type="button" :class="{ 'active' : !simRunning}">Play!</button>
            <button :disabled="simRunning" :class="{ 'active' : !simRunning, 'this-sim-running' : simRunning } " v-if="playedGame" v-on:click="simulate()" type="button">Simulate</button>
            <button class="active" v-if="simRunning && playedGame" v-on:click="stopSim">Stop Simulation</button>
        </p>
        <div class="game">

        </div>
        <div class="simulation-display" v-if="ranSimOnce">
            <p class="simulation-notes"><strong>Simulations:</strong> {{simulationRuns}} - First Coin: {{firstGold}} gold, {{firstSilver}} silver; of those gold, the second coin was: {{same}} gold, {{different}} silver</p>
            <div class="bar-charts">
                <BarChart style="float:left" :values="getBarChartValues('goldvsilver')" :chartId="'goldvsilver'" :labels="getBarChartLabels('goldvsilver')" :title="'First Coin Type (%)'"></BarChart>
                <BarChart style="float:left; margin-left: 10px;" :values="getBarChartValues('twogold')" :chartId="'twogold'" :labels="getBarChartLabels('twogold')" :title="'Second Gold After First Gold (%)'"></BarChart>
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
        name: 'BertrandsBox',
        components: {
            ProblemNavigation,
            BarChart,
            Instructions,
        },
        methods: {
            startPlay() {
                alert('play!');
            },
            showExplanation() {

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
                    this.simRunning = true;
                    this.ranSimOnce = true;

                    this.wait = 500;
                    this.simulationRuns = 0;
                    this.same = 0;
                    this.different = 0;
                    this.maxRuns = 5000;
                    this.firstGold = 0;
                    this.firstSilver = 0;

                    this.simulateTick();
                }
            },
            stopSim() {
                this.simRunning = false;
            },
            simulateTick() {
                this.simulationRuns++;

                const boxes = this.fillBoxes();
                const chosenBox = this.chooseBox(boxes);
                if (chosenBox !== [1, 1]) {
                    const chosenCoinIndex = this.rand(2);
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
                return boxes[this.rand(3)];
            },
            fillBoxes() {
                let options = [[1, 1], [1, 2], [2, 2]];
                let boxes = [];

                for (let i = 0; i < 3; i++) {
                    // pick set at random
                    let index = this.rand(options.length);
                    let option = options[index];
                    options.splice(index, 1);

                    boxes.push(option);
                }

                return boxes;
            },
            rand(max) {
                return Math.floor(Math.random() * max);
            },
        },
        data() {
            return {
                simulationRuns: 0,
                same: 0,
                different: 0,
                simRunning: false,
                playedGame: true,
                wait: 500,
                maxRuns: 5000,
                ranSimOnce: false,
                firstGold: 0,
                firstSilver: 0,
            };
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>