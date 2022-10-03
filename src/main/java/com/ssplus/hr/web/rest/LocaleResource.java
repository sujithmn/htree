package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.Locale;
import com.ssplus.hr.web.rest.errors.BadRequestAlertException;
import com.ssplus.hr.web.util.HeaderUtil;
import com.ssplus.hr.web.util.ResponseUtil;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ssplus.hr.domain.Locale}.
 */
@Path("/api/locales")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class LocaleResource {

    private final Logger log = LoggerFactory.getLogger(LocaleResource.class);

    private static final String ENTITY_NAME = "hrmsLocale";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /locales} : Create a new locale.
     *
     * @param locale the locale to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new locale, or with status {@code 400 (Bad Request)} if the locale has already an ID.
     */
    @POST
    @Transactional
    public Response createLocale(@Valid Locale locale, @Context UriInfo uriInfo) {
        log.debug("REST request to save Locale : {}", locale);
        if (locale.id != null) {
            throw new BadRequestAlertException("A new locale cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = Locale.persistOrUpdate(locale);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /locales} : Updates an existing locale.
     *
     * @param locale the locale to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated locale,
     * or with status {@code 400 (Bad Request)} if the locale is not valid,
     * or with status {@code 500 (Internal Server Error)} if the locale couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateLocale(@Valid Locale locale) {
        log.debug("REST request to update Locale : {}", locale);
        if (locale.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = Locale.persistOrUpdate(locale);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, locale.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /locales/:id} : delete the "id" locale.
     *
     * @param id the id of the locale to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteLocale(@PathParam("id") Long id) {
        log.debug("REST request to delete Locale : {}", id);
        Locale.findByIdOptional(id).ifPresent(locale -> {
            locale.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /locales} : get all the locales.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of locales in body.
     */
    @GET
    public List<Locale> getAllLocales() {
        log.debug("REST request to get all Locales");
        return Locale.findAll().list();
    }


    /**
     * {@code GET  /locales/:id} : get the "id" locale.
     *
     * @param id the id of the locale to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the locale, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getLocale(@PathParam("id") Long id) {
        log.debug("REST request to get Locale : {}", id);
        Optional<Locale> locale = Locale.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(locale);
    }
}
