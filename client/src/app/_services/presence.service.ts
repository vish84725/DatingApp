import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import { from, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) { }

  createHubConnection(user: User){
    this.hubConnection = new HubConnectionBuilder()
            .withUrl(this.hubUrl + 'presence', { accessTokenFactory:  () => user.token})
            .withAutomaticReconnect()
            .build();

    this.hubConnection.start().catch(err => { console.log(err) });

    this.hubConnection.on('UserIsOnline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.onlineUsersSource.next([...usernames,username]);
      });
    });

    this.hubConnection.on('UserIsOffline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe((usernames)=> {
        this.onlineUsersSource.next([...usernames.filter(x => x !== username)]);
      });
    });

    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.next(usernames);
    });

    this.hubConnection.on('NewMessageRecieved', ({username,knownAs}) => {
      this.toastr.info(knownAs + ' has sent you a message!')
        .onTap
        .pipe(take(1))
        .subscribe(() => this.router.navigateByUrl('/members/' + username + '?tab=3'));
    });
  }

  stopHubConnection(){
    this.hubConnection.stop().catch(err => {
      console.log(err);
    });
  }
}
