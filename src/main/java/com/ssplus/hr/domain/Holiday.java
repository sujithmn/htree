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
 * A Holiday.
 */
@Entity
@Table(name = "holiday")
@Cacheable
@RegisterForReflection
public class Holiday extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modification_counter")
  public Integer modificationCounter;

  @NotNull
  @Column(name = "holiday_name", nullable = false)
  public String holidayName;

  @NotNull
  @JsonbDateFormat(value = "yyyy-MM-dd")
  @Column(name = "holiday_date", nullable = false)
  public LocalDate holidayDate;

  @NotNull
  @Column(name = "holiday_type", nullable = false)
  public String holidayType;

  @ManyToOne
  @JoinColumn(name = "organization_id")
  @JsonbTransient
  public Organization organization;

  @ManyToOne
  @JoinColumn(name = "department_id")
  @JsonbTransient
  public Department department;

  @ManyToOne
  @JoinColumn(name = "branch_id")
  @JsonbTransient
  public Branch branch;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

  @Override
  public boolean equals(Object o) {

    if (this == o) {
      return true;
    }
    if (!(o instanceof Holiday)) {
      return false;
    }
    return this.id != null && this.id.equals(((Holiday) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "Holiday{" + "id=" + this.id + ", modificationCounter=" + this.modificationCounter + ", holidayName='"
        + this.holidayName + "'" + ", holidayDate='" + this.holidayDate + "'" + ", holidayType='" + this.holidayType
        + "'" + "}";
  }

  public Holiday update() {

    return update(this);
  }

  public Holiday persistOrUpdate() {

    return persistOrUpdate(this);
  }

  public static Holiday update(Holiday holiday) {

    if (holiday == null) {
      throw new IllegalArgumentException("holiday can't be null");
    }
    var entity = Holiday.<Holiday> findById(holiday.id);
    if (entity != null) {
      entity.modificationCounter = holiday.modificationCounter;
      entity.holidayName = holiday.holidayName;
      entity.holidayDate = holiday.holidayDate;
      entity.holidayType = holiday.holidayType;
      entity.organization = holiday.organization;
    }
    return entity;
  }

  public static Holiday persistOrUpdate(Holiday holiday) {

    if (holiday == null) {
      throw new IllegalArgumentException("holiday can't be null");
    }
    if (holiday.id == null) {
      persist(holiday);
      return holiday;
    } else {
      return update(holiday);
    }
  }

}
