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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * A Locale.
 */
@Entity
@Table(name = "locale")
@Cacheable
@RegisterForReflection
public class Locale extends PanacheEntityBase implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "modification_counter")
  public Integer modificationCounter;

  @NotNull
  @Column(name = "locale", nullable = false)
  public String locale;

  @Column(name = "date_format")
  public String dateFormat;

  @Column(name = "time_format")
  public String timeFormat;

  @Column(name = "financial_start")
  public String financialStart;

  @Column(name = "financial_end")
  public String financialEnd;

  // @ManyToOne
  @OneToOne
  @JoinColumn(name = "organization_id")
  @JsonbTransient
  public Organization organization;

  @Override
  public boolean equals(Object o) {

    if (this == o) {
      return true;
    }
    if (!(o instanceof Locale)) {
      return false;
    }
    return this.id != null && this.id.equals(((Locale) o).id);
  }

  @Override
  public int hashCode() {

    return 31;
  }

  @Override
  public String toString() {

    return "Locale{" + "id=" + this.id + ", modificationCounter=" + this.modificationCounter + ", locale='"
        + this.locale + "'" + ", dateFormat='" + this.dateFormat + "'" + ", timeFormat='" + this.timeFormat + "'"
        + ", financialStart='" + this.financialStart + "'" + ", financialEnd='" + this.financialEnd + "'" + "}";
  }

  public Locale update() {

    return update(this);
  }

  public Locale persistOrUpdate() {

    return persistOrUpdate(this);
  }

  public static Locale update(Locale locale) {

    if (locale == null) {
      throw new IllegalArgumentException("locale can't be null");
    }
    var entity = Locale.<Locale> findById(locale.id);
    if (entity != null) {
      entity.modificationCounter = locale.modificationCounter;
      entity.locale = locale.locale;
      entity.dateFormat = locale.dateFormat;
      entity.timeFormat = locale.timeFormat;
      entity.financialStart = locale.financialStart;
      entity.financialEnd = locale.financialEnd;
      entity.organization = locale.organization;
    }
    return entity;
  }

  public static Locale persistOrUpdate(Locale locale) {

    if (locale == null) {
      throw new IllegalArgumentException("locale can't be null");
    }
    if (locale.id == null) {
      persist(locale);
      return locale;
    } else {
      return update(locale);
    }
  }

  public static Long deleteByOrganization(Long orgId) {

    return delete("from Locale where organization.id=?1", orgId);
  }

  public static Locale findByOrganization(Long orgId) {

    return find("from Locale where organization.id=?1", orgId).firstResult();
  }

}
