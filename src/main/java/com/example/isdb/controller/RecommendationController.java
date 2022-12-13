package com.example.isdb.controller;

import com.example.isdb.data.Recommendation;
import com.example.isdb.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recommendation")
public class RecommendationController {

    private final RecommendationRepository recommendationRepository;

    @Autowired
    public RecommendationController(RecommendationRepository recommendationRepository) {
        this.recommendationRepository = recommendationRepository;
    }

    @GetMapping("/all")
    public List<Recommendation> getAll() {
        return recommendationRepository.findAll();
    }

    @PostMapping("/create")
    public List<Recommendation> create(@RequestBody Recommendation recommendation) {
        recommendationRepository.save(recommendation);
        return recommendationRepository.findAll();
    }

    @GetMapping("/delete/{id}")
    public List<Recommendation> delete(@PathVariable long id) {
        recommendationRepository.deleteById(id);
        return recommendationRepository.findAll();
    }
}
