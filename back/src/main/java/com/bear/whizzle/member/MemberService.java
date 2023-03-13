package com.bear.whizzle.member;

public interface MemberService {

    Long findIdByEmailAndProvider(String email, String provider);

}
