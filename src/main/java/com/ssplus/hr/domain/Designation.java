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
 * A Designation.
 */
@Entity
@Table(name = "designation")
@Cacheable
@RegisterForReflection
public class Designation extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modification_counter")
  public Integer modificationCounter;

  @NotNull
  @Column(name = "desig_name", nullable = false)
  public String desigName;

  @OneToOne
  @JoinColumn(unique = true)
  public EmployeeShiftSetting employeeShiftSetting;

  @ManyToOne
  @JoinColumn(name = "organization_id")
  @JsonbTransient
  public Organization organization;

  @Transient
  public Long organization_id;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

  @Override
  public boolean equals(Object o) {

    if (this == o) {
      return true;
    }
    if (!(o instanceof Designation)) {
      return false;
    }
    return this.id != null && this.id.equals(((Designation) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "Designation{" + "id=" + this.id + ", modificationCounter=" + this.modificationCounter + ", desigName='"
        + this.desigName + "'" + "}";
  }

  public Designation update() {

    return update(this);
  }

  public Designation persistOrUpdate() {

    setOrganization(this);
    return persistOrUpdate(this);
  }

  public static Designation update(Designation designation) {

    if (designation == null) {
      throw new IllegalArgumentException("designation can't be null");
    }
    var entity = Designation.<Designation> findById(designation.id);
    if (entity != null) {
      entity.modificationCounter = designation.modificationCounter;
      entity.desigName = designation.desigName;
      entity.employeeShiftSetting = designation.employeeShiftSetting;
      entity.organization = designation.organization;
    }
    return entity;
  }

  private static void setOrganization(Designation designation) {

    Organization organization = new Organization();
    organization.id = designation.organization_id;
    designation.organization = organization;
  }

  public static Designation persistOrUpdate(Designation designation) {

    if (designation == null) {
      throw new IllegalArgumentException("designation can't be null");
    }
    setOrganization(designation);
    if (designation.id == null) {
      persist(designation);
      return designation;
    } else {
      return update(designation);
    }
  }

  public static Long deleteByOrganization(Long orgId) {

    return delete("from Designation where organization.id=?1", orgId);

  }

}
