package finalProject.repositories;

// inherits and stores the generic CRUD operations
// implements CRUD operations for the `Test` java class objects

import finalProject.models.Test;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TestRepository
        extends CrudRepository<Test, Integer> {

    // CUSTOM QUERIES

    // FIND ALL TESTS
    @Query(value = "SELECT * FROM test",
            nativeQuery = true)
    public List<Test> findAllTests();

    // FIND TESTS BY ID
    @Query(value = "SELECT * FROM test " +
            "WHERE id=:testId",
            nativeQuery = true)
    public Test findTestById(@Param("testId") Integer id);

    // FIND TESTS FOR USER
    @Query(value = "SELECT * FROM Test test where test.userId=:uid",
            nativeQuery = true)
    public List<Test> findTestsForUser(@Param("uid") Integer uid);

}
