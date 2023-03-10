## 깃 컨벤션

---

### 커밋 컨벤션

1. 모든 커밋은 다음의 포맷을 지켜야 한다. 이때, 본문과 footer는 생략할 수 있다.

    ```bash
    Type: Subject
    
    [Body]
    
    [Footer]
    ```
2. Type은 다음의 종류를 확인하여 작성한다.

    | Type | Objective |
    | --- | --- |
    | :sparkles: Feat: | ✨ 새로운 기능 추가 |
    | :bug: Fix: | 🐛 버그 수정, 로직 수정 |
    | :poop: Fix: | 💩 똥 싼 코드 |
    | :lipstick: Design: | 💄 CSS 등 사용자 UI 디자인 수정 |
    | :hammer: Refactor: | 🔨 코드 리팩토링 |
    | :art: Style: | 🎨 코드 포맷, 세미 콜론 누락 수정 |
    | :memo: Comment:  | 📝 주석의 추가 또는 수정 |
    | :umbrella: Test: | ☔ 테스트 코드 추가 |
    | :rocket: Chore:  | 🚀 빌드 설정 수정, 패키지 매니저 수정 등 코드가 아닌 설정 변경 |
    | :books: Docs: | 📚 문서 작성 또는 수정 |
    | :tractor: Rename: | 🚜 파일 또는 폴더명을 수정하거나, 파일 또는 폴더를 이동시킨 경우 |
    | :fire: Remove: | 🔥 파일을 삭제한 경우 |
    | :tada: Init: | 🎉 프로젝트 초기 설정 |
    | :card_file_box: Resource: | 🗃️ DB, Image 등의 추가 또는 삭제  |
    | :twisted_rightwards_arrows: Deploy: | 🔀 develop 브랜치를 master 브랜치에 Merge |
3. Subject는 무슨 작업을 수행했는지 기입합니다. 영어로 하지 않아도 괜찮습니다.
    - 영어로 작성 할 경우에는 명령문 형태로 작성하며, 첫 글자는 대문자로 작성합니다.

      ⇒  Add, Fix, Modify …

4. Body는 왜 그 작업을 수행했는지 등의 부연 설명을 기입합니다. 영어로 하지 않아도 괜찮습니다.
    - 어떻게 구현했는지는 굳이 부연하지 않습니다. 어떻게 구현했는지가 궁금할 때는 코드를 읽으면 되기 때문입니다.
5. Footer는 issue tracker ID를 명시하는 용도로 사용합니다. 저희 프로젝트에서는 사용하지 않겠습니다.

### PR 컨벤션

1. PR 제목은 다음과 같이 작성합니다.

    ```bash
    :emoji: Type: Subject
    
    ✨ Feat: 회원 가입 시 유효성 검사
    ```

2. PR 내용은 다음과 같이 작성합니다.

    ```bash
    ## Summary
    해당 PR의 목적을 간단히 적습니다.
    
    ---
    
    ## Describe
    1. 변경 사항을 상세히 적습니다.
    2. 변경 사항은 Commit과 대응될 가능성이 높습니다.
    
    ---
    
    ## What you know
    리뷰어가 PR을 이해하기 위해 사전에 알아야 하는 것을 적습니다.
    ```