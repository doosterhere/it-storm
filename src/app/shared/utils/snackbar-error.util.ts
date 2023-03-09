import { MatSnackBar } from "@angular/material/snack-bar";

import { DefaultResponseType } from "../../../types/default-response.type";

export class SnackbarErrorUtil {
  static showErrorMessageIfErrorAndThrowError(data: DefaultResponseType, _snackBar: MatSnackBar): void {
    if (data.error) {
      const message = (data as DefaultResponseType).message;
      _snackBar.open(message);
      throw new Error(message);
    }
  }
}
