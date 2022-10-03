package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.EmployeeShiftSetting;
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
 * REST controller for managing {@link com.ssplus.hr.domain.EmployeeShiftSetting}.
 */
@Path("/api/employee-shift-settings")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class EmployeeShiftSettingResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeShiftSettingResource.class);

    private static final String ENTITY_NAME = "hrmsEmployeeShiftSetting";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /employee-shift-settings} : Create a new employeeShiftSetting.
     *
     * @param employeeShiftSetting the employeeShiftSetting to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new employeeShiftSetting, or with status {@code 400 (Bad Request)} if the employeeShiftSetting has already an ID.
     */
    @POST
    @Transactional
    public Response createEmployeeShiftSetting(EmployeeShiftSetting employeeShiftSetting, @Context UriInfo uriInfo) {
        log.debug("REST request to save EmployeeShiftSetting : {}", employeeShiftSetting);
        if (employeeShiftSetting.id != null) {
            throw new BadRequestAlertException("A new employeeShiftSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = EmployeeShiftSetting.persistOrUpdate(employeeShiftSetting);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /employee-shift-settings} : Updates an existing employeeShiftSetting.
     *
     * @param employeeShiftSetting the employeeShiftSetting to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated employeeShiftSetting,
     * or with status {@code 400 (Bad Request)} if the employeeShiftSetting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeShiftSetting couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateEmployeeShiftSetting(EmployeeShiftSetting employeeShiftSetting) {
        log.debug("REST request to update EmployeeShiftSetting : {}", employeeShiftSetting);
        if (employeeShiftSetting.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = EmployeeShiftSetting.persistOrUpdate(employeeShiftSetting);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employeeShiftSetting.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /employee-shift-settings/:id} : delete the "id" employeeShiftSetting.
     *
     * @param id the id of the employeeShiftSetting to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEmployeeShiftSetting(@PathParam("id") Long id) {
        log.debug("REST request to delete EmployeeShiftSetting : {}", id);
        EmployeeShiftSetting.findByIdOptional(id).ifPresent(employeeShiftSetting -> {
            employeeShiftSetting.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /employee-shift-settings} : get all the employeeShiftSettings.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of employeeShiftSettings in body.
     */
    @GET
    public List<EmployeeShiftSetting> getAllEmployeeShiftSettings(@QueryParam("filter") String filter) {
        log.debug("REST request to get all EmployeeShiftSettings");
        return EmployeeShiftSetting.findAll().list();
    }


    /**
     * {@code GET  /employee-shift-settings/:id} : get the "id" employeeShiftSetting.
     *
     * @param id the id of the employeeShiftSetting to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the employeeShiftSetting, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getEmployeeShiftSetting(@PathParam("id") Long id) {
        log.debug("REST request to get EmployeeShiftSetting : {}", id);
        Optional<EmployeeShiftSetting> employeeShiftSetting = EmployeeShiftSetting.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(employeeShiftSetting);
    }
}
