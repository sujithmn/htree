package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.EmployeeAccessSetting;
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
 * REST controller for managing {@link com.ssplus.hr.domain.EmployeeAccessSetting}.
 */
@Path("/api/employee-access-settings")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class EmployeeAccessSettingResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeAccessSettingResource.class);

    private static final String ENTITY_NAME = "hrmsEmployeeAccessSetting";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /employee-access-settings} : Create a new employeeAccessSetting.
     *
     * @param employeeAccessSetting the employeeAccessSetting to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new employeeAccessSetting, or with status {@code 400 (Bad Request)} if the employeeAccessSetting has already an ID.
     */
    @POST
    @Transactional
    public Response createEmployeeAccessSetting(EmployeeAccessSetting employeeAccessSetting, @Context UriInfo uriInfo) {
        log.debug("REST request to save EmployeeAccessSetting : {}", employeeAccessSetting);
        if (employeeAccessSetting.id != null) {
            throw new BadRequestAlertException("A new employeeAccessSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = EmployeeAccessSetting.persistOrUpdate(employeeAccessSetting);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /employee-access-settings} : Updates an existing employeeAccessSetting.
     *
     * @param employeeAccessSetting the employeeAccessSetting to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated employeeAccessSetting,
     * or with status {@code 400 (Bad Request)} if the employeeAccessSetting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeAccessSetting couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateEmployeeAccessSetting(EmployeeAccessSetting employeeAccessSetting) {
        log.debug("REST request to update EmployeeAccessSetting : {}", employeeAccessSetting);
        if (employeeAccessSetting.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = EmployeeAccessSetting.persistOrUpdate(employeeAccessSetting);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employeeAccessSetting.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /employee-access-settings/:id} : delete the "id" employeeAccessSetting.
     *
     * @param id the id of the employeeAccessSetting to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEmployeeAccessSetting(@PathParam("id") Long id) {
        log.debug("REST request to delete EmployeeAccessSetting : {}", id);
        EmployeeAccessSetting.findByIdOptional(id).ifPresent(employeeAccessSetting -> {
            employeeAccessSetting.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /employee-access-settings} : get all the employeeAccessSettings.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of employeeAccessSettings in body.
     */
    @GET
    public List<EmployeeAccessSetting> getAllEmployeeAccessSettings(@QueryParam("filter") String filter) {
        log.debug("REST request to get all EmployeeAccessSettings");
        return EmployeeAccessSetting.findAll().list();
    }


    /**
     * {@code GET  /employee-access-settings/:id} : get the "id" employeeAccessSetting.
     *
     * @param id the id of the employeeAccessSetting to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the employeeAccessSetting, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getEmployeeAccessSetting(@PathParam("id") Long id) {
        log.debug("REST request to get EmployeeAccessSetting : {}", id);
        Optional<EmployeeAccessSetting> employeeAccessSetting = EmployeeAccessSetting.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(employeeAccessSetting);
    }
}
