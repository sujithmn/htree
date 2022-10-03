package com.ssplus.hr.domain;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import javax.json.bind.annotation.JsonbTransient;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.runtime.annotations.RegisterForReflection;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A EmployeePayrollSetting.
 */
@Entity
@Table(name = "employee_payroll_setting")
@Cacheable
@RegisterForReflection
public class EmployeePayrollSetting extends PanacheEntityBase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "modificationcounter")
    public Integer modificationcounter;

    @Column(name = "basicpay")
    public Integer basicpay;

    @Column(name = "da")
    public Integer da;

    @Column(name = "hra")
    public Integer hra;

    @Column(name = "medicalallowance")
    public Integer medicalallowance;

    @Column(name = "conveyanceallowance")
    public Integer conveyanceallowance;

    @Column(name = "transportallowance")
    public Integer transportallowance;

    @Column(name = "specialallowance")
    public Integer specialallowance;

    @Column(name = "mealallowance")
    public Integer mealallowance;

    @Column(name = "bonus")
    public Integer bonus;

    @Column(name = "pf")
    public Integer pf;

    @Column(name = "esi")
    public Integer esi;

    @Column(name = "pt")
    public Integer pt;

    @Column(name = "lwf")
    public Integer lwf;

    @Column(name = "lta")
    public Integer lta;

    @Column(name = "employerpf")
    public Integer employerpf;

    @Column(name = "employeresi")
    public Integer employeresi;

    @OneToOne(mappedBy = "employeePayrollSetting")
    @JsonIgnore
    public Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeePayrollSetting)) {
            return false;
        }
        return id != null && id.equals(((EmployeePayrollSetting) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EmployeePayrollSetting{" +
            "id=" + id +
            ", modificationcounter=" + modificationcounter +
            ", basicpay=" + basicpay +
            ", da=" + da +
            ", hra=" + hra +
            ", medicalallowance=" + medicalallowance +
            ", conveyanceallowance=" + conveyanceallowance +
            ", transportallowance=" + transportallowance +
            ", specialallowance=" + specialallowance +
            ", mealallowance=" + mealallowance +
            ", bonus=" + bonus +
            ", pf=" + pf +
            ", esi=" + esi +
            ", pt=" + pt +
            ", lwf=" + lwf +
            ", lta=" + lta +
            ", employerpf=" + employerpf +
            ", employeresi=" + employeresi +
            "}";
    }

    public EmployeePayrollSetting update() {
        return update(this);
    }

    public EmployeePayrollSetting persistOrUpdate() {
        return persistOrUpdate(this);
    }

    public static EmployeePayrollSetting update(EmployeePayrollSetting employeePayrollSetting) {
        if (employeePayrollSetting == null) {
            throw new IllegalArgumentException("employeePayrollSetting can't be null");
        }
        var entity = EmployeePayrollSetting.<EmployeePayrollSetting>findById(employeePayrollSetting.id);
        if (entity != null) {
            entity.modificationcounter = employeePayrollSetting.modificationcounter;
            entity.basicpay = employeePayrollSetting.basicpay;
            entity.da = employeePayrollSetting.da;
            entity.hra = employeePayrollSetting.hra;
            entity.medicalallowance = employeePayrollSetting.medicalallowance;
            entity.conveyanceallowance = employeePayrollSetting.conveyanceallowance;
            entity.transportallowance = employeePayrollSetting.transportallowance;
            entity.specialallowance = employeePayrollSetting.specialallowance;
            entity.mealallowance = employeePayrollSetting.mealallowance;
            entity.bonus = employeePayrollSetting.bonus;
            entity.pf = employeePayrollSetting.pf;
            entity.esi = employeePayrollSetting.esi;
            entity.pt = employeePayrollSetting.pt;
            entity.lwf = employeePayrollSetting.lwf;
            entity.lta = employeePayrollSetting.lta;
            entity.employerpf = employeePayrollSetting.employerpf;
            entity.employeresi = employeePayrollSetting.employeresi;
            entity.employee = employeePayrollSetting.employee;
        }
        return entity;
    }

    public static EmployeePayrollSetting persistOrUpdate(EmployeePayrollSetting employeePayrollSetting) {
        if (employeePayrollSetting == null) {
            throw new IllegalArgumentException("employeePayrollSetting can't be null");
        }
        if (employeePayrollSetting.id == null) {
            persist(employeePayrollSetting);
            return employeePayrollSetting;
        } else {
            return update(employeePayrollSetting);
        }
    }


}
