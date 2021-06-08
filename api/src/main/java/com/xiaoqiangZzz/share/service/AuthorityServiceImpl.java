package com.xiaoqiangZzz.share.service;

import com.mengyunzhi.core.exception.ObjectNotFoundException;
import com.xiaoqiangZzz.share.entity.Authority;
import com.xiaoqiangZzz.share.entity.Menu;
import com.xiaoqiangZzz.share.repository.AuthorityRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthorityServiceImpl implements AuthorityService {
  private final AuthorityRepository authorityRepository;

  public AuthorityServiceImpl(AuthorityRepository authorityRepository) {
    this.authorityRepository = authorityRepository;
  }

  @Override
  public Authority initAuthority(String name, String value, Menu menu) {
    Authority authority = new Authority();
    authority.setMenu(menu);
    authority.setValue(value);
    authority.setName(name);
    return this.authorityRepository.save(authority);
  }

  @Override
  public Authority getById(Long id) {
    return this.authorityRepository.findById(id).orElseThrow(() ->
        new ObjectNotFoundException("role未找到：" + id.toString()));
  }
}
