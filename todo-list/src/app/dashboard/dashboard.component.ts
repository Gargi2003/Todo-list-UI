import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userId: any;
  selectedYear: string = '2023'; // Initialize as an empty string
  taskCountByDay: { [key: string]: number } = {};

  tasks: any;
  years: string[] = [];
  createdByMonth: any[] = [];
  taskCountByMonth: { [key: string]: number } = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  donutChart: any;
  barChart: any;
  lineChart: any;
  completeCount = 0
  pendingCount = 0
  totalCount = 0
  ngOnInit() {


    // Get the userId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      // Make the API request to fetch tasks for the specific user
      this.getTasks();
    });

  }
  selectYear(year: string) {
    this.selectedYear = year;
    this.getTasks(); // Call getTasks() to update the charts based on the selected year
  }
  getTasks() {
    // Add the userId to the API request headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };

    // Make the API request to fetch tasks for the specific user
    this.http.get<any[]>(`http://localhost:8081/tasks/list`, httpOptions).subscribe(
      (response) => {
        this.tasks = response;
        this.createLineChart(this.tasks);
        this.years = this.getUniqueYears(this.tasks);
        console.log(this.selectedYear);
        // Filter tasks based on the selected year
        const filteredTasks = this.selectedYear
          ? this.tasks.filter((task: any) => {
            const createdDate = new Date(task.created_at);
            return createdDate.getFullYear().toString() === this.selectedYear;
          })
          : this.tasks;

        const counts: { [key: number]: number } = {};
        for (let i = 0; i < filteredTasks.length; i++) {
          // Logic for counting tasks by month
          const createdDate = new Date(this.tasks[i].created_at);
          const month = createdDate.getMonth();
          if (counts[month]) {
            counts[month]++;
          } else {
            counts[month] = 1;
          }
          this.createdByMonth[i] = this.tasks[i].created_at;

          // Logic for donut chart
          if (this.tasks[i].completed) this.completeCount++;
          else this.pendingCount++;
        }
        this.totalCount = this.completeCount + this.pendingCount;
        this.createDonutChart();

        const monthLabels = Object.keys(counts).map((monthIndex) => {
          const monthLabel = this.getMonthLabel(+monthIndex);
          return monthLabel;
        });
        const monthData = Object.values(counts);
        this.createBarChart(monthLabels, monthData);
      },
      (error) => {
        // Handle error case, show an error message or perform other actions
      }
    );
  }
  getMonthLabel(monthIndex: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  }

  getUniqueYears(tasks: any[]): string[] {
    const yearsSet = new Set<string>();
    tasks.forEach((task: any) => {
      const createdDate = new Date(task.created_at);
      yearsSet.add(createdDate.getFullYear().toString());
    });
    return Array.from(yearsSet);
  }
  

  createDonutChart() {
      // Destroy the existing chart if it exists
      if (this.donutChart) {
        this.donutChart.destroy();
      }
    const donutChartData = {
      labels: ['Completed', 'Pending'],
      datasets: [{
        data: [this.completeCount, this.pendingCount],
        backgroundColor: ['#009999', '#00e6e6'],
        hoverBackgroundColor: ['#009999', '#00e6e6']
      }]
    };

    this.donutChart = new Chart('donutChart', {
      type: 'doughnut',
      data: donutChartData,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'All tasks by completion status'
          }
        }
      }
    });

  }

  createBarChart(labels: string[], data: number[]) {
    // Destroy the existing chart if it exists
    if (this.barChart) {
      this.barChart.destroy(); 
    }
    const barChartData = {
      labels: labels,
      datasets: [{
        data: data,
        borderColor: '#3399ff',
        backgroundColor: '#3399ff',
        hoverBackgroundColor: '#36A2EB',
      }]
    };

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: barChartData,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'No. of tasks created per month for the year '
          }
        },
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
  createLineChart(tasks: any[]) {
    // Destroy the existing chart if it exists
    if (this.lineChart) {
      this.lineChart.destroy();
    }
  
    // Count the number of tasks created per day
    const taskCountByDay: { [key: string]: number } = {};
    tasks.forEach((task: { created_at: string }) => {
      const date = new Date(task.created_at);
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = date.getUTCDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD"
  
      if (taskCountByDay[formattedDate]) {
        taskCountByDay[formattedDate]++;
      } else {
        taskCountByDay[formattedDate] = 1;
      }
    });
  
    // Extract the dates and counts from the taskCountByDay object
    const dates = Object.keys(taskCountByDay);
    const counts = Object.values(taskCountByDay);
  
    const lineChartData = {
      labels: dates,
      datasets: [
        {
          data: counts,
          borderColor: '#ff9900',
          backgroundColor: '#ff9900',
          hoverBackgroundColor: '#ff9900',
        },
      ],
    };
  
    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: lineChartData,
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
