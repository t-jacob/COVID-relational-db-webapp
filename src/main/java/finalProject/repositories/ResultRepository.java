package finalProject.repositories;

// inherits and stores the generic CRUD operations
// implements CRUD operations for the `Result` java class objects

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import finalProject.models.Result;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ResultRepository
        extends CrudRepository<Result, Integer> {

    // CUSTOM QUERIES

    // FIND ALL RESULTS
    @Query(value = "SELECT * FROM result",
    nativeQuery = true)
    public List<Result> findAllResults();

    // FIND RESULTS BY ID
    @Query(value = "SELECT * FROM result WHERE id=:resultId",
            nativeQuery = true)
    public Result findResultById(@Param("resultId") Integer id);

    // FIND RESULTS FOR TEST
    @Query(value = "SELECT * FROM Result result where result.testId=:tid",
            nativeQuery = true)
    public List<Result> findResultsForTest(@Param("tid") Integer tid);

    // FIND RESULTS FOR LAB
    @Query(value = "SELECT * FROM Result result where result.labId=:lid",
            nativeQuery = true)
    public List<Result> findResultsForLab(@Param("lid") Integer lid);
}
