package com.ssplus.hr.domain;

import java.io.Serializable;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * A Branch.
 */
@Entity
@Table(name = "branch")
@Cacheable
@RegisterForReflection
public class Branch extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modification_counter")
  public Integer modificationCounter;

  @NotNull
  @Column(name = "branch_name", nullable = false)
  public String branchName;

  @Column(name = "branch_head")
  public String branchHead;

  @Column(name = "manager")
  public String manager;

  @Column(name = "location")
  public String location;

  @Column(name = "address")
  public String address;

  @Transient
  public Long organization_id;

  @OneToOne
  @JoinColumn(unique = true)
  public EmployeeShiftSetting employeeShiftSetting;

  @ManyToOne
  @JoinColumn(name = "organization_id")
  @JsonbTransient
  public Organization organization;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

  @Override
  public boolean equals(Object o) {

    if (this == o) {
      return true;
    }
    if (!(o instanceof Branch)) {
      return false;
    }
    return this.id != null && this.id.equals(((Branch) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "Branch{" + "id=" + this.id + ", modificationCounter=" + this.modificationCounter + ", branchName='"
        + this.branchName + "'" + ", branchHead='" + this.branchHead + "'" + ", manager='" + this.manager + "'"
        + ", location='" + this.location + "'" + ", address='" + this.address + "'" + ", organization_id='"
        + this.organization_id + "'" + "}";
  }

  public Branch update() {

    return update(this);
  }

  public Branch persistOrUpdate() {

    setOrganization(this);
    return persistOrUpdate(this);
  }

  public static Branch update(Branch branch) {

    if (branch == null) {
      throw new IllegalArgumentException("branch can't be null");
    }
    var entity = Branch.<Branch> findById(branch.id);
    if (entity != null) {
      entity.modificationCounter = branch.modificationCounter;
      entity.branchName = branch.branchName;
      entity.branchHead = branch.branchHead;
      entity.manager = branch.manager;
      entity.location = branch.location;
      entity.address = branch.address;
      entity.employeeShiftSetting = branch.employeeShiftSetting;
      entity.organization = branch.organization;
    }
    return entity;
  }

  private static void setOrganization(Branch branch) {

    Organization organization = new Organization();
    organization.id = branch.organization_id;
    branch.organization = organization;
  }

  public static Branch persistOrUpdate(Branch branch) {

    if (branch == null) {
      throw new IllegalArgumentException("branch can't be null");
    }
    setOrganization(branch);
    if (branch.id == null) {
      persist(branch);
      return branch;
    } else {
      return update(branch);
    }
  }

  public static Long deleteByOrganization(Long orgId) {

    return delete("from Branch where organization.id=?1", orgId);

  }

}
