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

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * A SalaryTx.
 */
@Entity
@Table(name = "salary_tx")
@Cacheable
@RegisterForReflection
public class SalaryTx extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modificationcounter")
  public Integer modificationcounter;

  @Column(name = "salarydate")
  @JsonbDateFormat(value = "yyyy-MM-dd")
  public LocalDate salarydate;

  @Column(name = "amountrecd")
  public Integer amountrecd;

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
    if (!(o instanceof SalaryTx)) {
      return false;
    }
    return this.id != null && this.id.equals(((SalaryTx) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "SalaryTx{" + "id=" + this.id + ", modificationcounter=" + this.modificationcounter + ", salarydate='"
        + this.salarydate + "'" + ", amountrecd=" + this.amountrecd + "}";
  }

  public SalaryTx update() {

    return update(this);
  }

  public SalaryTx persistOrUpdate() {

    return persistOrUpdate(this);
  }

  public static SalaryTx update(SalaryTx salaryTx) {

    if (salaryTx == null) {
      throw new IllegalArgumentException("salaryTx can't be null");
    }
    var entity = SalaryTx.<SalaryTx> findById(salaryTx.id);
    if (entity != null) {
      entity.modificationcounter = salaryTx.modificationcounter;
      entity.salarydate = salaryTx.salarydate;
      entity.amountrecd = salaryTx.amountrecd;
      entity.employee = salaryTx.employee;
    }
    return entity;
  }

  public static SalaryTx persistOrUpdate(SalaryTx salaryTx) {

    if (salaryTx == null) {
      throw new IllegalArgumentException("salaryTx can't be null");
    }
    if (salaryTx.id == null) {
      persist(salaryTx);
      return salaryTx;
    } else {
      return update(salaryTx);
    }
  }

}
