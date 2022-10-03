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
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * A LeaveApproval.
 */
@Entity
@Table(name = "leave_approval")
@Cacheable
@RegisterForReflection
public class LeaveApproval extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modification_counter")
  public Integer modificationCounter;

  @NotNull
  @Column(name = "leave_type", nullable = false)
  public String leaveType;

  @NotNull
  @Column(name = "paidleave", nullable = false)
  public String paidleave;

  @NotNull
  @JsonbDateFormat(value = "yyyy-MM-dd")
  @Column(name = "from_date", nullable = false)
  public LocalDate fromDate;

  @NotNull
  @JsonbDateFormat(value = "yyyy-MM-dd")
  @Column(name = "to_date", nullable = false)
  public LocalDate toDate;

  @NotNull
  @Column(name = "hours", nullable = false)
  public Integer hours;

  @NotNull
  @Column(name = "remarks", nullable = false)
  public String remarks;

  @Column(name = "notfication_required")
  public Boolean notficationRequired;

  @ManyToOne
  @JoinColumn(name = "employee_id")
  @JsonbTransient
  public Employee employee;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

  @Override
  public boolean equals(Object o) {

    if (this == o) {
      return true;
    }
    if (!(o instanceof LeaveApproval)) {
      return false;
    }
    return this.id != null && this.id.equals(((LeaveApproval) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "LeaveApproval{" + "id=" + this.id + ", modificationCounter=" + this.modificationCounter + ", leaveType='"
        + this.leaveType + "'" + ", paidleave='" + this.paidleave + "'" + ", fromDate='" + this.fromDate + "'"
        + ", toDate='" + this.toDate + "'" + ", hours=" + this.hours + ", remarks='" + this.remarks + "'"
        + ", notficationRequired='" + this.notficationRequired + "'" + "}";
  }

  public LeaveApproval update() {

    return update(this);
  }

  public LeaveApproval persistOrUpdate() {

    return persistOrUpdate(this);
  }

  public static LeaveApproval update(LeaveApproval leaveApproval) {

    if (leaveApproval == null) {
      throw new IllegalArgumentException("leaveApproval can't be null");
    }
    var entity = LeaveApproval.<LeaveApproval> findById(leaveApproval.id);
    if (entity != null) {
      entity.modificationCounter = leaveApproval.modificationCounter;
      entity.leaveType = leaveApproval.leaveType;
      entity.paidleave = leaveApproval.paidleave;
      entity.fromDate = leaveApproval.fromDate;
      entity.toDate = leaveApproval.toDate;
      entity.hours = leaveApproval.hours;
      entity.remarks = leaveApproval.remarks;
      entity.notficationRequired = leaveApproval.notficationRequired;
      entity.employee = leaveApproval.employee;
    }
    return entity;
  }

  public static LeaveApproval persistOrUpdate(LeaveApproval leaveApproval) {

    if (leaveApproval == null) {
      throw new IllegalArgumentException("leaveApproval can't be null");
    }
    if (leaveApproval.id == null) {
      persist(leaveApproval);
      return leaveApproval;
    } else {
      return update(leaveApproval);
    }
  }

}
