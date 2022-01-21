<template>
    <div style="width: 400px; height: 400px">
        <canvas id="myChart"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js/auto'

    export default {
        name: "BarChart",
        data() {
            return {
                labels: [
                    'Wins',
                    'Losses',
                ],
                chart: null,
            }
        },
        watch: {
            values() {
                if (this.chart !== null) {
                    this.chart.data.datasets[0].data = this.values;
                    this.chart.update();
                }
            }
        },
        props: ['values'],
        methods: {
            drawChart() {
                const data = {
                    labels: this.labels,
                    datasets: [{
                        label: 'Simulation Results (%)',
                        backgroundColor: ['black'],
                        data: this.values,
                    }]
                };

                const config = {
                    type: 'bar',
                    data: data,
                    options: {
                        maintainAspectRatio: false,
                        animation: false,
                        scales: {
                            y: {
                                min: 0,
                                max: 100
                            }
                        }
                    }
                };

                this.chart = new Chart(
                    document.getElementById('myChart'),
                    config
                );
            },
        },
        mounted() {
            console.log('mounted', this.values);
            this.drawChart();
        },
    };
</script>