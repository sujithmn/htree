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
 * A AttendancePolicyNotification.
 */
@Entity
@Table(name = "attendance_policy_notification")
@Cacheable
@RegisterForReflection
public class AttendancePolicyNotification extends PanacheEntityBase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "notification_description")
    public String notificationDescription;

    @Column(name = "notification_required")
    public Boolean notificationRequired;

    @Column(name = "notification_type")
    public String notificationType;

    @OneToOne(mappedBy = "attendancePolicyNotification")
    @JsonIgnore
    public Shift shift;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AttendancePolicyNotification)) {
            return false;
        }
        return id != null && id.equals(((AttendancePolicyNotification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AttendancePolicyNotification{" +
            "id=" + id +
            ", notificationDescription='" + notificationDescription + "'" +
            ", notificationRequired='" + notificationRequired + "'" +
            ", notificationType='" + notificationType + "'" +
            "}";
    }

    public AttendancePolicyNotification update() {
        return update(this);
    }

    public AttendancePolicyNotification persistOrUpdate() {
        return persistOrUpdate(this);
    }

    public static AttendancePolicyNotification update(AttendancePolicyNotification attendancePolicyNotification) {
        if (attendancePolicyNotification == null) {
            throw new IllegalArgumentException("attendancePolicyNotification can't be null");
        }
        var entity = AttendancePolicyNotification.<AttendancePolicyNotification>findById(attendancePolicyNotification.id);
        if (entity != null) {
            entity.notificationDescription = attendancePolicyNotification.notificationDescription;
            entity.notificationRequired = attendancePolicyNotification.notificationRequired;
            entity.notificationType = attendancePolicyNotification.notificationType;
            entity.shift = attendancePolicyNotification.shift;
        }
        return entity;
    }

    public static AttendancePolicyNotification persistOrUpdate(AttendancePolicyNotification attendancePolicyNotification) {
        if (attendancePolicyNotification == null) {
            throw new IllegalArgumentException("attendancePolicyNotification can't be null");
        }
        if (attendancePolicyNotification.id == null) {
            persist(attendancePolicyNotification);
            return attendancePolicyNotification;
        } else {
            return update(attendancePolicyNotification);
        }
    }


}
