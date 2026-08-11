package com.shelfapp.service;

import com.shelfapp.dto.ShelfDTO;
import com.shelfapp.entity.Room;
import com.shelfapp.entity.Shelf;
import com.shelfapp.exception.ResourceNotFoundException;
import com.shelfapp.repository.RoomRepository;
import com.shelfapp.repository.ShelfRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ShelfService {

    private final ShelfRepository shelfRepository;
    private final RoomRepository roomRepository;
    
    public ShelfService(ShelfRepository shelfRepository, RoomRepository roomRepository) {
        this.shelfRepository = shelfRepository;
        this.roomRepository = roomRepository;
    }

    // ── Read ─────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<ShelfDTO> getAllShelves() {
        return shelfRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ShelfDTO> getShelvesByRoomId(Long roomId) {
        return shelfRepository.findByRoomId(roomId).stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public ShelfDTO getShelfById(Long id) {
        Shelf shelf = shelfRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shelf not found with id: " + id));
        return toDTO(shelf);
    }

    // ── Write ────────────────────────────────────────────────

    public ShelfDTO createShelf(ShelfDTO dto) {
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + dto.getRoomId()));
        Shelf shelf = new Shelf();
        shelf.setName(dto.getName());
        shelf.setDescription(dto.getDescription());
        shelf.setRoom(room);
        return toDTO(shelfRepository.save(shelf));
    }

    public ShelfDTO updateShelf(Long id, ShelfDTO dto) {
        Shelf shelf = shelfRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Shelf not found with id: " + id));
        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + dto.getRoomId()));
        shelf.setName(dto.getName());
        shelf.setDescription(dto.getDescription());
        shelf.setRoom(room);
        return toDTO(shelfRepository.save(shelf));
    }

    public void deleteShelf(Long id) {
        if (!shelfRepository.existsById(id)) {
            throw new ResourceNotFoundException("Shelf not found with id: " + id);
        }
        shelfRepository.deleteById(id);
    }

    // ── Mapper ───────────────────────────────────────────────

    private ShelfDTO toDTO(Shelf shelf) {
        return ShelfDTO.builder()
                .id(shelf.getId())
                .name(shelf.getName())
                .description(shelf.getDescription())
                .roomId(shelf.getRoom().getId())
                .roomName(shelf.getRoom().getName())
                .boxCount(shelf.getBoxes() != null ? shelf.getBoxes().size() : 0)
                .createdAt(shelf.getCreatedAt())
                .build();
    }
}
