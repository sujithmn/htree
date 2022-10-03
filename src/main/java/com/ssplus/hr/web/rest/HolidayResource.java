package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.Holiday;
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
 * REST controller for managing {@link com.ssplus.hr.domain.Holiday}.
 */
@Path("/api/holidays")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class HolidayResource {

    private final Logger log = LoggerFactory.getLogger(HolidayResource.class);

    private static final String ENTITY_NAME = "hrmsHoliday";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /holidays} : Create a new holiday.
     *
     * @param holiday the holiday to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new holiday, or with status {@code 400 (Bad Request)} if the holiday has already an ID.
     */
    @POST
    @Transactional
    public Response createHoliday(@Valid Holiday holiday, @Context UriInfo uriInfo) {
        log.debug("REST request to save Holiday : {}", holiday);
        if (holiday.id != null) {
            throw new BadRequestAlertException("A new holiday cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = Holiday.persistOrUpdate(holiday);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /holidays} : Updates an existing holiday.
     *
     * @param holiday the holiday to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated holiday,
     * or with status {@code 400 (Bad Request)} if the holiday is not valid,
     * or with status {@code 500 (Internal Server Error)} if the holiday couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateHoliday(@Valid Holiday holiday) {
        log.debug("REST request to update Holiday : {}", holiday);
        if (holiday.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = Holiday.persistOrUpdate(holiday);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, holiday.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /holidays/:id} : delete the "id" holiday.
     *
     * @param id the id of the holiday to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteHoliday(@PathParam("id") Long id) {
        log.debug("REST request to delete Holiday : {}", id);
        Holiday.findByIdOptional(id).ifPresent(holiday -> {
            holiday.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /holidays} : get all the holidays.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of holidays in body.
     */
    @GET
    public List<Holiday> getAllHolidays() {
        log.debug("REST request to get all Holidays");
        return Holiday.findAll().list();
    }


    /**
     * {@code GET  /holidays/:id} : get the "id" holiday.
     *
     * @param id the id of the holiday to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the holiday, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getHoliday(@PathParam("id") Long id) {
        log.debug("REST request to get Holiday : {}", id);
        Optional<Holiday> holiday = Holiday.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(holiday);
    }
}
