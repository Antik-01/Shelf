package com.shelfapp.service;

import com.shelfapp.dto.ItemDTO;
import com.shelfapp.entity.Box;
import com.shelfapp.entity.Item;
import com.shelfapp.exception.ResourceNotFoundException;
import com.shelfapp.repository.BoxRepository;
import com.shelfapp.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ItemService {

    private final ItemRepository itemRepository;
    private final BoxRepository boxRepository;
    
    public ItemService(ItemRepository itemRepository, BoxRepository boxRepository) {
        this.itemRepository = itemRepository;
        this.boxRepository = boxRepository;
    }

    // ── Read ─────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<ItemDTO> getAllItems() {
        return itemRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ItemDTO> getItemsByBoxId(Long boxId) {
        return itemRepository.findByBoxId(boxId).stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public ItemDTO getItemById(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
        return toDTO(item);
    }

    @Transactional(readOnly = true)
    public List<ItemDTO> searchItems(String query) {
        return itemRepository.searchItems(query).stream()
                .map(this::toDTO)
                .toList();
    }

    // ── Write ────────────────────────────────────────────────

    public ItemDTO createItem(ItemDTO dto) {
        Box box = boxRepository.findById(dto.getBoxId())
                .orElseThrow(() -> new ResourceNotFoundException("Box not found with id: " + dto.getBoxId()));
        Item item = new Item();
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setCategory(dto.getCategory());
        item.setQuantity(dto.getQuantity() != null ? dto.getQuantity() : 1);
        item.setBox(box);
        return toDTO(itemRepository.save(item));
    }

    public ItemDTO updateItem(Long id, ItemDTO dto) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
        Box box = boxRepository.findById(dto.getBoxId())
                .orElseThrow(() -> new ResourceNotFoundException("Box not found with id: " + dto.getBoxId()));
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setCategory(dto.getCategory());
        item.setQuantity(dto.getQuantity() != null ? dto.getQuantity() : 1);
        item.setBox(box);
        return toDTO(itemRepository.save(item));
    }

    public void deleteItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Item not found with id: " + id);
        }
        itemRepository.deleteById(id);
    }

    // ── Mapper ───────────────────────────────────────────────

    private ItemDTO toDTO(Item item) {
        String roomName  = item.getBox().getShelf().getRoom().getName();
        String shelfName = item.getBox().getShelf().getName();
        String boxName   = item.getBox().getName();

        return ItemDTO.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .category(item.getCategory())
                .quantity(item.getQuantity())
                .boxId(item.getBox().getId())
                .boxName(boxName)
                .shelfId(item.getBox().getShelf().getId())
                .shelfName(shelfName)
                .roomId(item.getBox().getShelf().getRoom().getId())
                .roomName(roomName)
                .locationPath(roomName + " → " + shelfName + " → " + boxName)
                .createdAt(item.getCreatedAt())
                .build();
    }
}
