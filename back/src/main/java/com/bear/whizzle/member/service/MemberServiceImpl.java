package com.bear.whizzle.member.service;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.cloud.aws.s3.service.AwsS3Service;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final AwsS3Service awsS3Service;

    @Override
    public Member findByEmailAndProvider(String email, String provider) {
        return memberRepository.findByEmailAndProvider(email, provider)
                               .orElseThrow(() -> new NotFoundException("존재하지 않는 유저"));
    }

    @Override
    public Member findMemberById(Long id) {
        return memberRepository.findById(id)
                               .orElseThrow(() -> new NotFoundException("존재하지 않는 유저"));
    }

    @Override
    @Transactional
    public void updateMemberBaseInfo(PrincipalDetails user, String nickname, MultipartFile profileFile) {
        final Member member = this.findByEmailAndProvider(user.getEmail(), user.getProvider());

        if (nickname != null) {
            member.updateNickname(nickname);
        }

        if (profileFile != null) {

            member.updateImage(null);
        }
    }

}
