package com.bear.whizzle.diary.service;

import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.repository.DiaryRepository;
import com.bear.whizzle.domain.model.entity.Diary;
import com.bear.whizzle.domain.model.entity.Drink;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.member.MemberRepository;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DiaryServiceImpl implements DiaryService {

    private final MemberRepository memberRepository;
    private final WhiskyRepository whiskyRepository;
    private final DiaryRepository diaryRepository;

    @Override
    @Transactional
    public void writeDiary(Long memberId, DiaryRequestSaveDto diaryRequestSaveDto) {
        Member member = memberRepository.getReferenceById(memberId);
        Diary diary = Diary.builder()
                           .member(member)
                           .date(diaryRequestSaveDto.getDate())
                           .emotion(diaryRequestSaveDto.getEmotion())
                           .drinkLevel(diaryRequestSaveDto.getDrinkLevel())
                           .content(diaryRequestSaveDto.getContent())
                           .build();

        List<Long> whiskyIds = diaryRequestSaveDto.getWhiskyIds();
        for (int size = whiskyIds.size(), i = 0; i < size; i++) {
            Whisky whisky = whiskyRepository.getReferenceById(whiskyIds.get(i));
            Drink drink = Drink.builder()
                               .diary(diary)
                               .whisky(whisky)
                               .whiskyOrder(i + 1)
                               .build();

            diary.addDrink(drink);
        }

        diaryRepository.save(diary);
    }

}
