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
 * A Department.
 */
@Entity
@Table(name = "department")
@Cacheable
@RegisterForReflection
public class Department extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modification_counter")
  public Integer modificationCounter;

  @NotNull
  @Column(name = "dept_name", nullable = false)
  public String deptName;

  @Column(name = "dept_head")
  public String deptHead;

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
    if (!(o instanceof Department)) {
      return false;
    }
    return this.id != null && this.id.equals(((Department) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "Department{" + "id=" + this.id + ", modificationCounter=" + this.modificationCounter + ", deptName='"
        + this.deptName + "'" + ", deptHead='" + this.deptHead + "'" + "}";
  }

  public Department update() {

    return update(this);
  }

  public Department persistOrUpdate() {

    setOrganization(this);
    return persistOrUpdate(this);
  }

  public static Department update(Department department) {

    if (department == null) {
      throw new IllegalArgumentException("department can't be null");
    }
    var entity = Department.<Department> findById(department.id);
    if (entity != null) {
      entity.modificationCounter = department.modificationCounter;
      entity.deptName = department.deptName;
      entity.deptHead = department.deptHead;
      entity.employeeShiftSetting = department.employeeShiftSetting;
      entity.organization = department.organization;
    }
    return entity;
  }

  private static void setOrganization(Department department) {

    Organization organization = new Organization();
    organization.id = department.organization_id;
    department.organization = organization;
  }

  public static Department persistOrUpdate(Department department) {

    if (department == null) {
      throw new IllegalArgumentException("department can't be null");
    }
    setOrganization(department);
    if (department.id == null) {
      persist(department);
      return department;
    } else {
      return update(department);
    }
  }

  public static Long deleteByOrganization(Long orgId) {

    return delete("from Department where organization.id=?1", orgId);

  }

}
