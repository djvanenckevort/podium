/*
 * Copyright (c) 2017  The Hyve and respective contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * See the file LICENSE in the root of this repository.
 */

package nl.thehyve.podium.config;

import nl.thehyve.podium.common.config.Constants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.cloud.config.java.AbstractCloudConfig;
import org.springframework.context.annotation.*;

import javax.sql.DataSource;

@Configuration
@Profile(Constants.SPRING_PROFILE_CLOUD)
public class CloudDatabaseConfiguration extends AbstractCloudConfig {

    private final Logger log = LoggerFactory.getLogger(CloudDatabaseConfiguration.class);

    @Bean
    public DataSource dataSource(CacheManager cacheManager) {
        log.info("Configuring JDBC datasource from a cloud provider");
        return connectionFactory().dataSource();
    }
}