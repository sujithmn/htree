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

import com.ssplus.hr.domain.Branch;
import com.ssplus.hr.web.rest.errors.BadRequestAlertException;
import com.ssplus.hr.web.util.HeaderUtil;
import com.ssplus.hr.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ssplus.hr.domain.Branch}.
 */
@Path("/api/branches")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class BranchResource {

  private final Logger log = LoggerFactory.getLogger(BranchResource.class);

  private static final String ENTITY_NAME = "hrmsBranch";

  @ConfigProperty(name = "application.name")
  String applicationName;

  /**
   * {@code POST  /branches} : Create a new branch.
   *
   * @param branch the branch to create.
   * @return the {@link Response} with status {@code 201 (Created)} and with body the new branch, or with status
   *         {@code 400 (Bad Request)} if the branch has already an ID.
   */
  @POST
  @Transactional
  public Response createBranch(@Valid Branch branch, @Context UriInfo uriInfo) {

    this.log.info("REST request to save Branch : {}", branch);
    if (branch.id != null) {
      throw new BadRequestAlertException("A new branch cannot already have an ID", ENTITY_NAME, "idexists");
    }
    var result = Branch.persistOrUpdate(branch);
    var response = Response.created(fromPath(uriInfo.getPath()).path(result.id.toString()).build()).entity(result);
    HeaderUtil.createEntityCreationAlert(this.applicationName, true, ENTITY_NAME, result.id.toString())
        .forEach(response::header);
    return response.build();
  }

  /**
   * {@code PUT  /branches} : Updates an existing branch.
   *
   * @param branch the branch to update.
   * @return the {@link Response} with status {@code 200 (OK)} and with body the updated branch, or with status
   *         {@code 400 (Bad Request)} if the branch is not valid, or with status {@code 500 (Internal Server Error)} if
   *         the branch couldn't be updated.
   */
  @PUT
  @Transactional
  public Response updateBranch(@Valid Branch branch) {

    this.log.debug("REST request to update Branch : {}", branch);
    if (branch.id == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    var result = Branch.persistOrUpdate(branch);
    var response = Response.ok().entity(result);
    HeaderUtil.createEntityUpdateAlert(this.applicationName, true, ENTITY_NAME, branch.id.toString())
        .forEach(response::header);
    return response.build();
  }

  /**
   * {@code DELETE  /branches/:id} : delete the "id" branch.
   *
   * @param id the id of the branch to delete.
   * @return the {@link Response} with status {@code 204 (NO_CONTENT)}.
   */
  @DELETE
  @Path("/{id}")
  @Transactional
  public Response deleteBranch(@PathParam("id") Long id) {

    this.log.debug("REST request to delete Branch : {}", id);
    Branch.findByIdOptional(id).ifPresent(branch -> {
      branch.delete();
    });
    var response = Response.noContent();
    HeaderUtil.createEntityDeletionAlert(this.applicationName, true, ENTITY_NAME, id.toString())
        .forEach(response::header);
    return response.build();
  }

  /**
   * {@code GET  /branches} : get all the branches. * @return the {@link Response} with status {@code 200 (OK)} and the
   * list of branches in body.
   */
  @GET
  public List<Branch> getAllBranches() {

    this.log.debug("REST request to get all Branches");
    return Branch.findAll().list();
  }

  /**
   * {@code GET  /branches/:id} : get the "id" branch.
   *
   * @param id the id of the branch to retrieve.
   * @return the {@link Response} with status {@code 200 (OK)} and with body the branch, or with status
   *         {@code 404 (Not Found)}.
   */
  @GET
  @Path("/{id}")

  public Response getBranch(@PathParam("id") Long id) {

    this.log.debug("REST request to get Branch : {}", id);
    Optional<Branch> branch = Branch.findByIdOptional(id);
    return ResponseUtil.wrapOrNotFound(branch);
  }
}
