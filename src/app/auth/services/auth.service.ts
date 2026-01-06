//aservice
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'cheking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;


@Injectable({ providedIn: 'root' })
export class AuthService {

    private _authStatus = signal<AuthStatus>('cheking');
    private _user = signal<User | null>(null);
    //siempre se crea
    private _token = signal<string | null>(localStorage.getItem('tokenEco'));

    private http = inject(HttpClient);

    //rxresource apenas se injecte la 1ra ves se dispara
    checkStatusResource = rxResource({
        loader: () => this.checkStatus()
    })

    //getter /
    //compouted solo lectura
    authStatus = computed<AuthStatus>(() => {
        if (this._authStatus() === 'cheking') return 'cheking';


        if (this._user()) {
            return 'authenticated';
        }

        return 'not-authenticated';
    });

    //no se comunica por fuera
    user = computed<User | null>(() => this._user());

    token = computed(() => this._token());

    isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);


    login(email: string, password: string): Observable<boolean> {
        return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
            email: email,
            password: password
        }).pipe(
            //tap efectos secundarios
            map(resp =>
                this.handleAuthSuccess(resp)),

            catchError((error: any) => this.HandleAuthError(error))
        );
    }

    private statusCache = new Map<string, boolean>();

    checkStatus(): Observable<boolean> {

        const token = localStorage.getItem('tokenEco');
        if (!token) {
            this.logout();
            return of(false);
        }

        // llave única: el token
        const key = token;
        if (this.statusCache.has(key)) {
            return of(this.statusCache.get(key)!);
        }

        //new 
        return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`).pipe(
            map(resp => this.handleAuthSuccess(resp)),
            tap(result => this.statusCache.set(key, result)),
            catchError(err => this.HandleAuthError(err))
        );




        //return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
        /*
        headers: {
            Authorization: `Bearer ${token}`,
        }*/
        //}).pipe(
        //tap efectos secundarios
        //    map(resp => this.handleAuthSuccess(resp)),
        //    catchError((error: any) => this.HandleAuthError(error))
        //)
    }
    logout() {

        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('not-authenticated')

        //tarea
        localStorage.removeItem('tokenEco');
        // limpiar cache
        this.statusCache.clear();

    }

    private handleAuthSuccess({ token, user }: AuthResponse) {
        this._user.set(user);
        this._authStatus.set('authenticated');
        this._token.set(token);

        localStorage.setItem('tokenEco', token);

        return true;
    }

    private HandleAuthError(error: any) {
        this.logout();
        return of(false);
    }

}