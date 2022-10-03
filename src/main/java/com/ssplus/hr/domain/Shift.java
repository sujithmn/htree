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
import javax.validation.constraints.NotNull;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * A Shift.
 */
@Entity
@Table(name = "shift")
@Cacheable
@RegisterForReflection
public class Shift extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modification_counter")
  public Integer modificationCounter;

  @NotNull
  @Column(name = "shift_name", nullable = false)
  public String shiftName;

  @Column(name = "short_name")
  public String shortName;

  @Column(name = "start_time")
  public String startTime;

  @Column(name = "end_time")
  public String endTime;

  @Column(name = "break_duration")
  public String breakDuration;

  @Column(name = "workhours_half_day")
  public String workhoursHalfDay;

  @Column(name = "workhours_full_day")
  public String workhoursFullDay;

  @Column(name = "workdays_weekly")
  public String workdaysWeekly;

  @Column(name = "grace_time_late_in")
  public Integer graceTimeLateIn;

  @Column(name = "grace_time_early_out")
  public Integer graceTimeEarlyOut;

  @OneToOne
  @JoinColumn(unique = true)
  public OverTimeSetting overTimeSetting;

  @OneToOne
  @JoinColumn(unique = true)
  public AttendancePolicyNotification attendancePolicyNotification;

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
    if (!(o instanceof Shift)) {
      return false;
    }
    return this.id != null && this.id.equals(((Shift) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "Shift{" + "id=" + this.id + ", modificationCounter=" + this.modificationCounter + ", shiftName='"
        + this.shiftName + "'" + ", shortName='" + this.shortName + "'" + ", startTime='" + this.startTime + "'"
        + ", endTime='" + this.endTime + "'" + ", breakDuration='" + this.breakDuration + "'" + ", workhoursHalfDay='"
        + this.workhoursHalfDay + "'" + ", workhoursFullDay='" + this.workhoursFullDay + "'" + ", graceTimeLateIn="
        + this.graceTimeLateIn + ", graceTimeEarlyOut=" + this.graceTimeEarlyOut + "}";
  }

  public Shift update() {

    return update(this);
  }

  public Shift persistOrUpdate() {

    return persistOrUpdate(this);
  }

  public static Shift update(Shift shift) {

    if (shift == null) {
      throw new IllegalArgumentException("shift can't be null");
    }
    var entity = Shift.<Shift> findById(shift.id);
    if (entity != null) {
      entity.modificationCounter = shift.modificationCounter;
      entity.shiftName = shift.shiftName;
      entity.shortName = shift.shortName;
      entity.startTime = shift.startTime;
      entity.endTime = shift.endTime;
      entity.breakDuration = shift.breakDuration;
      entity.workhoursHalfDay = shift.workhoursHalfDay;
      entity.workhoursFullDay = shift.workhoursFullDay;
      entity.graceTimeLateIn = shift.graceTimeLateIn;
      entity.graceTimeEarlyOut = shift.graceTimeEarlyOut;
      entity.overTimeSetting = shift.overTimeSetting;
      entity.attendancePolicyNotification = shift.attendancePolicyNotification;
      entity.organization = shift.organization;
    }
    return entity;
  }

  public static Shift persistOrUpdate(Shift shift) {

    if (shift == null) {
      throw new IllegalArgumentException("shift can't be null");
    }
    if (shift.id == null) {
      persist(shift);
      return shift;
    } else {
      return update(shift);
    }
  }

}
