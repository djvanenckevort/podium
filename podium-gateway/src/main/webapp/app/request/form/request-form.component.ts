/*
 * Copyright (c) 2017. The Hyve and respective contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * See the file LICENSE in the root of this repository.
 *
 */

import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiLanguageService, EventManager } from 'ng-jhipster';
import { RequestFormService } from './request-form.service';
import {
    RequestDetail,
    RequestType,
    PrincipalInvestigator,
    AttachmentService,
    RequestBase,
    RequestService,
    Principal,
    User,
    Attachment
} from '../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestFormSubmitDialogComponent } from './request-form-submit-dialog.component';
import { OrganisationService } from '../../backoffice/modules/organisation/organisation.service';
import { Organisation } from '../../backoffice/modules/organisation/organisation.model';

@Component({
    selector: 'pdm-request-form',
    templateUrl: './request-form.component.html',
    styleUrls: ['request-form.scss']
})

export class RequestFormComponent implements OnInit, AfterContentInit {

    private currentUser: User;

    public requestFormDisabled: boolean;
    public error: string;
    public success: string;
    public requestBase: RequestBase;
    public requestDetail?: RequestDetail;
    public requestTypeOptions: any;
    public availableRequestDrafts: RequestBase[];
    public selectDraft: boolean;
    public selectedDraft: any = null;
    public requestDraftsAvailable: boolean;
    public selectedRequestDraft: RequestBase;

    attachments: Attachment[];

    constructor(private jhiLanguageService: JhiLanguageService,
                private requestFormService: RequestFormService,
                private requestService: RequestService,
                private attachmentService: AttachmentService,
                private route: ActivatedRoute,
                private router: Router,
                private principal: Principal,
                private eventManager: EventManager,
                private organisationService: OrganisationService,
                private modalService: NgbModal) {
        this.jhiLanguageService.setLocations(['request']);
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentUser = account;
            this.requestTypeOptions = RequestType;
            this.initializeRequestForm();
        });
    }

    ngAfterContentInit() {
        this.registerChangeInFilesUploaded();
    }

    initializeRequestForm() {
        if (this.requestFormService.request) {
            this.selectRequestDraft(this.requestFormService.request);
        } else {
            this.initializeBaseRequest();
        }
    }

    registerChangeInFilesUploaded() {
        this.eventManager.subscribe('uploadListModification', (response) => this.loadAttachmentsForRequest());
    }

    loadAttachmentsForRequest() {
        this.attachmentService
            .findAttachmentsForRequest(this.requestBase.uuid)
            .subscribe(
                (attachments) => this.attachments = attachments,
                (error) => this.onError(error)
            );
    }

    initializeBaseRequest() {
        this.requestService.createDraft()
            .subscribe(
                (requestBase) => {
                    this.selectedDraft = requestBase;
                    this.requestBase = requestBase;
                    this.requestBase.organisations = requestBase.organisations || [];
                    this.requestDetail = requestBase.requestDetail;
                    this.requestDetail.requestType = requestBase.requestDetail.requestType || [];
                },
                (error) => this.onError('Error initializing base request')
            );
    }

    updateRequestOrganisations(event: Organisation[]) {
        this.requestBase.organisations = event;
    }

    selectRequestDraft(requestBase: RequestBase) {
        this.requestBase = requestBase;
        this.requestBase.organisations = requestBase.organisations || [];
        this.requestDetail = requestBase.requestDetail || new RequestDetail();
        this.requestDetail.requestType = requestBase.requestDetail.requestType || [];
        this.requestDetail.principalInvestigator =
            requestBase.requestDetail.principalInvestigator || new PrincipalInvestigator();
    }

    updateRequestType(selectedRequestType, event) {
        let _idx = this.requestDetail.requestType.indexOf(selectedRequestType.value);
        if ( _idx < 0) {
            this.requestDetail.requestType.push(selectedRequestType.value);
        } else {
            this.requestDetail.requestType.splice(_idx, 1);
        }
    }

    saveRequestDraft() {
        this.requestBase.requestDetail = this.requestDetail;
        this.requestBase.requestDetail.principalInvestigator = this.requestDetail.principalInvestigator;
        this.requestService.saveDraft(this.requestBase)
            .subscribe(
                (requestBase) => this.onSuccess(requestBase),
                (error) => this.onError(error)
            );
    }

    confirmSubmitModal(request: RequestBase) {
        let modalRef = this.modalService.open(RequestFormSubmitDialogComponent, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.request = request;
        modalRef.result.then(result => {
            console.log(`Closed with: ${result}`);
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
        });
    }

    submitDraft() {
        this.requestBase.requestDetail = this.requestDetail;
        this.requestBase.requestDetail.principalInvestigator = this.requestDetail.principalInvestigator;
        this.requestService.saveDraft(this.requestBase)
            .subscribe(
                (request) => this.confirmSubmitModal(request),
                (error) => this.onError(error)
            );
    }

    private onSuccess(result) {
        this.error =  null;
        this.success = 'SUCCESS';
        window.scrollTo(0, 0);
    }

    private onError(error) {
        this.error =  'ERROR';
        this.success = null;
        window.scrollTo(0, 0);
    }

}
