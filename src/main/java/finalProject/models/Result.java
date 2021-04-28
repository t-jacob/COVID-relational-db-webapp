package finalProject.models;

// Java class for Result objects that map to records in the `result` table

import java.util.Date;
import javax.persistence.*;


@Entity
@Table(name = "result")
public class Result {

    // TABLE FIELDS
    @Id                                                     // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // auto-increment
    private Integer id;

    @Temporal(TemporalType.DATE)                            // converts SQL Date to Java Date (excludes timestamp/timezone)
    private Date dateReceived;

    @Temporal(TemporalType.DATE)                            // converts SQL Date to Java Date (excludes timestamp/timezone)
    private Date dateReported;

    private String result;
    private String finding;
    private Integer testId;
    private Integer labId;

    // SETTERS AND GETTERS
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDateReceived() {
        return dateReceived;
    }

    public void setDateReceived(Date dateReceived) {
        this.dateReceived = dateReceived;
    }

    public Date getDateReported() {
        return dateReported;
    }

    public void setDateReported(Date dateReported) {
        this.dateReported = dateReported;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getFinding() {
        return finding;
    }

    public void setFinding(String finding) {
        this.finding = finding;
    }

    public Integer getTestId() {
        return testId;
    }

    public void setTestId(Integer testId) {
        this.testId = testId;
    }

    public Integer getLabId() {
        return labId;
    }

    public void setLabId(Integer labId) {
        this.labId = labId;
    }
}
