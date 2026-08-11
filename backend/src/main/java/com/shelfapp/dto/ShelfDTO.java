package com.shelfapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class ShelfDTO {
    private Long id;

    @NotBlank(message = "Shelf name is required")
    private String name;

    private String description;

    @NotNull(message = "Room ID is required")
    private Long roomId;
    private String roomName;

    private int boxCount;
    private LocalDateTime createdAt;

    public ShelfDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }

    public String getRoomName() { return roomName; }
    public void setRoomName(String roomName) { this.roomName = roomName; }

    public int getBoxCount() { return boxCount; }
    public void setBoxCount(int boxCount) { this.boxCount = boxCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private ShelfDTO dto = new ShelfDTO();
        public Builder id(Long id) { dto.setId(id); return this; }
        public Builder name(String name) { dto.setName(name); return this; }
        public Builder description(String description) { dto.setDescription(description); return this; }
        public Builder roomId(Long roomId) { dto.setRoomId(roomId); return this; }
        public Builder roomName(String roomName) { dto.setRoomName(roomName); return this; }
        public Builder boxCount(int boxCount) { dto.setBoxCount(boxCount); return this; }
        public Builder createdAt(LocalDateTime createdAt) { dto.setCreatedAt(createdAt); return this; }
        public ShelfDTO build() { return dto; }
    }
}
