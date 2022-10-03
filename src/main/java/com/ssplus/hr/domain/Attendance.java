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
 * A Attendance.
 */
@Entity
@Table(name = "attendance")
@Cacheable
@RegisterForReflection
public class Attendance extends PanacheEntityBase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "modification_counter")
    public Integer modificationCounter;

    @Column(name = "first_in")
    public Integer firstIn;

    @Column(name = "last_out")
    public Integer lastOut;

    @Column(name = "in_swipes")
    public String inSwipes;

    @Column(name = "out_swipes")
    public String outSwipes;

    @Column(name = "working_hours")
    public Integer workingHours;

    @Column(name = "out_side_hours")
    public Integer outSideHours;

    @Column(name = "overtime")
    public Integer overtime;

    @Column(name = "status")
    public String status;

    @OneToOne(mappedBy = "attendance")
    @JsonIgnore
    public Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Attendance)) {
            return false;
        }
        return id != null && id.equals(((Attendance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Attendance{" +
            "id=" + id +
            ", modificationCounter=" + modificationCounter +
            ", firstIn=" + firstIn +
            ", lastOut=" + lastOut +
            ", inSwipes='" + inSwipes + "'" +
            ", outSwipes='" + outSwipes + "'" +
            ", workingHours=" + workingHours +
            ", outSideHours=" + outSideHours +
            ", overtime=" + overtime +
            ", status='" + status + "'" +
            "}";
    }

    public Attendance update() {
        return update(this);
    }

    public Attendance persistOrUpdate() {
        return persistOrUpdate(this);
    }

    public static Attendance update(Attendance attendance) {
        if (attendance == null) {
            throw new IllegalArgumentException("attendance can't be null");
        }
        var entity = Attendance.<Attendance>findById(attendance.id);
        if (entity != null) {
            entity.modificationCounter = attendance.modificationCounter;
            entity.firstIn = attendance.firstIn;
            entity.lastOut = attendance.lastOut;
            entity.inSwipes = attendance.inSwipes;
            entity.outSwipes = attendance.outSwipes;
            entity.workingHours = attendance.workingHours;
            entity.outSideHours = attendance.outSideHours;
            entity.overtime = attendance.overtime;
            entity.status = attendance.status;
            entity.employee = attendance.employee;
        }
        return entity;
    }

    public static Attendance persistOrUpdate(Attendance attendance) {
        if (attendance == null) {
            throw new IllegalArgumentException("attendance can't be null");
        }
        if (attendance.id == null) {
            persist(attendance);
            return attendance;
        } else {
            return update(attendance);
        }
    }


}
