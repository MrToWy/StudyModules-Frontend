import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
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
export class StatsCardComponent implements OnChanges {
  data: any;
  options: any;

  @Input() hoursPresence: any;
  @Input() hoursSelf: any;

  initializeChart() {
    const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
            labels: ['Präsenz', 'Selbststudium'],
            datasets: [
                {
                    data: [this.hoursPresence, this.hoursSelf],
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


  ngOnChanges(changes: SimpleChanges): void {
      if (changes['hoursPresence'] || changes['hoursSelf']) {
        this.initializeChart();
      }
  }

  @Input() title: string | undefined;
}
