package finalProject.daos;

// a DAO to map java CRUD operations on Lab objects to the SQL schema `lab` via HTTP requests

import finalProject.repositories.LabRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import finalProject.models.Lab;

@RestController
@CrossOrigin(origins = "*")
public class LabDao {

    // instantiate CRUD Repository
    @Autowired
    LabRepository labRepository;

    // FIND ALL LABS
    @GetMapping("/api/labs")
    public List<Lab> findAllLabs() {
        return labRepository.findAllLabs();
    }

    // FIND LAB BY ID
    @GetMapping("/api/labs/{labId}")
    public Lab findLabById(
            @PathVariable("labId") Integer id) {
        return labRepository.findLabById(id);
    }

    // CREATE LAB
    @PostMapping("/api/labs")
    public Lab createLab(@RequestBody Lab lab) {
        return labRepository.save(lab);
    }

    // UPDATE LAB
    @PutMapping("api/labs/{labId}")
    public Lab updateLab (
            @PathVariable("labId") Integer labId,
            @RequestBody Lab labUpdates) {
        Lab lab = labRepository.findLabById(labId);

        // create new Lab object with the following attributes
        lab.setLabId(labUpdates.getLabId());
        lab.setExperiment((labUpdates.getExperiment()));
        lab.setResearcher(labUpdates.getResearcher());

        return labRepository.save(lab);
    }

    // DELETE LAB
    @DeleteMapping("/api/labs/{labId}")
    public void deleteLab(
            @PathVariable("labId") Integer id) {
        labRepository.deleteById(id);
    }
}
