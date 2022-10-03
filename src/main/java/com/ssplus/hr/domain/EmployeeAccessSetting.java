package com.ssplus.hr.domain;

import java.io.Serializable;
import java.time.LocalDate;

import javax.json.bind.annotation.JsonbDateFormat;
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
 * A EmployeeAccessSetting.
 */
@Entity
@Table(name = "employee_access_setting")
@Cacheable
@RegisterForReflection
public class EmployeeAccessSetting extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modification_counter")
  public Integer modificationCounter;

  @Column(name = "emp_type")
  public String empType;

  @Column(name = "emp_status")
  public String empStatus;

  @Column(name = "badge_id")
  public String badgeId;

  @Column(name = "mobile_app_access")
  public Boolean mobileAppAccess;

  @Column(name = "resigndate")
  @JsonbDateFormat(value = "yyyy-MM-dd")
  public LocalDate resigndate;

  @Column(name = "joindate")
  @JsonbDateFormat(value = "yyyy-MM-dd")
  public LocalDate joindate;

  @OneToOne(mappedBy = "employeeAccessSetting")
  @JsonIgnore
  public Employee employee;

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
    if (!(o instanceof EmployeeAccessSetting)) {
      return false;
    }
    return this.id != null && this.id.equals(((EmployeeAccessSetting) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "EmployeeAccessSetting{" + "id=" + this.id + ", modificationCounter=" + this.modificationCounter
        + ", empType='" + this.empType + "'" + ", empStatus='" + this.empStatus + "'" + ", badgeId='" + this.badgeId
        + "'" + ", mobileAppAccess='" + this.mobileAppAccess + "'" + ", resigndate='" + this.resigndate + "'"
        + ", joindate='" + this.joindate + "'" + "}";
  }

  public EmployeeAccessSetting update() {

    return update(this);
  }

  public EmployeeAccessSetting persistOrUpdate() {

    return persistOrUpdate(this);
  }

  public static EmployeeAccessSetting update(EmployeeAccessSetting employeeAccessSetting) {

    if (employeeAccessSetting == null) {
      throw new IllegalArgumentException("employeeAccessSetting can't be null");
    }
    var entity = EmployeeAccessSetting.<EmployeeAccessSetting> findById(employeeAccessSetting.id);
    if (entity != null) {
      entity.modificationCounter = employeeAccessSetting.modificationCounter;
      entity.empType = employeeAccessSetting.empType;
      entity.empStatus = employeeAccessSetting.empStatus;
      entity.badgeId = employeeAccessSetting.badgeId;
      entity.mobileAppAccess = employeeAccessSetting.mobileAppAccess;
      entity.resigndate = employeeAccessSetting.resigndate;
      entity.joindate = employeeAccessSetting.joindate;
      entity.employee = employeeAccessSetting.employee;
      entity.organization = employeeAccessSetting.organization;
    }
    return entity;
  }

  public static EmployeeAccessSetting persistOrUpdate(EmployeeAccessSetting employeeAccessSetting) {

    if (employeeAccessSetting == null) {
      throw new IllegalArgumentException("employeeAccessSetting can't be null");
    }
    if (employeeAccessSetting.id == null) {
      persist(employeeAccessSetting);
      return employeeAccessSetting;
    } else {
      return update(employeeAccessSetting);
    }
  }

}
