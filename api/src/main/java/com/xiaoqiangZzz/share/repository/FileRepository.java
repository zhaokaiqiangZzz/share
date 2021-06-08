package com.xiaoqiangZzz.share.repository;

import com.xiaoqiangZzz.share.entity.File;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface FileRepository extends CrudRepository<File, Long>, JpaSpecificationExecutor<File> {

    File findTopBySha1AndMd5(String sh1, String md5);
}
