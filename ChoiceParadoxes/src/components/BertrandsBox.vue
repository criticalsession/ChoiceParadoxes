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
            <button :disabled="simRunning" :class="{ 'active' : !simRunning, 'this-sim-running' : simRunning } " v-if="playedGame" v-on:click="simulate()" type="button">Simulate</button>
            <button class="active" v-if="simRunning && playedGame" v-on:click="stopSim">Stop Simulation</button>
        </p>
        <div class="game" v-if="game.step > 0">
            <div class="message" v-html="gameMessage"></div>
            <div class="content">
                <div class="step1" v-if="game.step === 1">
                    <div class="box active" @click="selectedBox(1)">Box 1</div>
                    <div class="box active" @click="selectedBox(2)">Box 2</div>
                    <div class="box active" @click="selectedBox(3)">Box 3</div>
                </div>
                <div class="step2" v-if="game.step === 2 || game.step === 3 || game.step === 4">
                    <div class="box">Box {{ this.game.selectedBox }}<br />
                    (G) - <span v-if="this.game.secondCoin === null">(?)</span><span v-else>({{ this.game.secondCoin === 1 ? 'S' : 'G' }})</span>
                    </div>
                    <div class="coin-prediction" v-if="game.step === 2">
                        The next coin will be <button v-on:click="takeSecondCoin(2)" type="button" class="active">GOLD</button> <button v-on:click="takeSecondCoin(1)" type="button" class="active">SILVER</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="simulation-display" v-if="ranSimOnce">
            <p class="simulation-notes"><strong>Simulations:</strong> {{simulationRuns}} - First Coin: {{firstGold}} gold, {{firstSilver}} silver; of those gold, the second coin was: {{same}} gold, {{different}} silver</p>
            <div class="bar-charts">
                <BarChart style="float:left" :values="getBarChartValues('goldvsilver')" :chartId="'goldvsilver'" :labels="getBarChartLabels('goldvsilver')" :title="'First Coin Type (%)'"></BarChart>
                <BarChart style="float:left; margin-left: 10px;" :values="getBarChartValues('twogold')" :chartId="'twogold'" :labels="getBarChartLabels('twogold')" :title="'Second Coin After First Gold (%)'"></BarChart>
                <div style="clear: both">&nbsp;</div>
                <p style="clear: both; margin-top: 10px; text-align: center; font-weight: bold;" v-if="simulationRuns > 200">Did you predict that, after a GOLD coin, a second GOLD coin is twice as likely as a SILVER one?<br />Or did you think it's 50/50?<br /><br />Click the "Explanation" button up top to find out why.</p>
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
                    this.resetGame();

                    this.simRunning = true;
                    this.ranSimOnce = true;

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
            resetGame() {
                this.game = {
                    boxes: [],
                    step: 0,
                    boxSelected: 0,
                    firstCoin: null,
                    secondCoin: null,
                    prediction: null,
                };
            },
            startPlay() {
                this.resetGame();

                this.simRunning = false;
                this.ranSimOnce = false;

                this.game.boxes = this.fillBoxes();
                this.game.step = 1;
            },
            selectedBox(box) {
                this.game.selectedBox = box;

                let actualBox = this.game.boxes[box - 1];

                const coinIndex = this.rand(2);
                const coin = actualBox[coinIndex];

                actualBox.splice(coinIndex, 1); //remove the coin

                this.game.firstCoin = coin === 1 ? 'SILVER' : 'GOLD';
                if (coin === 1) {
                    this.game.step = 9;
                } else {
                    this.game.step = 2;
                }
            },
            takeSecondCoin(prediction) {
                this.game.secondCoin = this.game.boxes[this.game.selectedBox - 1][0];
                this.game.prediction = prediction;

                if (prediction === this.game.secondCoin) {
                    this.game.step = 3;
                    this.playedGame = true;
                } else {
                    this.game.step = 4;
                }
            },
        },
        computed: {
            gameMessage() {
                let message = '';
                if (this.game.step === 1) {
                    message = 'Each of the 3 boxes below contains 2 coins. <strong>Click on a box to take one of its coins.</strong>';
                    message += '<br /><br />If it\'s a <strong>GOLD coin</strong> you will try to guess whether the second coin is also a GOLD coin. You will win if you guess correctly.';
                    message += '<br /><br />If your first coin is a <strong> SILVER coin</strong> you lose immediately.';
                } else if (this.game.step === 2 || this.game.step === 9) {
                    message = 'You open box <strong>#' + this.game.selectedBox + '</strong> and take a <strong>' + this.game.firstCoin + ' coin</strong>.';

                    if (this.game.step === 2) {
                        message += '<br /><br />Think carefully about the odds. Do you think the second coin is going to be a GOLD coin, or a SILVER coin?';
                        message += '<br /><br /><i style="font-size: 0.8rem;">(Reminder: Boxes are assigned a random pair of 2 coins: 2 GOLD, 2 SILVER and 1 GOLD/1 SILVER.)</i>';
                    }
                    else if (this.game.step === 9) {
                        message += '<br /><br /><strong>You lost!</strong> But don\'t worry, just click the "Play!" button to reshuffle the boxes and try again.';
                    }
                } else if (this.game.step === 3) {
                    message = '<strong>You win!</strong> You predicted the second coin would be a ' + (this.game.prediction === 1 ? 'SILVER' : 'GOLD') + ' coin and it was.<br /><br />';
                    message += 'Now you can either click the "Play!" to try your luck again, or click "Simulate" to run thousands of games automatically.<br /><br />The results might surprise you!';
                } else if (this.game.step === 4) {
                    message = '<strong>You lost!</strong> You predicted the second coin would be a ' + (this.game.prediction === 1 ? 'SILVER' : 'GOLD') + ' coin but, unfortunately, it wasn\'t.<br /><br />'
                    message += 'But don\'t worry, just click the "Play!" button to reshuffle the boxes and try again.';
                }

                return message;
            },
        },
        data() {
            return {
                simulationRuns: 0,
                same: 0,
                different: 0,
                simRunning: false,
                playedGame: false,
                wait: 500,
                maxRuns: 3000,
                ranSimOnce: false,
                firstGold: 0,
                firstSilver: 0,
                game: {
                    boxes: [],
                    step: 0,
                    boxSelected: 0,
                    firstCoin: 'GOLD',
                    secondCoin: null,
                    prediction: null,
                }
            };
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .box {
        float: left;
        cursor: default;
        background-color: #EEE;
        border: solid 1px #CCC;
        padding: 20px;
        margin-right: 10px;
        transition: background-color 0.5s, color 0.5s;
        text-align: center;
    }

    .step2 .box {
        float: none;
        width: 80px;
        margin: 10px auto;
    }

    .box.active {
        cursor: pointer;
    }

    .step1 {
        margin: 0 auto;
        width: 274px;
    }

    .step2 {
        text-align: center;
    }

    .box.active:hover {
        background-color: darkslateblue;
        color: white;
    }

    .coin-prediction {
        clear: both;
    }
</style>