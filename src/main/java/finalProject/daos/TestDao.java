package finalProject.daos;

// a DAO to map java CRUD operations on Test objects to the SQL schema `test` via HTTP requests

import finalProject.models.Test;
import finalProject.repositories.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class TestDao {

    // instantiate CRUD repository
    @Autowired
    TestRepository testRepository;

    // FIND ALL TESTS
    @GetMapping("/api/tests")
    public List<Test> findAllTests() {
        return testRepository.findAllTests();
    }

    // FIND TEST BY ID
    @GetMapping("/api/tests/{testId}")
    public Test findTestById(
            @PathVariable("testId") Integer id) {
        return testRepository.findTestById(id);
    }

    // FIND TEST FOR USER
    @GetMapping("/api/users/{uid}/tests")
    public List<Test> findTestForUser(@PathVariable("uid") Integer uid) {
        return testRepository.findTestsForUser(uid);
    }

    // CREATE TEST
    @PostMapping("/api/tests")
    public Test createTest(@RequestBody Test test) {
        return testRepository.save(test);
    }

    // UPDATE TEST
    @PutMapping("/api/tests/{testId}")
    public Test updateTest(
            @PathVariable("testId") Integer id,
            @RequestBody Test testUpdates) {
        Test test = testRepository.findTestById(id);

        // create a new Test object with the following attributes
        test.setLocation(testUpdates.getLocation());
        test.setProvider(testUpdates.getProvider());
        test.setUserId(testUpdates.getUserId());
        return testRepository.save(test);
    }

    // DELETE TEST
    @DeleteMapping("/api/tests/{testId}")
    public void deleteTest(
            @PathVariable("testId") Integer id) {
        testRepository.deleteById(id);
    }
}
