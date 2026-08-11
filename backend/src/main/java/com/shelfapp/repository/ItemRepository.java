package com.shelfapp.repository;

import com.shelfapp.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByBoxId(Long boxId);

    @Query("SELECT i FROM Item i " +
           "JOIN FETCH i.box b " +
           "JOIN FETCH b.shelf s " +
           "JOIN FETCH s.room r " +
           "WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(i.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Item> searchItems(@Param("query") String query);
}
