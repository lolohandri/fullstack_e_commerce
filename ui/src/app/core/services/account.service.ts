import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../shared/models/user';
import {map} from 'rxjs';
import {Address} from '../../shared/models/address';
import {LoginDto} from '../../shared/dto/login.dto';
import {RegisterDto} from '../../shared/dto/register.dto';
import {AuthStatus} from '../../shared/types/auth-status.type';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    baseUrl = environment.baseApiUrl;
    private http = inject(HttpClient);
    currentUser = signal<User | null>(null);

    login(loginData: LoginDto){
        let params = new HttpParams();
        params = params.append('useCookies', true);

        return this.http.post(this.baseUrl + 'login', loginData, { params });
    }

    register(registerData: RegisterDto){
        return this.http.post(this.baseUrl + 'account/register', registerData);
    }

    getUserInfo() {
        return this.http.get<User>(this.baseUrl + 'account/getUserInfo').pipe(
        map(user => {
                this.currentUser.set(user);
                return user;
            })
        );
    }

    logout(){
        return this.http.post(this.baseUrl + 'account/logout', {});
    }

    updateAddress(address: Address){
        return this.http.post(this.baseUrl + 'account/address', address);
    }

    getAuthState() {
        return this.http.get<AuthStatus>(this.baseUrl + 'account/getAuthState');
    }
}
