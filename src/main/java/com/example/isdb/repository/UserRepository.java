package com.example.isdb.repository;

import com.example.isdb.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByLoginAndPassword(String name, String psw);
}
