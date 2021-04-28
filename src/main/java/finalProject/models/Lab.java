package finalProject.models;

// Java class for Lab objects that map to records in the `lab` table

import javax.persistence.*;

@Entity
@Table(name = "lab")
public class Lab {

    // TABLE FIELDS
    @Id                                                     // PK
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // auto-increment
    private Integer labId;
    private String experiment;
    private String researcher;


    // SETTERS AND GETTERS
    public Integer getLabId() {
        return labId;
    }

    public void setLabId(Integer id) {
        this.labId = id;
    }

    public String getExperiment() {
        return experiment;
    }

    public void setExperiment(String experiment) {
        this.experiment = experiment;
    }

    public String getResearcher() {
        return researcher;
    }

    public void setResearcher(String researcher) {
        this.researcher = researcher;
    }
}
