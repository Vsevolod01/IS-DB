package com.example.isdb.repository;

import com.example.isdb.data.Address;
import com.example.isdb.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByDistrict (String district);

    @Query(nativeQuery = true, value = "SELECT add_adr(:id, :adr, :reg);")
    void createAddress(@Param("id") Long id, @Param("adr") String adr, @Param("reg") String reg);
}

