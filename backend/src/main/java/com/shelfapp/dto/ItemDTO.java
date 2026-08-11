package com.shelfapp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class ItemDTO {
    private Long id;

    @NotBlank(message = "Item name is required")
    private String name;

    private String description;
    private String category;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @NotNull(message = "Box ID is required")
    private Long boxId;
    private String boxName;

    private Long shelfId;
    private String shelfName;

    private Long roomId;
    private String roomName;

    private String locationPath;
    private LocalDateTime createdAt;

    public ItemDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Long getBoxId() { return boxId; }
    public void setBoxId(Long boxId) { this.boxId = boxId; }

    public String getBoxName() { return boxName; }
    public void setBoxName(String boxName) { this.boxName = boxName; }

    public Long getShelfId() { return shelfId; }
    public void setShelfId(Long shelfId) { this.shelfId = shelfId; }

    public String getShelfName() { return shelfName; }
    public void setShelfName(String shelfName) { this.shelfName = shelfName; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }

    public String getRoomName() { return roomName; }
    public void setRoomName(String roomName) { this.roomName = roomName; }

    public String getLocationPath() { return locationPath; }
    public void setLocationPath(String locationPath) { this.locationPath = locationPath; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private ItemDTO dto = new ItemDTO();
        public Builder id(Long id) { dto.setId(id); return this; }
        public Builder name(String name) { dto.setName(name); return this; }
        public Builder description(String description) { dto.setDescription(description); return this; }
        public Builder category(String category) { dto.setCategory(category); return this; }
        public Builder quantity(Integer quantity) { dto.setQuantity(quantity); return this; }
        public Builder boxId(Long boxId) { dto.setBoxId(boxId); return this; }
        public Builder boxName(String boxName) { dto.setBoxName(boxName); return this; }
        public Builder shelfId(Long shelfId) { dto.setShelfId(shelfId); return this; }
        public Builder shelfName(String shelfName) { dto.setShelfName(shelfName); return this; }
        public Builder roomId(Long roomId) { dto.setRoomId(roomId); return this; }
        public Builder roomName(String roomName) { dto.setRoomName(roomName); return this; }
        public Builder locationPath(String locationPath) { dto.setLocationPath(locationPath); return this; }
        public Builder createdAt(LocalDateTime createdAt) { dto.setCreatedAt(createdAt); return this; }
        public ItemDTO build() { return dto; }
    }
}
