package com.bear.whizzle.member.service;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.cloud.aws.s3.service.AwsS3Service;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.type.Image;
import com.bear.whizzle.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
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
    public String updateMemberBaseInfo(PrincipalDetails user, String nickname, MultipartFile profileImageFile) {
        final Member member = this.findMemberById(user.getMemberId());

        if (nickname != null) {
            member.updateNickname(nickname);
            return nickname;
        }

        if (profileImageFile != null) {
            final Image image = awsS3Service.uploadMemberProfile(profileImageFile);
            member.updateImage(image);

            log.debug("회원 image 업데이트 : {}", image);
            return image.getUrl().toString();
        }

        throw new RuntimeException("이 코드는 실행될 수 없습니다.");
    }

    @Override
    public List<Long> findNewMemberIds() {
        return memberRepository.findIdsByCreatedDateTimeAfter();
    }

}
