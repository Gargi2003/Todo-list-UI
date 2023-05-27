import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  donutChart: any;
  // donutChart1: any;
  barChart:any;
  ngOnInit() {
    this.createDonutChart();
    this.createBarChart()
  }

  createDonutChart() {
    const donutChartData = {
      labels: ['Red', 'Blue'],
      datasets: [{
        data: [10, 20],
        backgroundColor: ['#ce99ff', '#400080'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }]
    };
  
    this.donutChart = new Chart('donutChart', {
      type: 'doughnut',
      data: donutChartData,
      options: {
        responsive: true,
      }
    });

  }

  createBarChart() {
    const barChartData = {
      labels: ['January', 'February', 'March','April','May'],
      datasets: [{
        data: [10, 1000, 30,10, 1000],
        borderColor: '#990099',
        backgroundColor: ['#990099', '#990099', '#990099','#990099','#990099'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#990099','#990099']
      }]
    };
  
    this.barChart = new Chart('barChart', {
      type: 'line',
      data: barChartData,
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false, // Remove x-axis grid lines
            },
          },
          y: {
            grid: {
              display: false, // Remove y-axis grid lines
            },
          },
        },
      },
      
    });
  }
  
}
