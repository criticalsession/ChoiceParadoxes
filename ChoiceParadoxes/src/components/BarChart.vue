<template>
    <div style="width: 400px; height: 200px">
        <canvas :id="chartId"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js/auto'

    export default {
        name: "BarChart",
        data() {
            return {
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
        props: ['values', 'labels', 'title', 'chartId'],
        methods: {
            drawChart() {
                const data = {
                    labels: this.labels,
                    datasets: [{
                        label: this.title,
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
                    document.getElementById(this.chartId),
                    config
                );
            },
        },
        mounted() {
            this.drawChart();
        },
    };
</script>