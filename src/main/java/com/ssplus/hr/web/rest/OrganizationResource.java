package com.ssplus.hr.web.rest;

import static javax.ws.rs.core.UriBuilder.fromPath;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
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
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ssplus.hr.domain.Branch;
import com.ssplus.hr.domain.Department;
import com.ssplus.hr.domain.Designation;
import com.ssplus.hr.domain.Locale;
import com.ssplus.hr.domain.Organization;
import com.ssplus.hr.web.rest.errors.BadRequestAlertException;
import com.ssplus.hr.web.util.HeaderUtil;
import com.ssplus.hr.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ssplus.hr.domain.Organization}.
 */
@Path("/api/organizations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
@RolesAllowed({ "ROLE_ADMIN" })
public class OrganizationResource {

  private final Logger log = LoggerFactory.getLogger(OrganizationResource.class);

  @Inject
  JsonWebToken jwt;

  private static final String ENTITY_NAME = "hrmsOrganization";

  @ConfigProperty(name = "application.name")
  String applicationName;

  /**
   * {@code POST  /organizations} : Create a new organization.
   *
   * @param organization the organization to create.
   * @return the {@link Response} with status {@code 201 (Created)} and with body the new organization, or with status
   *         {@code 400 (Bad Request)} if the organization has already an ID.
   */
  @POST
  @Transactional
  public Response createOrganization(@Valid Organization organization, @Context UriInfo uriInfo) {

    this.log.debug("REST request to save Organization : {}", organization);
    if (organization.id != null) {
      throw new BadRequestAlertException("A new organization cannot already have an ID", ENTITY_NAME, "idexists");
    }
    // System.out.println("########################hello :" + this.jwt.getName());
    var result = Organization.persistOrUpdate(organization);

    Locale.persistOrUpdate(getDefaultLocale(organization));

    var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
    HeaderUtil.createEntityCreationAlert(this.applicationName, true, ENTITY_NAME, result.id.toString())
        .forEach(response::header);
    return response.build();
  }

  private Locale getDefaultLocale(Organization organaization) {

    Locale locale = new Locale();
    int year = new Date().getYear();
    locale.financialStart = "Mar -" + year;
    locale.financialEnd = "Apr -" + (year + 1);
    locale.dateFormat = "dd/MM/yyyy";
    locale.organization = organaization;
    locale.timeFormat = "12 Hour";
    locale.locale = "India";
    locale.modificationCounter = 0;
    return locale;
  }

  /**
   * {@code PUT  /organizations} : Updates an existing organization.
   *
   * @param organization the organization to update.
   * @return the {@link Response} with status {@code 200 (OK)} and with body the updated organization, or with status
   *         {@code 400 (Bad Request)} if the organization is not valid, or with status
   *         {@code 500 (Internal Server Error)} if the organization couldn't be updated.
   */
  @PUT
  @Transactional
  public Response updateOrganization(@Valid Organization organization) {

    this.log.debug("REST request to update Organization : {}", organization);
    if (organization.id == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    var result = Organization.persistOrUpdate(organization);
    var response = Response.ok().entity(result);
    HeaderUtil.createEntityUpdateAlert(this.applicationName, true, ENTITY_NAME, organization.id.toString())
        .forEach(response::header);
    return response.build();
  }

  /**
   * {@code DELETE  /organizations/:id} : delete the "id" organization.
   *
   * @param id the id of the organization to delete.
   * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
   */
  @DELETE
  @Path("/{id}")
  @Transactional
  public Response deleteOrganization(@PathParam("id") Long id) {

    this.log.debug("REST request to delete Organization : {}", id);
    Organization.findByIdOptional(id).ifPresent(organization -> {
      Locale.deleteByOrganization(id);
      Designation.deleteByOrganization(id);
      Branch.deleteByOrganization(id);
      Department.deleteByOrganization(id);
      organization.delete();
    });
    var response = Response.noContent();
    HeaderUtil.createEntityDeletionAlert(this.applicationName, true, ENTITY_NAME, id.toString())
        .forEach(response::header);
    return response.build();
  }

  /**
   * {@code GET  /organizations} : get all the organizations. * @return the {@link Response} with status
   * {@code 200 (OK)} and the list of organizations in body.
   */
  @GET
  public List<Organization> getAllOrganizations() {

    this.log.debug("REST request to get all Organizations");
    return Organization.findAll().list();
  }

  /**
   * {@code GET  /organizations/:id} : get the "id" organization.
   *
   * @param id the id of the organization to retrieve.
   * @return the {@link Response} with status {@code 200 (OK)} and with body the organization, or with status
   *         {@code 404 (Not Found)}.
   */
  @GET
  @Path("/{id}")
  public Response getOrganization(@PathParam("id") Long id) {

    this.log.debug("REST request to get Organization : {}", id);
    Optional<Organization> organization = Organization.findByIdOptional(id);
    return ResponseUtil.wrapOrNotFound(organization);
  }
}
