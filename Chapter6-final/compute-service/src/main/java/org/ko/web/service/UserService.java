package org.ko.web.service;

import org.ko.api.core.exception.ApiException;
import org.ko.api.core.type.ApiCode;
import org.ko.api.core.view.View;
import org.ko.api.dto.UserDTO;
import org.ko.web.bean.domain.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * User服务
 */
@Service
public class UserService {

    /**
     * 模拟数据库
     */
    private static Map<Long, User> data = new ConcurrentHashMap<>();

    /**
     * 查询全部用户
     * @return
     */
    public View<List<UserDTO>> findAll() {
        View<List<UserDTO>> view = new View<>();
        Collection<User> users = data.values();
        if (!CollectionUtils.isEmpty(users)) {
            List<UserDTO> userDTOS =  users.stream().map(user -> {
                UserDTO userDTO = new UserDTO();
                BeanUtils.copyProperties(user, userDTO);
                return userDTO;
            }).collect(Collectors.toList());
            view.setModel(userDTOS);
        }
        return view;
    }

    /**
     * 通过ID查询用户
     * @param id
     * @return
     */
    public View<UserDTO> findById (Long id) throws ApiException {
        View<UserDTO> view = new View<>();
        User user = data.get(id);
        if (user != null) {
            UserDTO userDTO = new UserDTO();
            BeanUtils.copyProperties(user, userDTO);
            view.setModel(userDTO);
        } else {
            throw new ApiException(ApiCode.USER_NOT_EXIST);
        }
        return view;
    }

    /**
     * 插入用户
     * @param userDTO
     * @return
     */
    public View saveUser (UserDTO userDTO) {
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        Long id = userDTO.getId() != null ? userDTO.getId() : data.size() + 1;
        user.setId(id);
        data.put(id, user);
        return new View();
    }

    /**
     * 更新用户
     * @param userDTO
     * @return
     */
    public View updateUser (UserDTO userDTO) {
        Long id = userDTO.getId();
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        data.put(id, user);
        return new View();
    }

    public View removeUser (Long id) {
        data.remove(id);
        return new View();
    }

}
