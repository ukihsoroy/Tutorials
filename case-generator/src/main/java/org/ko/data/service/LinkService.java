package org.ko.data.service;

import org.ko.data.bean.Link;
import org.ko.data.bean.LinkExample;
import org.ko.data.dao.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LinkService {

    @Autowired private LinkRepository linkRepository;

    public List<Link> list () {
        LinkExample example = new LinkExample();
        return linkRepository.selectByExample(example);
    }

    public Link detail(Integer id) {
        return linkRepository.selectByPrimaryKey(id);
    }

    public void save(Link link) {
        linkRepository.insert(link);
    }


    public void update(Link link) {
        linkRepository.updateByPrimaryKey(link);
    }

    public void remove(Integer id) {
        linkRepository.deleteByPrimaryKey(id);
    }
}