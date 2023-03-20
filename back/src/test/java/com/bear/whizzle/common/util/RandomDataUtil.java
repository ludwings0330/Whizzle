package com.bear.whizzle.common.util;

import com.bear.whizzle.domain.model.type.Flavor;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public final class RandomDataUtil {

    public static final int WHISKY_SIZE = 3535;
    public static final int MEMBER_SIZE = 100_000;
    public static final int DIARY_SIZE = 9_911_154;

    private final static String PARTIAL_KOREAN =
            "가강개객갱갹거건걸검겁게격겸경계고곡곤골곽관괘괴구국군궤귀규균귤극근글금김끽남납념녑녕노농뇌뇨누뉵능니닉닐다단댁덕도독둘득등라락란랭략량려력련로록론롱뢰료룡루류륙름릉리린림립맹멱면멸명몌묵문물미민백번벌범법벽변별부북분불붕비빈빙상새색생서석선설섬섭쇄쇠수숙순술숭신실심십쌍씨압앙애액앵야약양어엔여역연열염엽영완왈왕왜외요욕용우욱유육윤율융은을음읍자작잔잠잡장재쟁저적족존졸종좌죄주죽지직진질짐집징차처척천철첨첩청체초축춘출충췌취측칩칭쾌타탁탄탱터토톤통퇴투퉁패팽퍅편폄평픽필핍하학핵행향허헌형혜호혹혼황회획횡훤훼휘휴흠흡흥";
    private static final String ALPHABET_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String ALPHABET_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String ALPHABET = ALPHABET_UPPER + ALPHABET_LOWER;
    private static final String NUMERIC = "0123456789";
    private static final String ALPHABET_LOWER_NUMERIC = ALPHABET_LOWER + NUMERIC;
    private static final String ALPHABET_NUMERIC = ALPHABET + NUMERIC;
    private static final String ALL = PARTIAL_KOREAN + ALPHABET + NUMERIC;
    private static final String[] PROVIDERS = { "GOOGLE", "KAKAO", "NAVER" };

    private final static Random random = new Random();

    private RandomDataUtil() {
    }

    public static String getNumber(int size) {
        return chooseRandomly(NUMERIC, size);
    }

    public static String getUpperAlphabet(int size) {
        return chooseRandomly(ALPHABET_UPPER, size);
    }

    public static String getLowerAlphabet(int size) {
        return chooseRandomly(ALPHABET_LOWER, size);
    }

    public static String getAlphabet(int size) {
        return chooseRandomly(ALPHABET, size);
    }

    public static String getAlphabetAndNumber(int size) {
        return chooseRandomly(ALPHABET_NUMERIC, size);
    }

    public static String getLowerAlphabetAndNumber(int size) {
        return chooseRandomly(ALPHABET_LOWER_NUMERIC, size);
    }

    public static String getKoreanAndAlphabetAndNumber(int size) {
        return chooseRandomly(ALL, size);
    }

    public static String getCellPhone() {
        return "010" + getNumber(8);
    }

    public static String getEmail(String provider) {
        String front = getLowerAlphabetAndNumber(10);

        switch (provider) {
            case "GOOGLE":
                return front + "@gmail.com";
            case "KAKAO":
                return front + "@daum.com";
            case "NAVER":
                return front + "@naver.com";
            default:
                throw new RuntimeException("이 코드는 실행될 수 없습니다.");
        }
    }

    public static String getProvider() {
        return PROVIDERS[(int) (3 * Math.random())];
    }

    public static Set<Long> getWhiskeyIds(int size) {
        Set<Long> whiskyIds = new HashSet<>();

        while (whiskyIds.size() < size) {
            whiskyIds.add((long) (WHISKY_SIZE * Math.random()));
        }

        return whiskyIds;
    }

    public static boolean canInsert() {
        return (int) (2 * Math.random()) == 1;
    }

    public static String getContent() {
        int length = (int) (256 * Math.random());
        return getKoreanAndAlphabetAndNumber(length);
    }

    public static <T extends Enum<T>> T getEnum(Class<T> type) {
        T[] values = type.getEnumConstants();
        return values[(int) (values.length * Math.random())];
    }

    public static Flavor getFlavor() {
        return Flavor.builder()
                     .smoky((int) (101 * Math.random()))
                     .peaty((int) (101 * Math.random()))
                     .spicy((int) (101 * Math.random()))
                     .herbal((int) (101 * Math.random()))
                     .oily((int) (101 * Math.random()))
                     .body((int) (101 * Math.random()))
                     .rich((int) (101 * Math.random()))
                     .sweet((int) (101 * Math.random()))
                     .salty((int) (101 * Math.random()))
                     .vanilla((int) (101 * Math.random()))
                     .tart((int) (101 * Math.random()))
                     .fruity((int) (101 * Math.random()))
                     .floral((int) (101 * Math.random()))
                     .build();
    }

    public static String chooseRandomly(String target, int size) {
        StringBuilder chosen = new StringBuilder();

        while (size-- > 0) {
            int random_idx = random.nextInt(target.length());
            chosen.append(target.charAt(random_idx));
        }

        return chosen.toString();
    }

}
