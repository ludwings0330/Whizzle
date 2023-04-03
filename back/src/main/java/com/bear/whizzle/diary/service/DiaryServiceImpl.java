package com.bear.whizzle.diary.service;

import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.controller.dto.DiaryRequestUpdateDto;
import com.bear.whizzle.diary.mapper.DiaryMapper;
import com.bear.whizzle.diary.repository.DiaryCustomRepository;
import com.bear.whizzle.diary.repository.DiaryRepository;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Diary;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.drink.service.DrinkService;
import com.bear.whizzle.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DiaryServiceImpl implements DiaryService {

    private final DrinkService drinkService;
    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;
    private final DiaryCustomRepository diaryCustomRepository;

    @Override
    public List<Diary> readDiaries(Long memberId, String month) {
        return diaryCustomRepository.findAllByMemberIdAndMonth(memberId, month);
    }

    @Override
    public long getDiaryCountByMemberId(Long memberId) {
        return diaryRepository.countByMemberId(memberId);
    }

    @Override
    @Transactional
    public Diary writeDiary(Long memberId, DiaryRequestSaveDto diaryRequestSaveDto) {
        Member member = memberRepository.getReferenceById(memberId);
        Diary diary = DiaryMapper.toDiary(member, diaryRequestSaveDto);

        return diaryRepository.findWithDrinksByMemberIdAndDate(memberId, diaryRequestSaveDto.getDate())
                              .map(found -> {
                                  found.update(diary);
                                  return drinkService.writeDrinks(found, diaryRequestSaveDto.getWhiskyIds());
                              })
                              .orElseGet(() -> {
                                  diaryRepository.save(diary);
                                  return drinkService.writeDrinks(diary, diaryRequestSaveDto.getWhiskyIds());
                              });
    }

    @Override
    @Transactional
    public Diary rewriteDiary(Long memberId, DiaryRequestUpdateDto diaryRequestUpdateDto) {
        Diary diary = authorizeWriter(memberId, diaryRequestUpdateDto.getId());
        diary.update(DiaryMapper.toDiary(diaryRequestUpdateDto));
        drinkService.eraseDrinks(diary, diaryRequestUpdateDto.getDeletedDrinkOrders());
        return drinkService.writeDrinks(diary, diaryRequestUpdateDto.getInsertedWhiskyIds());
    }

    @Override
    @Transactional
    public void eraseDiary(Long memberId, Long diaryId) {
        Diary diary = authorizeWriter(memberId, diaryId);
        diary.markDeleted(); // drink를 update 하기 위해 쿼리가 개수만큼 나간다. bulk update하도록 변경하는 것을 고려해야 한다.
    }

    private Diary authorizeWriter(Long memberId, Long diaryId) {
        Diary diary = diaryRepository.findWithDrinksById(diaryId)
                                     .orElseThrow(() -> new NotFoundException("다이어리를 찾을 수 없습니다."));

        if (!memberId.equals(diary.getMember().getId())) {
            throw new AccessDeniedException("다이어리는 본인만 수정할 수 있습니다.");
        }

        return diary;
    }

}
