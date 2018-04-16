import React from 'react';
import { Line as LineChart } from 'react-chartjs-2';
import axios from 'axios';

class DayChart extends React.Component {

    constructor(){
        super();

        this.state = {
            chartData: {},
            loading: false,
            error: null
        }
    }

    componentWillMount(){
        const currency = this.props.currency;
        console.log(currency);
        this.fetchChartData(currency);
    }

    fetchChartData(currency) {

        if(currency) {
            axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${currency}&tsym=USD&limit=30&aggregate=1&e=CCCAGG`)
                .then((response) => {
                    const newData = this.reconstructObject(response.data.Data);
                    
                    this.setState({
                        chartData: newData,    
                        loading: false,
                        error: null
                    })
                })
                .catch((error) => {
                    this.setState({
                        loading: false,
                        error: error.response.data.Message
                    })
                });
        }
    }

    reconstructObject(currencyData){

        var chartLabels = [];
        var chartHighestData = [];
        var chartLowestData = [];
        currencyData.map((data) => {
            
            const newDate = new Intl.DateTimeFormat('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: '2-digit' 
              }).format(new Date(data.time*1000));

              chartLabels.push(newDate);
              chartHighestData.push(data.high);
              chartLowestData.push(data.low);
        })        
        
        const data = {
            labels: chartLabels,
            datasets: [
              {
                label: 'Highest',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#3cd483',
                borderColor: '#3cd483',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255,105,180,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#3cd483',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: chartHighestData
              },
              {
                label: 'Lowest',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#d64d96',
                borderColor: '#d64d96',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#d64d96',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: chartLowestData
              }
            ]
        };
        
        return data;
    }

    render(){
        console.log(this.state.chartData);
        return (
            <div>
                <LineChart data={this.state.chartData} width={400} height={150}/>
            </div>
        )
    }
}

export default DayChart;