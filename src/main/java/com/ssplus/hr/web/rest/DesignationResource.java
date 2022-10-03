package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.Designation;
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
 * REST controller for managing {@link com.ssplus.hr.domain.Designation}.
 */
@Path("/api/designations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class DesignationResource {

    private final Logger log = LoggerFactory.getLogger(DesignationResource.class);

    private static final String ENTITY_NAME = "hrmsDesignation";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /designations} : Create a new designation.
     *
     * @param designation the designation to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new designation, or with status {@code 400 (Bad Request)} if the designation has already an ID.
     */
    @POST
    @Transactional
    public Response createDesignation(@Valid Designation designation, @Context UriInfo uriInfo) {
        log.debug("REST request to save Designation : {}", designation);
        if (designation.id != null) {
            throw new BadRequestAlertException("A new designation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = Designation.persistOrUpdate(designation);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /designations} : Updates an existing designation.
     *
     * @param designation the designation to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated designation,
     * or with status {@code 400 (Bad Request)} if the designation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the designation couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateDesignation(@Valid Designation designation) {
        log.debug("REST request to update Designation : {}", designation);
        if (designation.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = Designation.persistOrUpdate(designation);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, designation.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /designations/:id} : delete the "id" designation.
     *
     * @param id the id of the designation to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteDesignation(@PathParam("id") Long id) {
        log.debug("REST request to delete Designation : {}", id);
        Designation.findByIdOptional(id).ifPresent(designation -> {
            designation.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /designations} : get all the designations.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of designations in body.
     */
    @GET
    public List<Designation> getAllDesignations() {
        log.debug("REST request to get all Designations");
        return Designation.findAll().list();
    }


    /**
     * {@code GET  /designations/:id} : get the "id" designation.
     *
     * @param id the id of the designation to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the designation, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getDesignation(@PathParam("id") Long id) {
        log.debug("REST request to get Designation : {}", id);
        Optional<Designation> designation = Designation.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(designation);
    }
}
