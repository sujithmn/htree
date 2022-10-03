package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import com.ssplus.hr.domain.Department;
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
 * REST controller for managing {@link com.ssplus.hr.domain.Department}.
 */
@Path("/api/departments")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class DepartmentResource {

    private final Logger log = LoggerFactory.getLogger(DepartmentResource.class);

    private static final String ENTITY_NAME = "hrmsDepartment";

    @ConfigProperty(name = "application.name")
    String applicationName;


    
    /**
     * {@code POST  /departments} : Create a new department.
     *
     * @param department the department to create.
     * @return the {@link Response} with status {@code 201 (Created)} and with body the new department, or with status {@code 400 (Bad Request)} if the department has already an ID.
     */
    @POST
    @Transactional
    public Response createDepartment(@Valid Department department, @Context UriInfo uriInfo) {
        log.debug("REST request to save Department : {}", department);
        if (department.id != null) {
            throw new BadRequestAlertException("A new department cannot already have an ID", ENTITY_NAME, "idexists");
        }
        var result = Department.persistOrUpdate(department);
        var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
        HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code PUT  /departments} : Updates an existing department.
     *
     * @param department the department to update.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the updated department,
     * or with status {@code 400 (Bad Request)} if the department is not valid,
     * or with status {@code 500 (Internal Server Error)} if the department couldn't be updated.
     */
    @PUT
    @Transactional
    public Response updateDepartment(@Valid Department department) {
        log.debug("REST request to update Department : {}", department);
        if (department.id == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        var result = Department.persistOrUpdate(department);
        var response = Response.ok().entity(result);
        HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, department.id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code DELETE  /departments/:id} : delete the "id" department.
     *
     * @param id the id of the department to delete.
     * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteDepartment(@PathParam("id") Long id) {
        log.debug("REST request to delete Department : {}", id);
        Department.findByIdOptional(id).ifPresent(department -> {
            department.delete();
        });
        var response = Response.noContent();
        HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()).forEach(response::header);
        return response.build();
    }

    /**
     * {@code GET  /departments} : get all the departments.
     *     * @return the {@link Response} with status {@code 200 (OK)} and the list of departments in body.
     */
    @GET
    public List<Department> getAllDepartments() {
        log.debug("REST request to get all Departments");
        return Department.findAll().list();
    }


    /**
     * {@code GET  /departments/:id} : get the "id" department.
     *
     * @param id the id of the department to retrieve.
     * @return the {@link Response} with status {@code 200 (OK)} and with body the department, or with status {@code 404 (Not Found)}.
     */
    @GET
    @Path("/{id}")

    public Response getDepartment(@PathParam("id") Long id) {
        log.debug("REST request to get Department : {}", id);
        Optional<Department> department = Department.findByIdOptional(id);
        return ResponseUtil.wrapOrNotFound(department);
    }
}
