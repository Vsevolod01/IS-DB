package com.example.isdb.controller;

import com.example.isdb.data.PK.PointsPK;
import com.example.isdb.data.Points;
import com.example.isdb.repository.PointsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/points")
public class PointsController {

    private final PointsRepository pointsRepository;

    @Autowired
    public PointsController(PointsRepository pointsRepository) {
        this.pointsRepository = pointsRepository;
    }

    @GetMapping("/all")
    public List<Points> getAll() {
        return pointsRepository.findAll();
    }

    @PostMapping("/create")
    public List<Points> create(@RequestBody Points points) {
        pointsRepository.save(points);
        return pointsRepository.findAll();
    }

    @GetMapping("/delete/sy={symptomId}&se={severityId}")
    public List<Points> delete(@PathVariable long symptomId, @PathVariable long severityId) {
        PointsPK id = new PointsPK(symptomId, severityId);
        pointsRepository.deleteById(id);
        return pointsRepository.findAll();
    }

    @PostMapping("/")
    public List<Points> selectByIds(@RequestBody List<PointsPK> symToSev) {
        return pointsRepository.findAllById(symToSev);
    }
}
