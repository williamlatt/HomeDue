package com.uncle.mydues.api;

import com.uncle.mydues.business.MyDuesService;
import com.uncle.mydues.domain.Feed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/feed")
public class RESTFeedController {

    @Autowired
    private MyDuesService service;

    @GetMapping("/all")
    public List<Feed> getAllFeed(){
        return service.findAllFeed();
    }
}
