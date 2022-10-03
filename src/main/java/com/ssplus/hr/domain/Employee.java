package com.ssplus.hr.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
@Cacheable
@RegisterForReflection
public class Employee extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modification_counter")
  public Integer modificationCounter;

  @NotNull
  @Column(name = "employee_id", nullable = false, unique = true)
  public String employeeId;

  @NotNull
  @Column(name = "employee_name", nullable = false)
  public String employeeName;

  @NotNull
  @Column(name = "sex", nullable = false)
  public String sex;

  @Column(name = "marital_status")
  public String maritalStatus;

  @NotNull
  @Column(name = "date_of_birth", nullable = false)
  @JsonbDateFormat(value = "yyyy-MM-dd")
  public LocalDate dateOfBirth;

  @Column(name = "national_id_number")
  public String nationalIdNumber;

  @Column(name = "pan")
  public String pan;

  @Column(name = "blood_group")
  public String bloodGroup;

  @NotNull
  @Column(name = "address", nullable = false)
  public String address;

  @NotNull
  @Column(name = "email", nullable = false)
  public String email;

  @Column(name = "phone")
  public String phone;

  @OneToOne
  @JoinColumn(unique = true)
  public EmployeeAccessSetting employeeAccessSetting;

  @OneToOne
  @JoinColumn(unique = true)
  public EmployeeShiftSetting employeeShiftSetting;

  @OneToOne
  @JoinColumn(unique = true)
  public EmployeePayrollSetting employeePayrollSetting;

  @OneToOne
  @JoinColumn(unique = true)
  public Attendance attendance;

  @OneToMany(mappedBy = "employee")
  @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
  public Set<EmployeeLeaveTx> employeeLeaveTxes = new HashSet<>();

  @OneToMany(mappedBy = "employee")
  @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
  public Set<SalaryTx> salaryTxes = new HashSet<>();

  @OneToMany(mappedBy = "employee")
  @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
  public Set<LeaveApproval> leaveApprovals = new HashSet<>();

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
    if (!(o instanceof Employee)) {
      return false;
    }
    return this.id != null && this.id.equals(((Employee) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "Employee{" + "id=" + this.id + ", modificationCounter=" + this.modificationCounter + ", employeeId='"
        + this.employeeId + "'" + ", employeeName='" + this.employeeName + "'" + ", sex='" + this.sex + "'"
        + ", maritalStatus='" + this.maritalStatus + "'" + ", dateOfBirth='" + this.dateOfBirth + "'"
        + ", nationalIdNumber='" + this.nationalIdNumber + "'" + ", pan='" + this.pan + "'" + ", bloodGroup='"
        + this.bloodGroup + "'" + ", address='" + this.address + "'" + ", email='" + this.email + "'" + ", phone='"
        + this.phone + "'" + "}";
  }

  public Employee update() {

    return update(this);
  }

  public Employee persistOrUpdate() {

    return persistOrUpdate(this);
  }

  public static Employee update(Employee employee) {

    if (employee == null) {
      throw new IllegalArgumentException("employee can't be null");
    }
    var entity = Employee.<Employee> findById(employee.id);
    if (entity != null) {
      entity.modificationCounter = employee.modificationCounter;
      entity.employeeId = employee.employeeId;
      entity.employeeName = employee.employeeName;
      entity.sex = employee.sex;
      entity.maritalStatus = employee.maritalStatus;
      entity.dateOfBirth = employee.dateOfBirth;
      entity.nationalIdNumber = employee.nationalIdNumber;
      entity.pan = employee.pan;
      entity.bloodGroup = employee.bloodGroup;
      entity.address = employee.address;
      entity.email = employee.email;
      entity.phone = employee.phone;
      entity.employeeAccessSetting = employee.employeeAccessSetting;
      entity.employeeShiftSetting = employee.employeeShiftSetting;
      entity.employeePayrollSetting = employee.employeePayrollSetting;
      entity.attendance = employee.attendance;
      entity.employeeLeaveTxes = employee.employeeLeaveTxes;
      entity.salaryTxes = employee.salaryTxes;
      entity.leaveApprovals = employee.leaveApprovals;
      entity.organization = employee.organization;
    }
    return entity;
  }

  public static Employee persistOrUpdate(Employee employee) {

    if (employee == null) {
      throw new IllegalArgumentException("employee can't be null");
    }
    if (employee.id == null) {
      persist(employee);
      return employee;
    } else {
      return update(employee);
    }
  }

}
