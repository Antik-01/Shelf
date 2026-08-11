package com.shelfapp.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class RoomDTO {
    private Long id;

    @NotBlank(message = "Room name is required")
    private String name;

    private String description;
    private int shelfCount;
    private LocalDateTime createdAt;

    public RoomDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getShelfCount() { return shelfCount; }
    public void setShelfCount(int shelfCount) { this.shelfCount = shelfCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private RoomDTO dto = new RoomDTO();
        public Builder id(Long id) { dto.setId(id); return this; }
        public Builder name(String name) { dto.setName(name); return this; }
        public Builder description(String description) { dto.setDescription(description); return this; }
        public Builder shelfCount(int shelfCount) { dto.setShelfCount(shelfCount); return this; }
        public Builder createdAt(LocalDateTime createdAt) { dto.setCreatedAt(createdAt); return this; }
        public RoomDTO build() { return dto; }
    }
}
