package com.bear.whizzle.common.util;

import com.bear.whizzle.domain.model.type.Flavor;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public final class RandomDataUtil {

    public static final int WHISKY_SIZE = 3535;
    public static final int MEMBER_SIZE = 100_000;
    public static final int DIARY_SIZE = 4_956_335;
    public static final int REVIEW_SIZE = 448_560;

    private static final String ALPHABET_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String ALPHABET_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String ALPHABET = ALPHABET_UPPER + ALPHABET_LOWER;
    private static final String NUMERIC = "0123456789";
    private static final String ALPHABET_LOWER_NUMERIC = ALPHABET_LOWER + NUMERIC;
    private static final String ALPHABET_NUMERIC = ALPHABET + NUMERIC;

    private static final String[] CONTENTS = {
            "아무말이나 만들어보고 있습니다.",
            "아무말이나 만들어보고 있습니다. 이번엔 길이를 좀 더 늘려보려 합니다.",
            "이 위스키는 정말 맛있네요. 라고 말하는 리뷰 내용을 작성했는데 길이가 짧아서 더 늘려보려고 합니다.",
            "이 위스키는 내가 먹어본 위스키 중에 최악입니다.",
            "이 위스키는 정말 맛있어요.",
            "이 위스키는 정말 제 취향입니다.",
            "이 서비스를 만든 여러분은 이 나라의 챔피언입니다. 핫!"
    };
    private static final String[] PROVIDERS = { "GOOGLE", "KAKAO", "NAVER" };
    private static final Float[] RATINGS = { 0.0f, 0.5f, 1.0f, 1.5f, 2.0f, 2.5f, 3.0f, 3.5f, 4.0f, 4.5f, 5.0f };

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
            whiskyIds.add((long) (WHISKY_SIZE * Math.random()) + 1);
        }

        return whiskyIds;
    }

    public static boolean canInsert() {
        return (int) (2 * Math.random()) == 1;
    }

    public static String getContent() {
        return CONTENTS[(int) (CONTENTS.length * Math.random())];
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

    public static Float getRating() {
        return RATINGS[(int) (RATINGS.length * Math.random())];
    }

    public static Set<Long> getReviewIds(int size) {
        Set<Long> reviewIds = new HashSet<>();

        while (reviewIds.size() < size) {
            reviewIds.add((long) (REVIEW_SIZE * Math.random()) + 1);
        }

        return reviewIds;
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
