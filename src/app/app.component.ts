import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';
import { environment } from "../environments/environment";
@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'leaderboard';
  page = 1;
  totalPage = 1;
  httpSubscription: Subscription | undefined;
  LeaderboardList: Array<any> | null = [];
  constructor(private readonly httpS: HttpClient){}
  editField = '';
    ngOnInit() {
      this.getLeaderBoardData();
    }
    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }
    getLeaderBoardData () {
      if(this.httpSubscription) {
        this.httpSubscription.unsubscribe();
      }
      this.httpS.get(`${environment.serverUrl}/leaderboard?page=${this.page}`).subscribe((res: any) => {
       const {data, pagination} = res;
       this.totalPage = pagination.totalPage;
       this.LeaderboardList = data;
      });
    }
    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      if (this.LeaderboardList && this.LeaderboardList[id] && this.LeaderboardList[id][property]) {
        this.LeaderboardList[id][property] = editField;
      }
    }
    pagination(event: string) {
      if (event === 'previous') {
        if (this.page > 0) {
          this.page -= 1;
          this.getLeaderBoardData();
        }
      } else {
        if (this.page < this.totalPage) {
          this.page += 1;
          this.getLeaderBoardData();
        }
      }
    }
}
