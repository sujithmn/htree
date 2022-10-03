package com.ssplus.hr.domain;
import org.codehaus.jackson.annotate.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import javax.json.bind.annotation.JsonbTransient;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.runtime.annotations.RegisterForReflection;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A OverTimeSetting.
 */
@Entity
@Table(name = "over_time_setting")
@Cacheable
@RegisterForReflection
public class OverTimeSetting extends PanacheEntityBase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "modification_counter")
    public Integer modificationCounter;

    @Column(name = "applicable")
    public Boolean applicable;

    @Column(name = "min_over_time_hours")
    public Integer minOverTimeHours;

    @Column(name = "description")
    public String description;

    @OneToOne(mappedBy = "overTimeSetting")
    @JsonIgnore
    public Shift shift;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OverTimeSetting)) {
            return false;
        }
        return id != null && id.equals(((OverTimeSetting) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OverTimeSetting{" +
            "id=" + id +
            ", modificationCounter=" + modificationCounter +
            ", applicable='" + applicable + "'" +
            ", minOverTimeHours=" + minOverTimeHours +
            ", description='" + description + "'" +
            "}";
    }

    public OverTimeSetting update() {
        return update(this);
    }

    public OverTimeSetting persistOrUpdate() {
        return persistOrUpdate(this);
    }

    public static OverTimeSetting update(OverTimeSetting overTimeSetting) {
        if (overTimeSetting == null) {
            throw new IllegalArgumentException("overTimeSetting can't be null");
        }
        var entity = OverTimeSetting.<OverTimeSetting>findById(overTimeSetting.id);
        if (entity != null) {
            entity.modificationCounter = overTimeSetting.modificationCounter;
            entity.applicable = overTimeSetting.applicable;
            entity.minOverTimeHours = overTimeSetting.minOverTimeHours;
            entity.description = overTimeSetting.description;
            entity.shift = overTimeSetting.shift;
        }
        return entity;
    }

    public static OverTimeSetting persistOrUpdate(OverTimeSetting overTimeSetting) {
        if (overTimeSetting == null) {
            throw new IllegalArgumentException("overTimeSetting can't be null");
        }
        if (overTimeSetting.id == null) {
            persist(overTimeSetting);
            return overTimeSetting;
        } else {
            return update(overTimeSetting);
        }
    }


}
