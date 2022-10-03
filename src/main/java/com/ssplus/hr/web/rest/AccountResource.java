package com.ssplus.hr.web.rest;

import com.ssplus.hr.domain.User;
import com.ssplus.hr.service.InvalidPasswordException;
import com.ssplus.hr.service.MailService;
import com.ssplus.hr.service.UserService;
import com.ssplus.hr.service.UsernameAlreadyUsedException;
import com.ssplus.hr.service.dto.PasswordChangeDTO;
import com.ssplus.hr.service.dto.UserDTO;
import com.ssplus.hr.web.rest.errors.EmailAlreadyUsedException;
import com.ssplus.hr.web.rest.errors.EmailNotFoundException;
import com.ssplus.hr.web.rest.errors.LoginAlreadyUsedException;
import com.ssplus.hr.web.rest.vm.KeyAndPasswordVM;
import com.ssplus.hr.web.rest.vm.ManagedUserVM;

import io.quarkus.security.Authenticated;
import java.security.Principal;
import java.util.Optional;
import java.util.concurrent.CompletionStage;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * REST controller for managing the current user's account.
 */
@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
public class AccountResource {
    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private static class AccountResourceException extends RuntimeException {

        private AccountResourceException(String message) {
            super(message);
        }
    }

    final MailService mailService;

    final UserService userService;

    @Inject
    public AccountResource(MailService mailService, UserService userService) {
        this.mailService = mailService;
        this.userService = userService;
    }

    /**
     * {@code GET /account} : get the current user.
     *
     * @return the current user.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be returned.
     */
    @GET
    @Path("/account")
    @Authenticated
    public UserDTO getAccount(@Context SecurityContext ctx) {
        return userService
            .getUserWithAuthoritiesByLogin(ctx.getUserPrincipal().getName())
            .map(UserDTO::new)
            .orElseThrow(() -> new AccountResourceException("User could not be found"));
    }

}
