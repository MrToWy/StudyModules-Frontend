import {Component, Input, OnInit} from '@angular/core';
import {DividerModule} from "primeng/divider";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [
    DividerModule,
    ChartModule
  ],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.sass'
})
export class StatsCardComponent implements OnInit{
  data: any;

  options: any;

  ngOnInit(): void {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
            labels: ['Präsenz', 'Selbststudium'],
            datasets: [
                {
                    data: [50, 350],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.options = {
          responsive: true,
          maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                  position: 'bottom',
                    labels: {
                        color: textColor
                    }
                }
            }
        };
  }

  @Input() title: string | undefined;



}
