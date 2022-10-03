package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import java.util.List;
import java.util.Optional;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ssplus.hr.domain.Shift;
import com.ssplus.hr.web.rest.errors.BadRequestAlertException;
import com.ssplus.hr.web.util.HeaderUtil;
import com.ssplus.hr.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ssplus.hr.domain.Shift}.
 */
@Path("/api/shifts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class ShiftResource {

  private final Logger log = LoggerFactory.getLogger(ShiftResource.class);

  private static final String ENTITY_NAME = "hrmsShift";

  @ConfigProperty(name = "application.name")
  String applicationName;

  /**
   * {@code POST  /shifts} : Create a new shift.
   *
   * @param shift the shift to create.
   * @return the {@link Response} with status {@code 201 (Created)} and with body the new shift, or with status
   *         {@code 400 (Bad Request)} if the shift has already an ID.
   */
  @POST
  @Transactional
  public Response createShift(@Valid Shift shift, @Context UriInfo uriInfo) {

    this.log.debug("REST request to save Shift : {}", shift);
    if (shift.id != null) {
      throw new BadRequestAlertException("A new shift cannot already have an ID", ENTITY_NAME, "idexists");
    }
    var result = Shift.persistOrUpdate(shift);
    var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
    HeaderUtil.createEntityCreationAlert(this.applicationName, true, ENTITY_NAME, result.id.toString())
        .forEach(response::header);
    return response.build();
  }

  /**
   * {@code PUT  /shifts} : Updates an existing shift.
   *
   * @param shift the shift to update.
   * @return the {@link Response} with status {@code 200 (OK)} and with body the updated shift, or with status
   *         {@code 400 (Bad Request)} if the shift is not valid, or with status {@code 500 (Internal Server Error)} if
   *         the shift couldn't be updated.
   */
  @PUT
  @Transactional
  public Response updateShift(@Valid Shift shift) {

    this.log.debug("REST request to update Shift : {}", shift);
    if (shift.id == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    var result = Shift.persistOrUpdate(shift);
    var response = Response.ok().entity(result);
    HeaderUtil.createEntityUpdateAlert(this.applicationName, true, ENTITY_NAME, shift.id.toString())
        .forEach(response::header);
    return response.build();
  }

  /**
   * {@code DELETE  /shifts/:id} : delete the "id" shift.
   *
   * @param id the id of the shift to delete.
   * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
   */
  @DELETE
  @Path("/{id}")
  @Transactional
  public Response deleteShift(@PathParam("id") Long id) {

    this.log.debug("REST request to delete Shift : {}", id);
    Shift.findByIdOptional(id).ifPresent(shift -> {
      shift.delete();
    });
    var response = Response.noContent();
    HeaderUtil.createEntityDeletionAlert(this.applicationName, true, ENTITY_NAME, id.toString())
        .forEach(response::header);
    return response.build();
  }

  /**
   * {@code GET  /shifts} : get all the shifts. * @return the {@link Response} with status {@code 200 (OK)} and the list
   * of shifts in body.
   */
  @GET
  public List<Shift> getAllShifts() {

    this.log.debug("REST request to get all Shifts");
    return Shift.findAll().list();
  }

  /**
   * {@code GET  /shifts/:id} : get the "id" shift.
   *
   * @param id the id of the shift to retrieve.
   * @return the {@link Response} with status {@code 200 (OK)} and with body the shift, or with status
   *         {@code 404 (Not Found)}.
   */
  @GET
  @Path("/{id}")

  public Response getShift(@PathParam("id") Long id) {

    this.log.debug("REST request to get Shift : {}", id);
    Optional<Shift> shift = Shift.findByIdOptional(id);
    return ResponseUtil.wrapOrNotFound(shift);
  }
}
