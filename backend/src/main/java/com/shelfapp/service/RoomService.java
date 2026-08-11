package com.shelfapp.service;

import com.shelfapp.dto.RoomDTO;
import com.shelfapp.entity.Room;
import com.shelfapp.exception.ResourceNotFoundException;
import com.shelfapp.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RoomService {

    private final RoomRepository roomRepository;
    
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // ── Read ─────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public RoomDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
        return toDTO(room);
    }

    // ── Write ────────────────────────────────────────────────

    public RoomDTO createRoom(RoomDTO dto) {
        Room room = new Room();
        room.setName(dto.getName());
        room.setDescription(dto.getDescription());
        return toDTO(roomRepository.save(room));
    }

    public RoomDTO updateRoom(Long id, RoomDTO dto) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
        room.setName(dto.getName());
        room.setDescription(dto.getDescription());
        return toDTO(roomRepository.save(room));
    }

    public void deleteRoom(Long id) {
        if (!roomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Room not found with id: " + id);
        }
        roomRepository.deleteById(id);
    }

    // ── Mapper ───────────────────────────────────────────────

    private RoomDTO toDTO(Room room) {
        return RoomDTO.builder()
                .id(room.getId())
                .name(room.getName())
                .description(room.getDescription())
                .shelfCount(room.getShelves() != null ? room.getShelves().size() : 0)
                .createdAt(room.getCreatedAt())
                .build();
    }
}
