package com.shelfapp.service;

import com.shelfapp.dto.DashboardDTO;
import com.shelfapp.repository.BoxRepository;
import com.shelfapp.repository.ItemRepository;
import com.shelfapp.repository.RoomRepository;
import com.shelfapp.repository.ShelfRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class DashboardService {

    private final RoomRepository roomRepository;
    private final ShelfRepository shelfRepository;
    private final BoxRepository boxRepository;
    private final ItemRepository itemRepository;
    
    public DashboardService(RoomRepository roomRepository, ShelfRepository shelfRepository, BoxRepository boxRepository, ItemRepository itemRepository) {
        this.roomRepository = roomRepository;
        this.shelfRepository = shelfRepository;
        this.boxRepository = boxRepository;
        this.itemRepository = itemRepository;
    }

    public DashboardDTO getStats() {
        return DashboardDTO.builder()
                .totalRooms(roomRepository.count())
                .totalShelves(shelfRepository.count())
                .totalBoxes(boxRepository.count())
                .totalItems(itemRepository.count())
                .build();
    }
}
