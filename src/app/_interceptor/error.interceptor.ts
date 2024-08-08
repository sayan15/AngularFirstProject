import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http"
import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr"
import { catchError } from "rxjs";


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const toaster = inject(ToastrService);
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error) {
                switch (error.status) {
                    case 400:
                        toaster.error('Invalid Credentials', error.status.toString());
                        break;
                    case 401:
                        toaster.error('UnAuthoarized', error.status.toString());
                        break;
                    case 404:
                        router.navigate['/not-found'];
                        break;
                    default:
                        toaster.error('Something unexpected went wrong', error.status.toString());
                        break;
                }
            }
            throw error;
        })
    )

}