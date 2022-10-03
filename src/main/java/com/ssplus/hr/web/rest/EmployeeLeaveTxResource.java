package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.EmployeeLeaveTx;
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

/**
 * REST controller for managing {@link com.ssplus.hr.domain.EmployeeLeaveTx}.
 */
@Path("/api/employee-leave-txes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class EmployeeLeaveTxResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeLeaveTxResource.class);

    private static final String ENTITY_NAME = "hrmsEmployeeLeaveTx";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /employee-leave-txes} : Create a new employeeLeaveTx.
     *
     * @param employeeLeaveTx the employeeLeaveTx to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new employeeLeaveTx, or with status {@code 400 (Bad Request)} if the employeeLeaveTx has already an ID.
     */
    @POST
    @Transactional
    public Response createEmployeeLeaveTx(EmployeeLeaveTx employeeLeaveTx, @Context UriInfo uriInfo) {
        log.debug("REST request to save EmployeeLeaveTx : {}", employeeLeaveTx);
        if (employeeLeaveTx.id != null) {
            throw new BadRequestAlertException("A new employeeLeaveTx cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = EmployeeLeaveTx.persistOrUpdate(employeeLeaveTx);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /employee-leave-txes} : Updates an existing employeeLeaveTx.
     *
     * @param employeeLeaveTx the employeeLeaveTx to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated employeeLeaveTx,
     * or with status {@code 400 (Bad Request)} if the employeeLeaveTx is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeLeaveTx couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateEmployeeLeaveTx(EmployeeLeaveTx employeeLeaveTx) {
        log.debug("REST request to update EmployeeLeaveTx : {}", employeeLeaveTx);
        if (employeeLeaveTx.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = EmployeeLeaveTx.persistOrUpdate(employeeLeaveTx);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employeeLeaveTx.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /employee-leave-txes/:id} : delete the "id" employeeLeaveTx.
     *
     * @param id the id of the employeeLeaveTx to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEmployeeLeaveTx(@PathParam("id") Long id) {
        log.debug("REST request to delete EmployeeLeaveTx : {}", id);
        EmployeeLeaveTx.findByIdOptional(id).ifPresent(employeeLeaveTx -> {
            employeeLeaveTx.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /employee-leave-txes} : get all the employeeLeaveTxes.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of employeeLeaveTxes in body.
     */
    @GET
    public List<EmployeeLeaveTx> getAllEmployeeLeaveTxes() {
        log.debug("REST request to get all EmployeeLeaveTxes");
        return EmployeeLeaveTx.findAll().list();
    }


    /**
     * {@code GET  /employee-leave-txes/:id} : get the "id" employeeLeaveTx.
     *
     * @param id the id of the employeeLeaveTx to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the employeeLeaveTx, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getEmployeeLeaveTx(@PathParam("id") Long id) {
        log.debug("REST request to get EmployeeLeaveTx : {}", id);
        Optional<EmployeeLeaveTx> employeeLeaveTx = EmployeeLeaveTx.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(employeeLeaveTx);
    }
}
