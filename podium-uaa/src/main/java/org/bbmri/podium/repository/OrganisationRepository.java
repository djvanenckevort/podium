/*
 * Copyright (c) 2017. The Hyve and respective contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * See the file LICENSE in the root of this repository.
 *
 */

package org.bbmri.podium.repository;

import org.bbmri.podium.domain.Organisation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.UUID;

/**
 * Spring Data JPA repository for the Organisation entity.
 */
@SuppressWarnings("unused")
public interface OrganisationRepository extends JpaRepository<Organisation,Long> {

    Organisation findByUuid(UUID uuid);

    Page<Organisation> findAllByDeletedFalse(Pageable pageable);

    Long countByDeletedFalse();

    Organisation findByIdAndDeletedFalse(Long id);

    Organisation findByUuidAndDeletedFalse(UUID uuid);
}