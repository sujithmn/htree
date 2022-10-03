package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.LeaveApproval;
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
 * REST controller for managing {@link com.ssplus.hr.domain.LeaveApproval}.
 */
@Path("/api/leave-approvals")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class LeaveApprovalResource {

    private final Logger log = LoggerFactory.getLogger(LeaveApprovalResource.class);

    private static final String ENTITY_NAME = "hrmsLeaveApproval";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /leave-approvals} : Create a new leaveApproval.
     *
     * @param leaveApproval the leaveApproval to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new leaveApproval, or with status {@code 400 (Bad Request)} if the leaveApproval has already an ID.
     */
    @POST
    @Transactional
    public Response createLeaveApproval(@Valid LeaveApproval leaveApproval, @Context UriInfo uriInfo) {
        log.debug("REST request to save LeaveApproval : {}", leaveApproval);
        if (leaveApproval.id != null) {
            throw new BadRequestAlertException("A new leaveApproval cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = LeaveApproval.persistOrUpdate(leaveApproval);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /leave-approvals} : Updates an existing leaveApproval.
     *
     * @param leaveApproval the leaveApproval to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated leaveApproval,
     * or with status {@code 400 (Bad Request)} if the leaveApproval is not valid,
     * or with status {@code 500 (Internal Server Error)} if the leaveApproval couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateLeaveApproval(@Valid LeaveApproval leaveApproval) {
        log.debug("REST request to update LeaveApproval : {}", leaveApproval);
        if (leaveApproval.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = LeaveApproval.persistOrUpdate(leaveApproval);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, leaveApproval.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /leave-approvals/:id} : delete the "id" leaveApproval.
     *
     * @param id the id of the leaveApproval to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteLeaveApproval(@PathParam("id") Long id) {
        log.debug("REST request to delete LeaveApproval : {}", id);
        LeaveApproval.findByIdOptional(id).ifPresent(leaveApproval -> {
            leaveApproval.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /leave-approvals} : get all the leaveApprovals.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of leaveApprovals in body.
     */
    @GET
    public List<LeaveApproval> getAllLeaveApprovals() {
        log.debug("REST request to get all LeaveApprovals");
        return LeaveApproval.findAll().list();
    }


    /**
     * {@code GET  /leave-approvals/:id} : get the "id" leaveApproval.
     *
     * @param id the id of the leaveApproval to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the leaveApproval, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getLeaveApproval(@PathParam("id") Long id) {
        log.debug("REST request to get LeaveApproval : {}", id);
        Optional<LeaveApproval> leaveApproval = LeaveApproval.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(leaveApproval);
    }
}
