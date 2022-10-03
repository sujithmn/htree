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

import org.codehaus.jackson.annotate.JsonIgnore;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * A EmployeeShiftSetting.
 */
@Entity
@Table(name = "employee_shift_setting")
@Cacheable
@RegisterForReflection
public class EmployeeShiftSetting extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modification_counter")
  public Integer modificationCounter;

  @OneToOne(mappedBy = "employeeShiftSetting")
  @JsonIgnore
  public Employee employee;

  @ManyToOne
  @JoinColumn(name = "branch_id")
  @JsonbTransient
  public Branch branch;

  @ManyToOne
  @JoinColumn(name = "designation_id")
  @JsonbTransient
  public Designation designation;

  @ManyToOne
  @JoinColumn(name = "department_id")
  @JsonbTransient
  public Department department;

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
    if (!(o instanceof EmployeeShiftSetting)) {
      return false;
    }
    return this.id != null && this.id.equals(((EmployeeShiftSetting) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "EmployeeShiftSetting{" + "id=" + this.id + ", modificationCounter=" + this.modificationCounter + "}";
  }

  public EmployeeShiftSetting update() {

    return update(this);
  }

  public EmployeeShiftSetting persistOrUpdate() {

    return persistOrUpdate(this);
  }

  public static EmployeeShiftSetting update(EmployeeShiftSetting employeeShiftSetting) {

    if (employeeShiftSetting == null) {
      throw new IllegalArgumentException("employeeShiftSetting can't be null");
    }
    var entity = EmployeeShiftSetting.<EmployeeShiftSetting> findById(employeeShiftSetting.id);
    if (entity != null) {
      entity.modificationCounter = employeeShiftSetting.modificationCounter;
      entity.employee = employeeShiftSetting.employee;
      entity.branch = employeeShiftSetting.branch;
      entity.designation = employeeShiftSetting.designation;
      entity.department = employeeShiftSetting.department;
      entity.organization = employeeShiftSetting.organization;
    }
    return entity;
  }

  public static EmployeeShiftSetting persistOrUpdate(EmployeeShiftSetting employeeShiftSetting) {

    if (employeeShiftSetting == null) {
      throw new IllegalArgumentException("employeeShiftSetting can't be null");
    }
    if (employeeShiftSetting.id == null) {
      persist(employeeShiftSetting);
      return employeeShiftSetting;
    } else {
      return update(employeeShiftSetting);
    }
  }

}
