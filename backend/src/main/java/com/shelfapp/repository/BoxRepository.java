package com.shelfapp.repository;

import com.shelfapp.entity.Box;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoxRepository extends JpaRepository<Box, Long> {

    List<Box> findByShelfId(Long shelfId);
}
