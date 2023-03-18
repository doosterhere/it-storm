import { Params } from "@angular/router";

import { ActiveParamsType } from "../../../types/active-params.type";

export class ActiveParamsUtil {
  static processParams(params: Params): ActiveParamsType {
    const activeParams: ActiveParamsType = { categories: [] };

    if (Object.prototype.hasOwnProperty.call( params, 'categories' )) {
      activeParams.categories = Array.isArray( params['categories'] ) ? params['categories'] : [params['categories']];
    }

    if (Object.prototype.hasOwnProperty.call( params, 'page' )) {
      activeParams.page = Number( params['page'] );
    }

    return activeParams;
  }
}
