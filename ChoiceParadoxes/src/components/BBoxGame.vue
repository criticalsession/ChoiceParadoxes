<template>
    <div class="game">
        <div class="message" v-html="gameMessage"></div>
        <div class="content">
            <div class="step1" v-if="game.step === 1">
                <img class="box clickable" @click="selectedBox(1)" src="~@/assets/bertrands_box/closed_box1.jpg" />
                <img class="box clickable" @click="selectedBox(2)" src="~@/assets/bertrands_box/closed_box2.jpg" />
                <img class="box clickable" @click="selectedBox(3)" src="~@/assets/bertrands_box/closed_box3.jpg" />
            </div>
            <div class="step2" v-if="game.step > 1">
                <div class="box-display">
                    <img src="~@/assets/bertrands_box/open_silver.jpg" v-if="game.step === 5" />
                    <img src="~@/assets/bertrands_box/open_gold.jpg" v-if="game.step === 2" />
                    <img src="~@/assets/bertrands_box/open_goldgold.jpg" v-if="(game.step === 3 || game.step === 4) && game.secondCoin === 2" />
                    <img src="~@/assets/bertrands_box/open_goldsilver.jpg" v-if="(game.step === 3 || game.step === 4) && game.secondCoin === 1" />
                </div>
                <div class="coin-prediction" v-if="game.step === 2">
                    The next coin will be <button v-on:click="takeSecondCoin(2)" type="button" class="active">GOLD</button> <button v-on:click="takeSecondCoin(1)" type="button" class="active">SILVER</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BBoxGame',
        methods: {
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

                this.game.boxes = this.funcFillBoxes();
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
                    this.game.step = 5;
                } else {
                    this.game.step = 2;
                }
            },
            takeSecondCoin(prediction) {
                this.game.secondCoin = this.game.boxes[this.game.selectedBox - 1][0];
                this.game.prediction = prediction;

                if (prediction === this.game.secondCoin) {
                    this.game.step = 3;

                    this.$emit('won-game');

                } else {
                    this.game.step = 4;
                }
            },
            rand(max) {
                return Math.floor(Math.random() * max);
            },
        },
        mounted() {
            this.startPlay();
        },
        computed: {
            gameMessage() {
                let message = '';
                if (this.game.step === 1) {
                    message = 'Each of the 3 boxes below contains 2 coins. <strong>Click on a box to reveal one of its coins.</strong>';
                    message += '<br /><br />If it\'s a <strong>GOLD coin</strong> you will try to guess whether the second coin is also a GOLD coin. You will win if you guess correctly.';
                    message += '<br /><br />If your first coin is a <strong> SILVER coin</strong> you lose immediately.';
                } else if (this.game.step === 2 || this.game.step === 5) {
                    message = 'You open box <strong>#' + this.game.selectedBox + '</strong> and find a <strong>' + this.game.firstCoin + ' coin</strong>.';

                    if (this.game.step === 2) {
                        message += '<br /><br />Think carefully about the odds. Do you think the second coin is going to be a GOLD coin, or a SILVER coin?';
                        message += '<br /><br /><i style="font-size: 0.8rem;">(Reminder: Boxes are assigned a random pair of 2 coins: 2 GOLD, 2 SILVER and 1 GOLD/1 SILVER.)</i>';
                    }
                    else if (this.game.step === 5) {
                        message += '<br /><br /><strong>You lost!</strong> But don\'t worry, just click the "Play!" button to reshuffle the boxes and try again.';
                    }
                } else if (this.game.step === 3) {
                    message = '<strong>You win!</strong> You predicted the second coin would be a <strong>' + (this.game.prediction === 1 ? 'SILVER' : 'GOLD') + ' coin</strong> and it was.<br /><br />';
                    message += 'Now you can either click the "Play!" to try your luck again, or click "Simulate" to run thousands of games automatically.<br /><br />The results might surprise you!';
                } else if (this.game.step === 4) {
                    message = '<strong>You lost!</strong> You predicted the second coin would be a <strong>' + (this.game.prediction === 1 ? 'SILVER' : 'GOLD') + ' coin</strong> but, unfortunately, it wasn\'t.<br /><br />'
                    message += 'But don\'t worry, just click the <strong>"Play!"</strong> button to reshuffle the boxes and try again.';
                }

                return message;
            },
        },
        data() {
            return {
                game: {
                    boxes: [],
                    step: 0,
                    boxSelected: 0,
                    firstCoin: 'GOLD',
                    secondCoin: null,
                    prediction: null,
                },
            };
        },
        props: {
            funcFillBoxes: Function,
        },
    }
</script>

<style scoped>
    .box {
        float: left;
        margin-right: 20px;
        width: 150px;
        margin-top: 10px;
    }

        .box.clickable {
            cursor: pointer;
        }

    .step2 .box {
        float: none;
        width: 80px;
        margin: 10px auto;
    }

    .step1 {
        margin: 0 auto;
        width: 510px;
    }

    .step2 {
        text-align: center;
    }

    .coin-prediction {
        clear: both;
    }

</style>