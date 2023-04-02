# 지리산 반달 가슴곰

---

## (로고) 팀소개

---

> 삼성 청년 SW 아카데미 8기 2학기 특화 프로젝트

팀원 소개 자료 추가

# Whizzle - 위스키를 즐기는 사람들

---

![whizzle_logo](./output/images/logo_color.png)

## 프로젝트 기간

---

> 2023.02.20(월) ~
* 2023.02.20(월) ~ 2023.02.24(금)
  * 아이디어 선정
* 2023.02.27(월) ~ 2023.03.03(금)
  * 아이디어 구체화 
  * 요구사항 정의서 작성
  * 와이어 프레임 제작
* 2023.03.06(월) ~ 2023.03.10(금)
  * 프로토 타입 제작
  * 기능명세서 작성
  * ERD 작성 -> 피드백 반영
  * 위스키 리뷰 크롤링
  * Data 전처리
  * Data에 맞는 Model 선정
* 2023.03.13(월) ~ 2023.03.17(금)
  * 위스키 이미지 크롤링
  * 프론트엔드 구현
  * 백엔드 구현
  * Data 전처리
  * Model 학습
  * Model 최적화
* 2023.03.20(월) ~ 2023.03.24(금)
  * 백엔드 구현
  * 프론트엔드 구현
* 2023.03.27(월) ~ 2023.03.29(금)
  * E2E 테스트 작성
  * 백엔드 구현
  * 프론트엔드 구현

## Whizzle - 배경

---

### 어떤 사람이 문제를 겪고 있는가?

2030 위스키 열풍에 따라 위스키 수입은 작년 대비 70% 증가했습니다. 그리고 이러한 위스키 열풍의 이유는 집에서 혼술을 하는 문화, 다양한 경험을 SNS를 통해 공유하는 문화에 기반을 두고 있습니다.

하지만 희소성 있는 제품을 소비하고 과시하는 목적, 더 비싸게 되팔아서 이익을 챙기려는 목적을 가지고 접근하는 모습도 종종 보이곤 합니다. 이러한 왜곡된 목적은 위스키의 소비자에게 불편함을 안겨주고 있습니다.

특히, 아직 자신의 취향이 형성되지 않은 소비자는 다수의 취향을 따라가기 때문에 왜곡된 목적에 쉽게 노출되고 있습니다.

### 어떻게 좋아지는가?

위스키 입문자가 유행에 휘둘리지 않고, 자신의 취향에 더 알맞을 것으로 기대되는 위스키를 즐길 수 있도록 도울 것 입니다. 현재 물량이 부족한 위스키를 소비하기 위해 웃돈을 얹어서 중고 거래를 할 필요가 없습니다. 그보다는 자신의 취향에 맞는 다른 위스키를 찾아서 즐기는 방법을 자연스럽게 알게 될 것입니다.

또한, 자신이 소비한 것을 다른 사람에게 과시하기 보다는 자신만의 페이스로 오랜 기간 위스키를 즐길 수 있을 것입니다.

## 시스템 아키텍처

---

시스템 아키텍처 이미지 추가

## 기술 스택

---

### 프론트엔드
* Axios (API 통신 라이브러리)
* React 18.2.0,
* Recoil 0.7.7 (상태 관리 라이브러리)

### 백엔드
* Java 11, Spring Boot 2.7.9,
* Spring Security 2.7.5 (인증 인가 관리 프레임워크)
* OAuth2 Client 2.7.9 (소셜 로그인 프레임워크)
* JWT (사용자 인증)
* Spring Data JPA 2.7.9 (Hibernate 구현체)
* QueryDSL 5.0.0 (JPA 쿼리를 코드로 작성하기 위한 프레임워크)
* Redis 2.7.9 (인메모리 데이터 구조 저장소)
* MySQL 8.0 (RDBMS)
* elasticsearch 7.17.9 (검색어 자동 완성)

### Data
* Python 3.9
* Numpy, Pandas
* LightFM (Hybrid Collaborative Filtering Model)
* fastAPI 0.94.1 (파이썬 기반 웹 프레임워크)

### 인프라
* AWS EC2
* AWS S3
* Jenkins
* Docker
* Nginx

### 협업 툴
* Jira
* Gitlab
* Mattermost
* Notion

## 프로젝트 파일 구조

---

### Front-End
```
+---node_modules
+---public
\---src
    +---apis
    +---assets
    |   +---fonts
    |   \---img
    +---components
    |   +---common
    |   |   +---etc
    |   |   \---Layout
    |   +---daily
    |   +---diary
    |   |   \---input
    |   +---error
    |   +---login
    |   +---main
    |   +---mypage
    |   +---recommend
    |   |   +---question
    |   |   \---result
    |   +---review
    |   +---search
    |   |   \---list
    |   \---whisky
    +---constants
    +---hooks
    +---pages
        |   +---AppDailyWhisky
        |   +---AppDiary
        |   +---AppError
        |   +---AppLogin
        |   +---AppMain
        |   +---AppMyPage
        |   +---AppRecommendQuestion
        |   +---AppRecommendResult
        |   +---AppReview
        |   +---AppSearch
        |   \---AppWhisky
    +---store
    \---utils
```

### Back-End
```
├── member
│   ├── controller
│   │   ├── MemberController
│   │	└── dto
│   │	    ├── MemberRequestDto
│   │	    ├──MemberRequestSaveDto
│   │	    └── MemberResponseDto										
│   ├──	service 
│   │	├── MemberService
│   │	├── MemberServiceImpl
│   │	└── query
│   │	    ├── MemberQueryService
│   │	    ├── MemberQueryServiceImpl
│   │	    └── dto
│   │		└── Member[용도]Dto
│   └──	repository
│        ├── MemberRepository
│        └── projection
│   	      ├── MemberProjectionRepository
│   	      └── dto
│                 └── Member[용도]Dto
├── domain
│	├── converter
│	├── exception
│	└── model
│	    ├── entity
│	    └── type
└── common
    ├── config
    ├── filter
    ├── interceptor
    ├── aop
    └──	util
```

## 프로젝트 산출물

---

* 회의록 [링크](./output/meeting-log/scrum)
* 컨벤션 [링크](./output/convention)
* 기획서 [링크](./output/1_기획서/Whizzle_기획서.pdf)
* 요구사항 정의서 [링크](./output/2_요구사항_정의서/Whizzle_요구사항_정의서.xlsx)
* 화면흐름도 [링크](./output/3_화면흐름도/Whizzle_화면흐름도.pdf)
* 와이어 프레임 [링크](./output/4_와이어프레임/Whizzle_wireframe.png)
* 프로토타입 [링크](./output/5_프로토타입/Whizzle_prototype.pdf)
* 기능명세서 & WBS [링크](./output/6_기능명세서_WBS/Whizzle_기능명세서&WBS.xlsx)
* ERD [링크](output/7_ERD/whizzle_erd.png)
* API 명세서 - 작성중
* 시퀀스 다이어그램 - 작성중
* 시스템 아키텍처 - 작성중
* E2E 테스트 케이스 - 작성중
* 발표 자료
  * [230317 Whizzle 중간발표.pdf ](./output/presentation/23.03.17_위즐_중간발표.pdf)
  * 최종 발표 자료
## 트러블 슈팅

---

* 트러블 슈팅 내용 추가