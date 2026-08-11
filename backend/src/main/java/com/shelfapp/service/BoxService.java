package com.shelfapp.service;

import com.shelfapp.dto.BoxDTO;
import com.shelfapp.entity.Box;
import com.shelfapp.entity.Shelf;
import com.shelfapp.exception.ResourceNotFoundException;
import com.shelfapp.repository.BoxRepository;
import com.shelfapp.repository.ShelfRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BoxService {

    private final BoxRepository boxRepository;
    private final ShelfRepository shelfRepository;
    
    public BoxService(BoxRepository boxRepository, ShelfRepository shelfRepository) {
        this.boxRepository = boxRepository;
        this.shelfRepository = shelfRepository;
    }

    // ── Read ─────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<BoxDTO> getAllBoxes() {
        return boxRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<BoxDTO> getBoxesByShelfId(Long shelfId) {
        return boxRepository.findByShelfId(shelfId).stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public BoxDTO getBoxById(Long id) {
        Box box = boxRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Box not found with id: " + id));
        return toDTO(box);
    }

    // ── Write ────────────────────────────────────────────────

    public BoxDTO createBox(BoxDTO dto) {
        Shelf shelf = shelfRepository.findById(dto.getShelfId())
                .orElseThrow(() -> new ResourceNotFoundException("Shelf not found with id: " + dto.getShelfId()));
        Box box = new Box();
        box.setName(dto.getName());
        box.setDescription(dto.getDescription());
        box.setShelf(shelf);
        return toDTO(boxRepository.save(box));
    }

    public BoxDTO updateBox(Long id, BoxDTO dto) {
        Box box = boxRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Box not found with id: " + id));
        Shelf shelf = shelfRepository.findById(dto.getShelfId())
                .orElseThrow(() -> new ResourceNotFoundException("Shelf not found with id: " + dto.getShelfId()));
        box.setName(dto.getName());
        box.setDescription(dto.getDescription());
        box.setShelf(shelf);
        return toDTO(boxRepository.save(box));
    }

    public void deleteBox(Long id) {
        if (!boxRepository.existsById(id)) {
            throw new ResourceNotFoundException("Box not found with id: " + id);
        }
        boxRepository.deleteById(id);
    }

    // ── Mapper ───────────────────────────────────────────────

    private BoxDTO toDTO(Box box) {
        return BoxDTO.builder()
                .id(box.getId())
                .name(box.getName())
                .description(box.getDescription())
                .shelfId(box.getShelf().getId())
                .shelfName(box.getShelf().getName())
                .roomId(box.getShelf().getRoom().getId())
                .roomName(box.getShelf().getRoom().getName())
                .itemCount(box.getItems() != null ? box.getItems().size() : 0)
                .createdAt(box.getCreatedAt())
                .build();
    }
}
