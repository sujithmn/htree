package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.LeaveSetting;
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
 * REST controller for managing {@link com.ssplus.hr.domain.LeaveSetting}.
 */
@Path("/api/leave-settings")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class LeaveSettingResource {

    private final Logger log = LoggerFactory.getLogger(LeaveSettingResource.class);

    private static final String ENTITY_NAME = "hrmsLeaveSetting";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /leave-settings} : Create a new leaveSetting.
     *
     * @param leaveSetting the leaveSetting to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new leaveSetting, or with status {@code 400 (Bad Request)} if the leaveSetting has already an ID.
     */
    @POST
    @Transactional
    public Response createLeaveSetting(@Valid LeaveSetting leaveSetting, @Context UriInfo uriInfo) {
        log.debug("REST request to save LeaveSetting : {}", leaveSetting);
        if (leaveSetting.id != null) {
            throw new BadRequestAlertException("A new leaveSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = LeaveSetting.persistOrUpdate(leaveSetting);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /leave-settings} : Updates an existing leaveSetting.
     *
     * @param leaveSetting the leaveSetting to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated leaveSetting,
     * or with status {@code 400 (Bad Request)} if the leaveSetting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the leaveSetting couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateLeaveSetting(@Valid LeaveSetting leaveSetting) {
        log.debug("REST request to update LeaveSetting : {}", leaveSetting);
        if (leaveSetting.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = LeaveSetting.persistOrUpdate(leaveSetting);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, leaveSetting.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /leave-settings/:id} : delete the "id" leaveSetting.
     *
     * @param id the id of the leaveSetting to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteLeaveSetting(@PathParam("id") Long id) {
        log.debug("REST request to delete LeaveSetting : {}", id);
        LeaveSetting.findByIdOptional(id).ifPresent(leaveSetting -> {
            leaveSetting.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /leave-settings} : get all the leaveSettings.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of leaveSettings in body.
     */
    @GET
    public List<LeaveSetting> getAllLeaveSettings() {
        log.debug("REST request to get all LeaveSettings");
        return LeaveSetting.findAll().list();
    }


    /**
     * {@code GET  /leave-settings/:id} : get the "id" leaveSetting.
     *
     * @param id the id of the leaveSetting to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the leaveSetting, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getLeaveSetting(@PathParam("id") Long id) {
        log.debug("REST request to get LeaveSetting : {}", id);
        Optional<LeaveSetting> leaveSetting = LeaveSetting.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(leaveSetting);
    }
}
