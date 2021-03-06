/*
 * Copyright (c) 2017  The Hyve and respective contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * See the file LICENSE in the root of this repository.
 */

package nl.thehyve.podium.domain;

import lombok.Data;
import nl.thehyve.podium.common.security.AuthorityConstants;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * An authority (a security role) used by Spring Security.
 */
@Entity
@Table(name = "podium_authority")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Data
public class Authority implements Serializable {

    private static final long serialVersionUID = 1L;


    @NotNull
    @Size(min = 0, max = 50)
    @Id
    @Column(length = 50)
    private String name;

    public Authority() {}

    public Authority(String name) {
        this.name = name;
    }

    public final boolean isOrganisationAuthority() {
        return AuthorityConstants.isOrganisationAuthority(this.name);
    }
}
