package com.videogamejournal.api;

import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemRepository repo;

    public ItemController(ItemRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Item> all() {
        return repo.findAll();
    }

    @PostMapping
    public Item create(@RequestBody Item item) {
        return repo.save(item);
    }
}