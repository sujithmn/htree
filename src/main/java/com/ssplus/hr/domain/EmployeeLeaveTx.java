package com.ssplus.hr.domain;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import javax.json.bind.annotation.JsonbTransient;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.runtime.annotations.RegisterForReflection;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A EmployeeLeaveTx.
 */
@Entity
@Table(name = "employee_leave_tx")
@Cacheable
@RegisterForReflection
public class EmployeeLeaveTx extends PanacheEntityBase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "modification_counter")
    public Integer modificationCounter;

    @Column(name = "leave_availed")
    public Integer leaveAvailed;

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
        if (!(o instanceof EmployeeLeaveTx)) {
            return false;
        }
        return id != null && id.equals(((EmployeeLeaveTx) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EmployeeLeaveTx{" +
            "id=" + id +
            ", modificationCounter=" + modificationCounter +
            ", leaveAvailed=" + leaveAvailed +
            "}";
    }

    public EmployeeLeaveTx update() {
        return update(this);
    }

    public EmployeeLeaveTx persistOrUpdate() {
        return persistOrUpdate(this);
    }

    public static EmployeeLeaveTx update(EmployeeLeaveTx employeeLeaveTx) {
        if (employeeLeaveTx == null) {
            throw new IllegalArgumentException("employeeLeaveTx can't be null");
        }
        var entity = EmployeeLeaveTx.<EmployeeLeaveTx>findById(employeeLeaveTx.id);
        if (entity != null) {
            entity.modificationCounter = employeeLeaveTx.modificationCounter;
            entity.leaveAvailed = employeeLeaveTx.leaveAvailed;
            entity.employee = employeeLeaveTx.employee;
        }
        return entity;
    }

    public static EmployeeLeaveTx persistOrUpdate(EmployeeLeaveTx employeeLeaveTx) {
        if (employeeLeaveTx == null) {
            throw new IllegalArgumentException("employeeLeaveTx can't be null");
        }
        if (employeeLeaveTx.id == null) {
            persist(employeeLeaveTx);
            return employeeLeaveTx;
        } else {
            return update(employeeLeaveTx);
        }
    }


}
