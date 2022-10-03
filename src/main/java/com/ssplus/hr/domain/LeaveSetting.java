package com.ssplus.hr.domain;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import javax.json.bind.annotation.JsonbTransient;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.runtime.annotations.RegisterForReflection;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A LeaveSetting.
 */
@Entity
@Table(name = "leave_setting")
@Cacheable
@RegisterForReflection
public class LeaveSetting extends PanacheEntityBase implements Serializable {

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
    @Column(name = "short_name", nullable = false)
    public String shortName;

    @NotNull
    @Column(name = "leave_limit", nullable = false)
    public String leaveLimit;

    @NotNull
    @Column(name = "carry_forward", nullable = false)
    public Integer carryForward;

    @Column(name = "applicable_to")
    public String applicableTo;

    @Column(name = "paid_leave")
    public Boolean paidLeave;

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
        if (!(o instanceof LeaveSetting)) {
            return false;
        }
        return id != null && id.equals(((LeaveSetting) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "LeaveSetting{" +
            "id=" + id +
            ", modificationCounter=" + modificationCounter +
            ", leaveType='" + leaveType + "'" +
            ", shortName='" + shortName + "'" +
            ", leaveLimit='" + leaveLimit + "'" +
            ", carryForward=" + carryForward +
            ", applicableTo='" + applicableTo + "'" +
            ", paidLeave='" + paidLeave + "'" +
            "}";
    }

    public LeaveSetting update() {
        return update(this);
    }

    public LeaveSetting persistOrUpdate() {
        return persistOrUpdate(this);
    }

    public static LeaveSetting update(LeaveSetting leaveSetting) {
        if (leaveSetting == null) {
            throw new IllegalArgumentException("leaveSetting can't be null");
        }
        var entity = LeaveSetting.<LeaveSetting>findById(leaveSetting.id);
        if (entity != null) {
            entity.modificationCounter = leaveSetting.modificationCounter;
            entity.leaveType = leaveSetting.leaveType;
            entity.shortName = leaveSetting.shortName;
            entity.leaveLimit = leaveSetting.leaveLimit;
            entity.carryForward = leaveSetting.carryForward;
            entity.applicableTo = leaveSetting.applicableTo;
            entity.paidLeave = leaveSetting.paidLeave;
            entity.organization = leaveSetting.organization;
        }
        return entity;
    }

    public static LeaveSetting persistOrUpdate(LeaveSetting leaveSetting) {
        if (leaveSetting == null) {
            throw new IllegalArgumentException("leaveSetting can't be null");
        }
        if (leaveSetting.id == null) {
            persist(leaveSetting);
            return leaveSetting;
        } else {
            return update(leaveSetting);
        }
    }


}
