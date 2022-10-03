package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.AttendancePolicyNotification;
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
 * REST controller for managing {@link com.ssplus.hr.domain.AttendancePolicyNotification}.
 */
@Path("/api/attendance-policy-notifications")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class AttendancePolicyNotificationResource {

    private final Logger log = LoggerFactory.getLogger(AttendancePolicyNotificationResource.class);

    private static final String ENTITY_NAME = "hrmsAttendancePolicyNotification";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /attendance-policy-notifications} : Create a new attendancePolicyNotification.
     *
     * @param attendancePolicyNotification the attendancePolicyNotification to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new attendancePolicyNotification, or with status {@code 400 (Bad Request)} if the attendancePolicyNotification has already an ID.
     */
    @POST
    @Transactional
    public Response createAttendancePolicyNotification(AttendancePolicyNotification attendancePolicyNotification, @Context UriInfo uriInfo) {
        log.debug("REST request to save AttendancePolicyNotification : {}", attendancePolicyNotification);
        if (attendancePolicyNotification.id != null) {
            throw new BadRequestAlertException("A new attendancePolicyNotification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = AttendancePolicyNotification.persistOrUpdate(attendancePolicyNotification);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /attendance-policy-notifications} : Updates an existing attendancePolicyNotification.
     *
     * @param attendancePolicyNotification the attendancePolicyNotification to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated attendancePolicyNotification,
     * or with status {@code 400 (Bad Request)} if the attendancePolicyNotification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the attendancePolicyNotification couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateAttendancePolicyNotification(AttendancePolicyNotification attendancePolicyNotification) {
        log.debug("REST request to update AttendancePolicyNotification : {}", attendancePolicyNotification);
        if (attendancePolicyNotification.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = AttendancePolicyNotification.persistOrUpdate(attendancePolicyNotification);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, attendancePolicyNotification.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /attendance-policy-notifications/:id} : delete the "id" attendancePolicyNotification.
     *
     * @param id the id of the attendancePolicyNotification to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteAttendancePolicyNotification(@PathParam("id") Long id) {
        log.debug("REST request to delete AttendancePolicyNotification : {}", id);
        AttendancePolicyNotification.findByIdOptional(id).ifPresent(attendancePolicyNotification -> {
            attendancePolicyNotification.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /attendance-policy-notifications} : get all the attendancePolicyNotifications.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of attendancePolicyNotifications in body.
     */
    @GET
    public List<AttendancePolicyNotification> getAllAttendancePolicyNotifications(@QueryParam("filter") String filter) {
        log.debug("REST request to get all AttendancePolicyNotifications");
        return AttendancePolicyNotification.findAll().list();
    }


    /**
     * {@code GET  /attendance-policy-notifications/:id} : get the "id" attendancePolicyNotification.
     *
     * @param id the id of the attendancePolicyNotification to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the attendancePolicyNotification, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getAttendancePolicyNotification(@PathParam("id") Long id) {
        log.debug("REST request to get AttendancePolicyNotification : {}", id);
        Optional<AttendancePolicyNotification> attendancePolicyNotification = AttendancePolicyNotification.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(attendancePolicyNotification);
    }
}
