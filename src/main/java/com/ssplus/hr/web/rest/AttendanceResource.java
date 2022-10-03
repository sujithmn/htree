package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.Attendance;
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
 * REST controller for managing {@link com.ssplus.hr.domain.Attendance}.
 */
@Path("/api/attendances")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class AttendanceResource {

    private final Logger log = LoggerFactory.getLogger(AttendanceResource.class);

    private static final String ENTITY_NAME = "hrmsAttendance";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /attendances} : Create a new attendance.
     *
     * @param attendance the attendance to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new attendance, or with status {@code 400 (Bad Request)} if the attendance has already an ID.
     */
    @POST
    @Transactional
    public Response createAttendance(Attendance attendance, @Context UriInfo uriInfo) {
        log.debug("REST request to save Attendance : {}", attendance);
        if (attendance.id != null) {
            throw new BadRequestAlertException("A new attendance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = Attendance.persistOrUpdate(attendance);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /attendances} : Updates an existing attendance.
     *
     * @param attendance the attendance to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated attendance,
     * or with status {@code 400 (Bad Request)} if the attendance is not valid,
     * or with status {@code 500 (Internal Server Error)} if the attendance couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateAttendance(Attendance attendance) {
        log.debug("REST request to update Attendance : {}", attendance);
        if (attendance.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = Attendance.persistOrUpdate(attendance);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, attendance.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /attendances/:id} : delete the "id" attendance.
     *
     * @param id the id of the attendance to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteAttendance(@PathParam("id") Long id) {
        log.debug("REST request to delete Attendance : {}", id);
        Attendance.findByIdOptional(id).ifPresent(attendance -> {
            attendance.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /attendances} : get all the attendances.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of attendances in body.
     */
    @GET
    public List<Attendance> getAllAttendances(@QueryParam("filter") String filter) {
        log.debug("REST request to get all Attendances");
        return Attendance.findAll().list();
    }


    /**
     * {@code GET  /attendances/:id} : get the "id" attendance.
     *
     * @param id the id of the attendance to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the attendance, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getAttendance(@PathParam("id") Long id) {
        log.debug("REST request to get Attendance : {}", id);
        Optional<Attendance> attendance = Attendance.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(attendance);
    }
}
