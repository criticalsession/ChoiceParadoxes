<template>
    <div class="home">
        <h1>Bertrand's Box Paradox</h1>
        <problem-navigation v-on:show-explanation="toggleExplanation" wikiLink="https://en.wikipedia.org/wiki/Bertrand's_box_paradox" :showingExplanation="showExplanation" />
        <div v-if="!showExplanation">
            <Introduction>
                <p>There are three boxes. One box contains 2 gold coins, one contains 2 silver coins, and one contains 1 silver and 1 gold coin. You pick a box and one coin from the box. If it's gold...</p>
                <p><strong>...what are the odds that the second coin is also gold?</strong></p>
            </Introduction>
            <p class="buttons">
                <button v-on:click="startPlay" :disabled="sim.running" type="button" :class="{ 'active' : !sim.running}">Play!</button>
                <button :disabled="sim.running" :class="{ 'active' : !sim.running, 'this-sim-running' : sim.running } " v-if="wonGame" v-on:click="simulate()" type="button">Simulate</button>
                <button class="active" v-if="sim.running && wonGame" v-on:click="stopSim">Stop Simulation</button>
            </p>
            <BBoxGame v-if="playing" v-on:won-game="playerWonGame" :funcFillBoxes="fillBoxes" />
            <div class="simulation-display" v-if="showSimResults">
                <p class="simulation-notes"><strong>Simulations:</strong> {{sim.manager.runs}} - First Coin: {{sim.firstGold}} gold, {{sim.firstSilver}} silver; of those gold, the second coin was: {{sim.secondGold}} gold, {{sim.secondSilver}} silver</p>
                <div class="bar-charts">
                    <BarChart style="float:left" :values="getBarChartValues('goldvsilver')" :chartId="'goldvsilver'" :labels="getBarChartLabels('goldvsilver')" :title="'First Coin Type (%)'"></BarChart>
                    <BarChart style="float:left; margin-left: 10px;" :values="getBarChartValues('twogold')" :chartId="'twogold'" :labels="getBarChartLabels('twogold')" :title="'Second Coin After First Gold (%)'"></BarChart>
                    <div style="clear: both">&nbsp;</div>
                    <div class="post-sim-information" v-if="sim.manager.runs > 200">
                        <p>Finding that first GOLD coin is a 50/50 chance.</p>
                        <p>But did you guess that a second GOLD coin is twice as likely as a SILVER one?<br />Or did you think it's also 50/50?</p>
                        <p>Click the "Explanation" button up top to find out why.</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>How it Works</h2>
            <p>In the Bertrand's Box game you are given three boxes. Each of these boxes contains a combination of two coins: <strong>one contains 2 gold coins, one contains 2 silver coins and one contains 1 gold coin and 1 silver coin</strong>. The first step is to pick one of the boxes and then uncover (or take) one of the coins.</p>
            <img class="expl-image" src="~@/assets/bertrands_box/boxes_expl1.jpg" />
            <p><strong>The odds of finding a gold coin at this point are 1&frasl;2</strong>. You can work it out as if all coins are <i>not</i> separated in different boxes: there are 3 gold coins and 3 silver coins which gives you equal odds to pick one or the other.</p>
            <img class="expl-image" src="~@/assets/bertrands_box/boxes_expl2.jpg" />
            <p>The tricky part comes when it's time to calculate the odds that the second coin is also gold. Most people guess that it's also 1&frasl;2 &mdash; after all, if you found a gold coin then there are only two options: either you picked the box with 2 gold coins or you picked the box with 1 gold and 1 silver so you're left with either 1 remaining gold coin or 1 remaining silver coin.</p>
            <img class="expl-image" src="~@/assets/bertrands_box/boxes_expl3.jpg" />
            <p>The problem with that line of thinking (perhaps already becoming apparent by the above drawing) is that <strong>players miss the fact that one of the boxes has 2 gold coins and they could have picked either one!</strong> Writing out all the possible scenarios where a player picks a gold coin first makes this much clearer... drawing them is better!</p>
            <img class="expl-image" src="~@/assets/bertrands_box/boxes_expl4.jpg" />
            <p>The obvious conclusion then is that <strong>the odds of finding another gold coin are double that of finding a silver coin</strong>, which can be easily verified by running the simulation on this page. <strong>So go ahead and click "Hide Explanation" up at the top of the page to Play the game yourself or simulate {{ sim.manager.maxRuns }} runs!</strong> <i>(You'll need to win the game at least once to run the simulations, but you now have the knowledge to do that easily.)</i></p>
        </div>
        <div style="clear: both"></div>
    </div>
</template>

<script>
    import ProblemNavigation from './ProblemNavigation.vue';
    import BarChart from './BarChart.vue';
    import Introduction from './Introduction.vue';
    import BBoxGame from './BBoxGame.vue';

    import * as f from '../funcs.js';
    import { SimManager } from '../SimManager.js';

    export default {
        name: 'BertrandsBox',
        components: {
            ProblemNavigation,
            BarChart,
            Introduction,
            BBoxGame,
        },
        methods: {
            toggleExplanation() {
                this.showExplanation = !this.showExplanation;
            },
            startPlay() {
                this.stopSim();
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
                    return [this.sim.firstGold * 100.0 / this.sim.manager.runs, this.sim.firstSilver * 100.0 / this.sim.manager.runs];
                } else {
                    return [this.sim.secondGold * 100.0 / this.sim.firstGold, this.sim.secondSilver * 100.0 / this.sim.firstGold];
                }
            },
            simulate() {
                if (!this.sim.running) {
                    this.playing = false;
                    this.showSimResults = true;

                    this.sim.secondGold = 0;
                    this.sim.secondSilver = 0;
                    this.sim.firstGold = 0;
                    this.sim.firstSilver = 0;

                    this.sim.manager.startSim();

                    this.simulateTick();
                }
            },
            stopSim() {
                this.sim.manager.stopSim();
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
                const boxes = this.fillBoxes();
                const chosenBox = this.chooseBox(boxes);
                if (chosenBox !== [1, 1]) {
                    const chosenCoinIndex = f.rand(2);
                    const coin = chosenBox[chosenCoinIndex];
                    if (coin === 2) {
                        this.sim.firstGold++;

                        // take next coin
                        const nextCoin = chosenCoinIndex === 0 ? 1 : 0;
                        if (chosenBox[nextCoin] === 2) {
                            this.sim.secondGold++;
                        } else {
                            this.sim.secondSilver++;
                        }
                    } else {
                        this.sim.firstSilver++;
                    }
                } else {
                    this.sim.firstSilver++;
                }

                this.sim.manager.runNextTick(this.simulateTick);
            },
            chooseBox(boxes) {
                return boxes[f.rand(3)];
            },
            playerWonGame() {
                this.wonGame = true;
            },
        },
        beforeMount() {
            this.sim.manager = new SimManager();
        },
        data() {
            return {
                sim: {
                    firstGold: 0,
                    firstSilver: 0,
                    secondGold: 0,
                    secondSilver: 0,
                },
                wonGame: false,
                showSimResults: false,
                playing: false,
                showExplanation: false,
            };
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>