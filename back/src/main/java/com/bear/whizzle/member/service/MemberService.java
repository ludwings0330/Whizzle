package com.bear.whizzle.member.service;

import com.bear.whizzle.domain.model.entity.Member;

public interface MemberService {

    Member findByEmailAndProvider(String email, String provider);

}
