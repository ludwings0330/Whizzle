package com.bear.whizzle.member.service;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.domain.model.entity.Member;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    Member findByEmailAndProvider(String email, String provider);

    Member findMemberById(Long id);

    String updateMemberBaseInfo(PrincipalDetails user, String nickname, MultipartFile profileFile);

    List<Long> findNewMemberIds();

}
