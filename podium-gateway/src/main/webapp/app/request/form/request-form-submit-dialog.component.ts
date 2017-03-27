/*
 * Copyright (c) 2017  The Hyve and respective contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * See the file LICENSE in the root of this repository.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import {RequestService} from '../../shared/request/request.service';
import {RequestBase} from '../../shared/request/request-base';
import {MessageService} from '../../shared/message/message.service';
import {Message} from '../../shared/message/message.model';

@Component({
    selector: 'request-form-submit-dialog',
    template: `<form name="submitForm" (ngSubmit)="confirmSubmit(request)">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"
                (click)="clear()">&times;</button>
        <h4 class="modal-title" jhiTranslate="request.submit.title">Confirm request submission</h4>
    </div>
    <div class="modal-body">
        <jhi-alert-error></jhi-alert-error>
        <p jhiTranslate="request.submit.question">Are you sure you want to submit this request?</p>
        <p><strong>Title:</strong> {{request.requestDetail.title}}</p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="clear()">
            <span class="fa fa-ban"></span>&nbsp;<span jhiTranslate="request.action.cancel">Cancel</span>
        </button>
        <button type="submit" class="btn btn-danger">
            <span class="fa fa-remove"></span>&nbsp;<span jhiTranslate="request.action.submit">Submit</span>
        </button>
    </div>
</form>`
})
export class RequestFormSubmitDialogComponent {

    request: RequestBase;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private requestService: RequestService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager,
        private router: Router,
        private messageService: MessageService
    ) {
        this.jhiLanguageService.setLocations(['request']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    setSubmitSuccessMessage(requests: RequestBase[]) {
        let submittedTitle = `The request has been successfully submitted.`;
        let submittedMessage = `<ul>`;
        for (let req of requests) {
            submittedMessage += `<li>Request ${req.requestDetail.title} for organisation ${req.organisations}.</li>`;
        }
        submittedMessage += `</ul>`;
        this.messageService.store(new Message(submittedTitle, submittedMessage));
    }

    confirmSubmit (request: RequestBase) {
        this.requestService.submitDraft(request.uuid).subscribe(response => {
            this.eventManager.broadcast({ name: 'request',
                content: 'Submit a request'});
            this.activeModal.dismiss(true);
            this.setSubmitSuccessMessage(response);
            this.router.navigate(['completed', { outlets: { submit: null }}], { replaceUrl: true });
        });
    }

}
