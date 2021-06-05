package com.xiaoqiangZzz.share.service;

import com.xiaoqiangZzz.share.entity.Authority;
import com.xiaoqiangZzz.share.entity.Menu;

public interface AuthorityService {
  Authority initAuthority(String name, String value, Menu menu);
}
