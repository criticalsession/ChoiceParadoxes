<template>
    <div class="game">
        <div class="message" v-html="gameMessage"></div>
        <div class="content">
            <div class="step" v-if="step === 1">
                <div class="door" v-on:click="pickFirstDoor(0)">1</div>
                <div class="door" v-on:click="pickFirstDoor(1)">2</div>
                <div class="door" v-on:click="pickFirstDoor(2)">3</div>
            </div>
            <div class="step" v-if="step === 2">
                <div class="door" v-on:click="pickFinalDoor(0)" :class="{ 'disabled' : hostDoor === 0 }">{{ hostDoor === 0 ? 'X' : '1' }}</div>
                <div class="door" v-on:click="pickFinalDoor(1)" :class="{ 'disabled' : hostDoor === 1 }">{{ hostDoor === 1 ? 'X' : '2' }}</div>
                <div class="door" v-on:click="pickFinalDoor(2)" :class="{ 'disabled' : hostDoor === 2 }">{{ hostDoor === 2 ? 'X' : '3' }}</div>
            </div>
            <div class="step" v-if="step === 3">
                <div class="door disabled">{{ carDoor === 0 ? 'this' : 'X' }}</div>
                <div class="door disabled">{{ carDoor === 1 ? 'this' : 'X' }}</div>
                <div class="door disabled">{{ carDoor === 2 ? 'this' : 'X' }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as f from '../funcs.js';

    export default {
        name: 'MontyGame',
        methods: {
            resetGame() {
                this.doors = [0, 0, 0];
                this.step = 0;
                this.doorSelected = 0;
                this.hostDoor = 0;
                this.switchedDoor = false;
                this.winResult = false;
            },
            startPlay() {
                this.resetGame();

                this.doors[f.rand(3)] = 1;

                this.step = 1;
            },
            pickFirstDoor(door) {
                this.doorSelected = door;
                this.hostDoor = this.hostOpensDoor(this.carDoor, this.doorSelected);
                console.log(this.doors);

                this.step = 2;
            },
            pickFinalDoor(door) {
                if (door === this.hostDoor) return;

                this.switchedDoor = (door !== this.doorSelected);
                this.doorSelected = door;

                if (this.doorSelected === this.carDoor) {
                    this.winResult = true;
                    this.$emit('won-game');
                } else {
                    this.winResult = false;
                }

                this.step = 3;
            },
        },
        mounted() {
            this.startPlay();
        },
        computed: {
            gameMessage() {
                let message = '';
                if (this.step === 1) {
                    message = 'There are 3 DOORS. <strong>1 contains a car, 2 contain nothing.</strong>';
                    message += '<br /><br />Pick one.'
                    message += '<br /><br /><em>The host will open one of the other doors and you\'ll then have the choice to switch or keep the same door.</em>';
                } else if (this.step === 2) {
                    message = 'You have chosen <strong>DOOR ' + (this.doorSelected + 1) + '</strong>.';
                    message += '<br /><br />The host strolls over to <strong>DOOR ' + (this.hostDoor + 1) + '</strong> and opens it to reveal... nothing.';
                    message += '<br /><br />Turning to you he asks "Do you want to keep your door? Or would you like to choose the remaining one?"';
                    message += '<br /><br />Click on <strong>DOOR ' + (this.doorSelected + 1) + '</strong> to keep the same door, or <strong>DOOR ' + (this.remainingDoor + 1) + '</strong> to switch.';
                    message += '<br /><br /><em>Does changing the door at this point matter? Isn\'t the car still wherever it was earlier? Do your odds change?</em>.'
                } else if (this.step === 3) {
                    message = 'You think about it and decide to ';
                    if (this.switchedDoor) {
                        message += '<strong>switch.</strong>';
                    } else {
                        message += '<strong>stick to your original choice.</strong>';
                    }

                    message += '<br /><br />The host opens <strong>DOOR ' + (this.doorSelected + 1) + '</strong> to reveal';

                    if (this.winResult) {
                        message += '...a car! <strong>You won, congratulations!!</strong><br /><br />Now you can either click the "Play!" button to try your luck again, or click "Simulate" to run thousands of games automatically.<br /><br />The results might surprise you!';
                    } else {
                        message += '...nothing. Unfortunately, the car was behind the other door this time.<br /><br />But don\'t worry, you can click the <strong>"Play!"</strong> button to try again!';
                    }
                }

                return message;
            },
            remainingDoor() {
                let doorCheck = [0, 0, 0];
                doorCheck[this.hostDoor] = 1;
                doorCheck[this.doorSelected] = 2;

                return doorCheck.indexOf(0);
            },
            carDoor() {
                return this.doors.indexOf(1);
            },
        },
        data() {
            return {
                doors: [0, 0, 0],
                step: 0,
                doorSelected: 0,
                hostDoor: 0,
                switchedDoor: false,
                winResult: false,
            };
        },
        props: {
            hostOpensDoor: Function,
        },
    }
</script>

<style scoped>
    .step {
        width: 660px;
        margin: 0 auto;
        text-align: center;
    }

    .door {
        height: 300px; width: 200px;
        margin: 0 10px;
        cursor: pointer;
        float: left;
        background-color: #aaa;
        color: white;
    }

    .door.disabled {
        background-color: #eee;
        color: black;
        cursor: not-allowed;
    }
</style>