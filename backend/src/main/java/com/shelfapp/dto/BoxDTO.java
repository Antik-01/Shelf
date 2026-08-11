package com.shelfapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class BoxDTO {
    private Long id;

    @NotBlank(message = "Box name is required")
    private String name;

    private String description;

    @NotNull(message = "Shelf ID is required")
    private Long shelfId;
    private String shelfName;

    private Long roomId;
    private String roomName;

    private int itemCount;
    private LocalDateTime createdAt;

    public BoxDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getShelfId() { return shelfId; }
    public void setShelfId(Long shelfId) { this.shelfId = shelfId; }

    public String getShelfName() { return shelfName; }
    public void setShelfName(String shelfName) { this.shelfName = shelfName; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }

    public String getRoomName() { return roomName; }
    public void setRoomName(String roomName) { this.roomName = roomName; }

    public int getItemCount() { return itemCount; }
    public void setItemCount(int itemCount) { this.itemCount = itemCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private BoxDTO dto = new BoxDTO();
        public Builder id(Long id) { dto.setId(id); return this; }
        public Builder name(String name) { dto.setName(name); return this; }
        public Builder description(String description) { dto.setDescription(description); return this; }
        public Builder shelfId(Long shelfId) { dto.setShelfId(shelfId); return this; }
        public Builder shelfName(String shelfName) { dto.setShelfName(shelfName); return this; }
        public Builder roomId(Long roomId) { dto.setRoomId(roomId); return this; }
        public Builder roomName(String roomName) { dto.setRoomName(roomName); return this; }
        public Builder itemCount(int itemCount) { dto.setItemCount(itemCount); return this; }
        public Builder createdAt(LocalDateTime createdAt) { dto.setCreatedAt(createdAt); return this; }
        public BoxDTO build() { return dto; }
    }
}
