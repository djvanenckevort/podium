/*
 * Copyright (c) 2017. The Hyve and respective contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * See the file LICENSE in the root of this repository.
 *
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PodiumGatewaySharedModule } from '../shared/shared.module';
import { BackofficeRoutingModule } from './backoffice.routing';

@NgModule({
    imports: [
        PodiumGatewaySharedModule,
        BackofficeRoutingModule
    ],
    providers: [],
    exports: [
        PodiumGatewaySharedModule,
        RouterModule
    ]
})
export class PodiumGatewayBackofficeModule {}
