package com.tsl.carbonintensity.repository;

import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface UserRepository<T extends AbstractPersistable> extends JpaRepository<T, PK> , JpaSpecificationExecutor<T> {
  }