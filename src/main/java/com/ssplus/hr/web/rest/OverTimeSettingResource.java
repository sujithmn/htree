package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.OverTimeSetting;
import com.ssplus.hr.web.rest.errors.BadRequestAlertException;
import com.ssplus.hr.web.util.HeaderUtil;
import com.ssplus.hr.web.util.ResponseUtil;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.ApplicationScoped;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.ssplus.hr.domain.OverTimeSetting}.
 */
@Path("/api/over-time-settings")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class OverTimeSettingResource {

    private final Logger log = LoggerFactory.getLogger(OverTimeSettingResource.class);

    private static final String ENTITY_NAME = "hrmsOverTimeSetting";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /over-time-settings} : Create a new overTimeSetting.
     *
     * @param overTimeSetting the overTimeSetting to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new overTimeSetting, or with status {@code 400 (Bad Request)} if the overTimeSetting has already an ID.
     */
    @POST
    @Transactional
    public Response createOverTimeSetting(OverTimeSetting overTimeSetting, @Context UriInfo uriInfo) {
        log.debug("REST request to save OverTimeSetting : {}", overTimeSetting);
        if (overTimeSetting.id != null) {
            throw new BadRequestAlertException("A new overTimeSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = OverTimeSetting.persistOrUpdate(overTimeSetting);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /over-time-settings} : Updates an existing overTimeSetting.
     *
     * @param overTimeSetting the overTimeSetting to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated overTimeSetting,
     * or with status {@code 400 (Bad Request)} if the overTimeSetting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the overTimeSetting couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateOverTimeSetting(OverTimeSetting overTimeSetting) {
        log.debug("REST request to update OverTimeSetting : {}", overTimeSetting);
        if (overTimeSetting.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = OverTimeSetting.persistOrUpdate(overTimeSetting);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, overTimeSetting.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /over-time-settings/:id} : delete the "id" overTimeSetting.
     *
     * @param id the id of the overTimeSetting to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteOverTimeSetting(@PathParam("id") Long id) {
        log.debug("REST request to delete OverTimeSetting : {}", id);
        OverTimeSetting.findByIdOptional(id).ifPresent(overTimeSetting -> {
            overTimeSetting.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /over-time-settings} : get all the overTimeSettings.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of overTimeSettings in body.
     */
    @GET
    public List<OverTimeSetting> getAllOverTimeSettings(@QueryParam("filter") String filter) {
        log.debug("REST request to get all OverTimeSettings");
        return OverTimeSetting.findAll().list();
    }


    /**
     * {@code GET  /over-time-settings/:id} : get the "id" overTimeSetting.
     *
     * @param id the id of the overTimeSetting to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the overTimeSetting, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getOverTimeSetting(@PathParam("id") Long id) {
        log.debug("REST request to get OverTimeSetting : {}", id);
        Optional<OverTimeSetting> overTimeSetting = OverTimeSetting.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(overTimeSetting);
    }
}
