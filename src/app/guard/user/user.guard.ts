import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const userGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const toastr = inject(ToastrService)

  if (sessionStorage.getItem("uid") == null) {
    toastr.error("UnAuthorized Access", 'Please Login First')
    router.navigateByUrl("/login")
    return false;
  }
  else {
    return true;
  }


};
