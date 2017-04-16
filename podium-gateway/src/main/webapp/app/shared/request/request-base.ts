/*
 * Copyright (c) 2017. The Hyve and respective contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * See the file LICENSE in the root of this repository.
 *
 */

import { Request } from './request';
import { User } from '../user/user.model';
import { RequestDetail } from './request-detail';
import { Organisation } from '../../backoffice/modules/organisation/organisation.model';
import { RequestStatusOptions } from './request-status/request-status.constants';

export class RequestBase implements Request {

    dateCreated?: Date = new Date();
    dateLastModified?: Date = new Date();
    uuid?: string;
    id?: string;
    status?: RequestStatusOptions;
    requestDetail?: RequestDetail = new RequestDetail();
    organisations?: Organisation[] = [];
    requester?: User;

    constructor() {
    }

}
