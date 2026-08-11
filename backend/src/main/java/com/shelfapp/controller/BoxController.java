package com.shelfapp.controller;

import com.shelfapp.dto.BoxDTO;
import com.shelfapp.service.BoxService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boxes")
public class BoxController {

    private final BoxService boxService;
    
    public BoxController(BoxService boxService) {
        this.boxService = boxService;
    }

    @GetMapping
    public ResponseEntity<List<BoxDTO>> getAllBoxes(
            @RequestParam(required = false) Long shelfId) {
        if (shelfId != null) {
            return ResponseEntity.ok(boxService.getBoxesByShelfId(shelfId));
        }
        return ResponseEntity.ok(boxService.getAllBoxes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoxDTO> getBoxById(@PathVariable Long id) {
        return ResponseEntity.ok(boxService.getBoxById(id));
    }

    @PostMapping
    public ResponseEntity<BoxDTO> createBox(@RequestBody BoxDTO boxDTO) {
        return new ResponseEntity<>(boxService.createBox(boxDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoxDTO> updateBox(@PathVariable Long id, @RequestBody BoxDTO boxDTO) {
        return ResponseEntity.ok(boxService.updateBox(id, boxDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBox(@PathVariable Long id) {
        boxService.deleteBox(id);
        return ResponseEntity.noContent().build();
    }
}
