import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';



/*
export const NotAuthenticatedGuard: CanMatchFn = async(
    route: Route,
    
    segments: UrlSegment[]
) => {
    ///console.log('NotAuthenticatedGuard');

    const authService = inject (AuthService);

    const router = inject (Router);

    const isAuthenticated = await firstValueFrom (  authService.checkStatus() );

    //console.log({isAuthenticated});
    
    if(isAuthenticated) {
        //aqui navego
        router.navigateByUrl('/');
        return false;
    }

    return true;
}

*/

export const NotAuthenticatedGuard: CanMatchFn = async(route, segments) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = await firstValueFrom(authService.checkStatus());

    if (isAuthenticated) {
        // AQUÍ USAMOS TU LÓGICA DE ROLES
        if (authService.isAdmin()) {
            router.navigateByUrl('/admin'); // Manda a Camila aquí
        } else {
            router.navigateByUrl('/'); // Manda a Javier aquí
        }
        return false; // Bloquea el acceso a 'auth' porque ya están logueados
    }

    return true; // No están logueados, pueden ver el login
}