package finalProject.models;

// Java class for Test objects that map to records in the `test` table

import javax.persistence.*;

@Entity
@Table(name = "test")
public class Test {

    // TABLE FIELDS
    @Id                                                     // PK
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // auto-increment
    private Integer testId;
    private String location;
    private String provider;
    private Integer userId;


    // SETTERS AND GETTERS
    public Integer getTestId() {
        return testId;
    }

    public void setTestId(Integer id) {
        this.testId = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
