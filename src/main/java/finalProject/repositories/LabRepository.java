package finalProject.repositories;

// inherits and stores the generic CRUD operations
// implements CRUD operations for the `Lab` java class objects

import finalProject.models.User;
import org.springframework.data.repository.CrudRepository;
import finalProject.models.Lab;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;


public interface LabRepository extends CrudRepository<Lab, Integer> {

    // CUSTOM QUERIES

    // FIND ALL LABS
    @Query(value = "SELECT * FROM lab",
    nativeQuery = true)
    public List<Lab> findAllLabs();

    // FIND LAB BY ID
    @Query(value = "SELECT * FROM lab WHERE id=:labId",
            nativeQuery = true)
    public Lab findLabById(@Param("labId") Integer id);

}
