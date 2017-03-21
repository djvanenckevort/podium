/*
 * Copyright (c) 2017. The Hyve and respective contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * See the file LICENSE in the root of this repository.
 *
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { SessionStorageService } from 'ng2-webstorage';

import {
    PodiumGatewaySharedLibsModule,
    PodiumGatewaySharedCommonModule,
    CSRFService,
    AuthService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    MessageService,
    Principal,
    HasAnyAuthorityDirective,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    WordLengthValidatorDirective,
    PodiumLoginComponent,
    SpecialismComponent
} from './';
import { AttachmentService } from './attachment/attachment.service';
import { RequestService } from './request/request.service';

@NgModule({
    imports: [
        PodiumGatewaySharedLibsModule,
        PodiumGatewaySharedCommonModule,
        Ng2BreadcrumbModule
    ],
    declarations: [
        PodiumLoginComponent,
        SpecialismComponent,
        EmailValidatorDirective,
        PasswordValidatorDirective,
        WordLengthValidatorDirective,
        HasAnyAuthorityDirective
    ],
    providers: [],
    entryComponents: [PodiumLoginComponent],
    exports: [
        PodiumGatewaySharedCommonModule,
        PodiumGatewaySharedLibsModule,
        PodiumLoginComponent,
        SpecialismComponent,
        EmailValidatorDirective,
        PasswordValidatorDirective,
        WordLengthValidatorDirective,
        HasAnyAuthorityDirective,
        DatePipe,
        Ng2BreadcrumbModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PodiumGatewaySharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PodiumGatewaySharedModule,
            providers: [
                CookieService,
                LoginService,
                LoginModalService,
                MessageService,
                AccountService,
                SessionStorageService,
                StateStorageService,
                Principal,
                CSRFService,
                AuthServerProvider,
                AuthService,
                UserService,
                AttachmentService,
                RequestService,
                DatePipe,
                BreadcrumbService
            ]
        };
    }
}
