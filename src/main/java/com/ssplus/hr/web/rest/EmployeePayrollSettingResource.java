package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.EmployeePayrollSetting;
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
 * REST controller for managing {@link com.ssplus.hr.domain.EmployeePayrollSetting}.
 */
@Path("/api/employee-payroll-settings")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class EmployeePayrollSettingResource {

    private final Logger log = LoggerFactory.getLogger(EmployeePayrollSettingResource.class);

    private static final String ENTITY_NAME = "hrmsEmployeePayrollSetting";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /employee-payroll-settings} : Create a new employeePayrollSetting.
     *
     * @param employeePayrollSetting the employeePayrollSetting to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new employeePayrollSetting, or with status {@code 400 (Bad Request)} if the employeePayrollSetting has already an ID.
     */
    @POST
    @Transactional
    public Response createEmployeePayrollSetting(EmployeePayrollSetting employeePayrollSetting, @Context UriInfo uriInfo) {
        log.debug("REST request to save EmployeePayrollSetting : {}", employeePayrollSetting);
        if (employeePayrollSetting.id != null) {
            throw new BadRequestAlertException("A new employeePayrollSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = EmployeePayrollSetting.persistOrUpdate(employeePayrollSetting);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /employee-payroll-settings} : Updates an existing employeePayrollSetting.
     *
     * @param employeePayrollSetting the employeePayrollSetting to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated employeePayrollSetting,
     * or with status {@code 400 (Bad Request)} if the employeePayrollSetting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeePayrollSetting couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateEmployeePayrollSetting(EmployeePayrollSetting employeePayrollSetting) {
        log.debug("REST request to update EmployeePayrollSetting : {}", employeePayrollSetting);
        if (employeePayrollSetting.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = EmployeePayrollSetting.persistOrUpdate(employeePayrollSetting);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employeePayrollSetting.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /employee-payroll-settings/:id} : delete the "id" employeePayrollSetting.
     *
     * @param id the id of the employeePayrollSetting to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEmployeePayrollSetting(@PathParam("id") Long id) {
        log.debug("REST request to delete EmployeePayrollSetting : {}", id);
        EmployeePayrollSetting.findByIdOptional(id).ifPresent(employeePayrollSetting -> {
            employeePayrollSetting.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /employee-payroll-settings} : get all the employeePayrollSettings.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of employeePayrollSettings in body.
     */
    @GET
    public List<EmployeePayrollSetting> getAllEmployeePayrollSettings(@QueryParam("filter") String filter) {
        log.debug("REST request to get all EmployeePayrollSettings");
        return EmployeePayrollSetting.findAll().list();
    }


    /**
     * {@code GET  /employee-payroll-settings/:id} : get the "id" employeePayrollSetting.
     *
     * @param id the id of the employeePayrollSetting to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the employeePayrollSetting, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getEmployeePayrollSetting(@PathParam("id") Long id) {
        log.debug("REST request to get EmployeePayrollSetting : {}", id);
        Optional<EmployeePayrollSetting> employeePayrollSetting = EmployeePayrollSetting.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(employeePayrollSetting);
    }
}
