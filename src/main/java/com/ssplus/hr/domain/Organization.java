package com.ssplus.hr.domain;

import java.io.Serializable;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * A Organization.
 */
@Entity
@Table(name = "organization")
@Cacheable
@RegisterForReflection
public class Organization extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modification_counter")
  public Integer modificationCounter;

  @NotNull
  @Column(name = "org_name", nullable = false, unique = true)
  public String orgName;

  @Column(name = "email")
  public String email;

  @Column(name = "phone")
  public String phone;

  @Column(name = "location")
  public String location;

  @Column(name = "address")
  public String address;

  @Column(name = "logo")
  public String logo;

  @Column(name = "default_org")
  public Boolean defaultOrg;

  /*
   * @OneToMany(mappedBy = "organization")
   *
   * @Cache(usage = CacheConcurrencyStrategy.READ_WRITE) public Set<Branch> branches = new HashSet<>();
   *
   * @OneToMany(mappedBy = "organization")
   *
   * @Cache(usage = CacheConcurrencyStrategy.READ_WRITE) public Set<Department> departments = new HashSet<>();
   *
   * @OneToMany(mappedBy = "organization")
   *
   * @Cache(usage = CacheConcurrencyStrategy.READ_WRITE) public Set<Designation> designations = new HashSet<>();
   *
   * @OneToMany(mappedBy = "organization")
   *
   * @Cache(usage = CacheConcurrencyStrategy.READ_WRITE) public Set<Locale> locales = new HashSet<>();
   */

  /*
   * @OneToMany(mappedBy = "organization")
   *
   * @Cache(usage = CacheConcurrencyStrategy.READ_WRITE) public Set<Employee> employees = new HashSet<>();
   *
   * @OneToMany(mappedBy = "organization")
   *
   * @Cache(usage = CacheConcurrencyStrategy.READ_WRITE) public Set<EmployeeAccessSetting> employeeAccessSettings = new
   * HashSet<>();
   *
   * @OneToMany(mappedBy = "organization")
   *
   * @Cache(usage = CacheConcurrencyStrategy.READ_WRITE) public Set<EmployeeShiftSetting> employeeShiftSettings = new
   * HashSet<>();
   *
   * @OneToMany(mappedBy = "organization")
   *
   * @Cache(usage = CacheConcurrencyStrategy.READ_WRITE) public Set<Shift> shifts = new HashSet<>();
   *
   * @OneToMany(mappedBy = "organization")
   *
   * @Cache(usage = CacheConcurrencyStrategy.READ_WRITE) public Set<LeaveSetting> leaveSettings = new HashSet<>();
   */

  /*
   * @OneToMany(mappedBy = "organization")
   *
   * @Cache(usage = CacheConcurrencyStrategy.READ_WRITE) public Set<Holiday> holidays = new HashSet<>();
   */

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

  @Override
  public boolean equals(Object o) {

    if (this == o) {
      return true;
    }
    if (!(o instanceof Organization)) {
      return false;
    }
    return this.id != null && this.id.equals(((Organization) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "Organization{" + "id=" + this.id + ", modificationCounter=" + this.modificationCounter + ", orgName='"
        + this.orgName + "'" + ", email='" + this.email + "'" + ", phone='" + this.phone + "'" + ", location='"
        + this.location + "'" + ", address='" + this.address + "'" + ", logo='" + this.logo + "'" + ", defaultOrg='"
        + this.defaultOrg + "'" + "}";
  }

  public Organization update() {

    return update(this);
  }

  public Organization persistOrUpdate() {

    return persistOrUpdate(this);
  }

  public static Organization update(Organization organization) {

    if (organization == null) {
      throw new IllegalArgumentException("organization can't be null");
    }
    var entity = Organization.<Organization> findById(organization.id);
    if (entity != null) {
      entity.modificationCounter = organization.modificationCounter;
      entity.orgName = organization.orgName;
      entity.email = organization.email;
      entity.phone = organization.phone;
      entity.location = organization.location;
      entity.address = organization.address;
      entity.logo = organization.logo;
      entity.defaultOrg = organization.defaultOrg;
      /*
       * entity.branches = organization.branches; entity.departments = organization.departments; entity.designations =
       * organization.designations; entity.locales = organization.locales;
       */
      /*
       * entity.employees = organization.employees; entity.employeeAccessSettings = organization.employeeAccessSettings;
       * entity.employeeShiftSettings = organization.employeeShiftSettings; entity.shifts = organization.shifts;
       * entity.leaveSettings = organization.leaveSettings; // entity.holidays = organization.holidays;
       */ }
    return entity;
  }

  public static Organization persistOrUpdate(Organization organization) {

    if (organization == null) {
      throw new IllegalArgumentException("organization can't be null");
    }
    if (organization.id == null) {
      persist(organization);
      return organization;
    } else {
      return update(organization);
    }
  }

}
