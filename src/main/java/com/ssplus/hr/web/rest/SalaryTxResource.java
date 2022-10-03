package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.SalaryTx;
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
 * REST controller for managing {@link com.ssplus.hr.domain.SalaryTx}.
 */
@Path("/api/salary-txes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class SalaryTxResource {

    private final Logger log = LoggerFactory.getLogger(SalaryTxResource.class);

    private static final String ENTITY_NAME = "hrmsSalaryTx";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /salary-txes} : Create a new salaryTx.
     *
     * @param salaryTx the salaryTx to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new salaryTx, or with status {@code 400 (Bad Request)} if the salaryTx has already an ID.
     */
    @POST
    @Transactional
    public Response createSalaryTx(SalaryTx salaryTx, @Context UriInfo uriInfo) {
        log.debug("REST request to save SalaryTx : {}", salaryTx);
        if (salaryTx.id != null) {
            throw new BadRequestAlertException("A new salaryTx cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = SalaryTx.persistOrUpdate(salaryTx);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /salary-txes} : Updates an existing salaryTx.
     *
     * @param salaryTx the salaryTx to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated salaryTx,
     * or with status {@code 400 (Bad Request)} if the salaryTx is not valid,
     * or with status {@code 500 (Internal Server Error)} if the salaryTx couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateSalaryTx(SalaryTx salaryTx) {
        log.debug("REST request to update SalaryTx : {}", salaryTx);
        if (salaryTx.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = SalaryTx.persistOrUpdate(salaryTx);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, salaryTx.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /salary-txes/:id} : delete the "id" salaryTx.
     *
     * @param id the id of the salaryTx to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteSalaryTx(@PathParam("id") Long id) {
        log.debug("REST request to delete SalaryTx : {}", id);
        SalaryTx.findByIdOptional(id).ifPresent(salaryTx -> {
            salaryTx.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /salary-txes} : get all the salaryTxes.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of salaryTxes in body.
     */
    @GET
    public List<SalaryTx> getAllSalaryTxes() {
        log.debug("REST request to get all SalaryTxes");
        return SalaryTx.findAll().list();
    }


    /**
     * {@code GET  /salary-txes/:id} : get the "id" salaryTx.
     *
     * @param id the id of the salaryTx to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the salaryTx, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getSalaryTx(@PathParam("id") Long id) {
        log.debug("REST request to get SalaryTx : {}", id);
        Optional<SalaryTx> salaryTx = SalaryTx.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(salaryTx);
    }
}
