package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.Employee;
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
 * REST controller for managing {@link com.ssplus.hr.domain.Employee}.
 */
@Path("/api/employees")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class EmployeeResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeResource.class);

    private static final String ENTITY_NAME = "hrmsEmployee";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /employees} : Create a new employee.
     *
     * @param employee the employee to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new employee, or with status {@code 400 (Bad Request)} if the employee has already an ID.
     */
    @POST
    @Transactional
    public Response createEmployee(@Valid Employee employee, @Context UriInfo uriInfo) {
        log.debug("REST request to save Employee : {}", employee);
        if (employee.id != null) {
            throw new BadRequestAlertException("A new employee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = Employee.persistOrUpdate(employee);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /employees} : Updates an existing employee.
     *
     * @param employee the employee to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated employee,
     * or with status {@code 400 (Bad Request)} if the employee is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employee couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateEmployee(@Valid Employee employee) {
        log.debug("REST request to update Employee : {}", employee);
        if (employee.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = Employee.persistOrUpdate(employee);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employee.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /employees/:id} : delete the "id" employee.
     *
     * @param id the id of the employee to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEmployee(@PathParam("id") Long id) {
        log.debug("REST request to delete Employee : {}", id);
        Employee.findByIdOptional(id).ifPresent(employee -> {
            employee.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /employees} : get all the employees.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of employees in body.
     */
    @GET
    public List<Employee> getAllEmployees() {
        log.debug("REST request to get all Employees");
        return Employee.findAll().list();
    }


    /**
     * {@code GET  /employees/:id} : get the "id" employee.
     *
     * @param id the id of the employee to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the employee, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getEmployee(@PathParam("id") Long id) {
        log.debug("REST request to get Employee : {}", id);
        Optional<Employee> employee = Employee.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(employee);
    }
}
