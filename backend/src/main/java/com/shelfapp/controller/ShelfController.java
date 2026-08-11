package com.shelfapp.controller;

import com.shelfapp.dto.ShelfDTO;
import com.shelfapp.service.ShelfService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shelves")
public class ShelfController {

    private final ShelfService shelfService;
    
    public ShelfController(ShelfService shelfService) {
        this.shelfService = shelfService;
    }

    @GetMapping
    public ResponseEntity<List<ShelfDTO>> getAllShelves(
            @RequestParam(required = false) Long roomId) {
        if (roomId != null) {
            return ResponseEntity.ok(shelfService.getShelvesByRoomId(roomId));
        }
        return ResponseEntity.ok(shelfService.getAllShelves());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShelfDTO> getShelfById(@PathVariable Long id) {
        return ResponseEntity.ok(shelfService.getShelfById(id));
    }

    @PostMapping
    public ResponseEntity<ShelfDTO> createShelf(@RequestBody ShelfDTO shelfDTO) {
        return new ResponseEntity<>(shelfService.createShelf(shelfDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShelfDTO> updateShelf(@PathVariable Long id, @RequestBody ShelfDTO shelfDTO) {
        return ResponseEntity.ok(shelfService.updateShelf(id, shelfDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShelf(@PathVariable Long id) {
        shelfService.deleteShelf(id);
        return ResponseEntity.noContent().build();
    }
}
