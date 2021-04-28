package finalProject.models;

// Java class for User objects that map to records in the `user` table

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user")
public class User {

    // TABLE FIELDS
    @Id                                                     // PK
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // auto-increment
    private Integer userId;
    private String firstName;
    private String lastName;
    private String userName;
    private String password;
    private String email;

    @Temporal(TemporalType.DATE)                            // converts SQL Date to Java Date (excludes timestamp/timezone)
    private Date dateOfBirth;

    private String userRole;


    // SETTERS AND GETTERS
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
