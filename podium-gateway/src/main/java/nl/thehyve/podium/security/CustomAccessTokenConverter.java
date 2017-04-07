/*
 * Copyright (c) 2017  The Hyve and respective contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * See the file LICENSE in the root of this repository.
 */

package nl.thehyve.podium.security;

import nl.thehyve.podium.common.security.CustomUserAuthenticationConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Map;

@Component("customAccessTokenConverter")
public class CustomAccessTokenConverter extends DefaultAccessTokenConverter {

    private final Logger log = LoggerFactory.getLogger(CustomAccessTokenConverter.class);

    @Autowired
    CustomUserAuthenticationConverter userAuthenticationConverter;

    @Autowired
    @Qualifier("requestAuth2ClientContext")
    OAuth2ClientContext requestAuth2ClientContext;

    @PostConstruct
    public void init() {
        this.setUserTokenConverter(userAuthenticationConverter);
        log.info("CustomAccessTokenConverter initialised.");
    }

    @Override
    public OAuth2AccessToken extractAccessToken(String value, Map<String, ?> map) {
        OAuth2AccessToken token = super.extractAccessToken(value, map);
        if (requestAuth2ClientContext == null) {
            log.warn("OAuth2ClientContext not available.");
        } else {
            log.info("Setting token in OAuth2ClientContext {}.", requestAuth2ClientContext);
            requestAuth2ClientContext.setAccessToken(token);
        }
        return token;
    }
}
