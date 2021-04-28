package finalProject.daos;

// a DAO to map java CRUD operations on Result objects to the SQL schema `result` via HTTP requests

import finalProject.models.Result;
import finalProject.repositories.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class ResultDao {

    // instantiate CRUD repository
    @Autowired
    ResultRepository resultRepository;

    // FIND ALL RESULTS
    @GetMapping("/api/results")
    public List<Result> findAllResults() {
        return resultRepository.findAllResults();
    }

    // FIND RESULT BY ID
    @GetMapping("/api/results/{resultId}")
    public Result findResultById(
            @PathVariable("resultId") Integer id) {
        return resultRepository.findResultById(id);
    }

    // FIND RESULTS FOR TEST
    @GetMapping("api/tests/{tid}/results")
    public List<Result> findResultsForTest(@PathVariable("tid") Integer tid) {
        return resultRepository.findResultsForTest(tid);
    }

    // FIND RESULTS FOR LAB
    @GetMapping("api/labs/{lid}/results")
    public List<Result> findResultsForLab(@PathVariable("lid") Integer lid) {
        return resultRepository.findResultsForLab(lid);
    }

    // CREATE RESULT
    @PostMapping("/api/results")
    public Result createResult(@RequestBody Result result) {
        return resultRepository.save(result);
    }

    // UPDATE RESULT
    @PutMapping("/api/results/{resultId}")
    public Result updateResult(
            @PathVariable("resultId") Integer id,
            @RequestBody Result resultUpdates) {
        Result result = resultRepository.findResultById(id);

        // create a new Result object with the following attributes
        result.setDateReceived(resultUpdates.getDateReceived());
        result.setDateReported(resultUpdates.getDateReported());
        result.setResult(resultUpdates.getResult());
        result.setFinding(resultUpdates.getFinding());
        result.setTestId(resultUpdates.getTestId());
        result.setLabId(resultUpdates.getLabId());
        return resultRepository.save(result);
    }

    // DELETE RESULT
    @DeleteMapping("/api/results/{resultId}")
    public void deleteResult(
            @PathVariable("resultId") Integer id) {
        resultRepository.deleteById(id);
    }
}
