# Front-End **Coding Convention**

# 1. 파일

### 1-1. 컴포넌트로 분리된 파일은 PascalCase를 적용

```jsx
Header.jsx
Main.jsx
PopUpNews.jsx
```

### 1-2. 컴포넌트 명의 경우 기능명 + CRUD형태로 작성

```
WhiskyCreate.jsx
WhiskyDetail.jsx
WhiskyList.jsx
WhiskyUpdate.jsx 등
```

### 1-3. 컴포넌트가 아닌 파일은 camelCase를 적용

- 함수 파일, axios 요청 파일 등

```
fetchApi.jsx
auth.jsx
```

### 1-4. 서로 연관된 파일들은 하나의 폴더에 넣어 준다

```
components ─── WhiskyRecommend
             └ WhiskyRecommend.jsx
             └ WhiskyRecommendList.jsx
             └ WhiskyRecommendListItem.jsx 
```

# 2. 변수명

### 2-1. 변수는 camelCase와 영어 대소문자, 숫자를 사용

```jsx
const isLog = false;
const list2 = ['a', 'b'];
```

### 2-2. 변수에 할당되는 값이 Boolean인 경우에는 is, can, exist, has를 접두사로 붙임

```jsx
const isLoading = false;
const isOpen = true;

const canRead = true;
const hasItem = false;
```

### 2-3. 상수는 대문자로 작성

```jsx
const BASE_URL = 'https://naver.com'
```

# 3. 함수명

### 3-1. 이벤트 함수명

- on+{event name}+handler

```html
<button onClick={onClickHandler}>리셋 버튼</button>
```

### 3-2. 여러 개의 함수

- 사용되는 함수가 여러개 있을 경우, **어떤 기능**을 가지고 있는지 유추할 수 있는 단어를 함께 작성

```html
<button onClick={onClickResetHandler}>리셋 버튼</button>
<button onClick={onClickSubmitHandler}>제출 버튼</button>
```

### 3-3. 연관성

- 서로 연관성있는 태그들을 컴포넌트로 생성할 때 컴포넌트 이름은 PascalCase+Box

```javascript
function FormBox() {
	// ...코드
    return (
        <form>	
            <input type="text" value="초기값" />
            <input type="submit" value="제출" />
        </form>
    )
}
```

### 3-4. 같은 태그, 다른 기능

- 만약 같은 태그를 사용하지만 다른 기능을 가진 경우, 어떤 기능을 가지고 있는지 유추할 수 있는 단어를 함께 작성

```jsx
function SignupFormBox() {
	// ...코드
    return (
        <form>	
            <input type="text" name="name" />
            <input type="text" name="id" />
            <input type="password" name="pwd" />
            <button type="submit">회원가입</button>
        </form>
    )
}

function LoginFormBox() {
	// ...코드
    return (
        <form>	
            <input type="text" name="id" />
            <input type="password" name="pwd" />
            <button type="submit">로그인</button>
        </form>
    )
}
```

# 4. Styled-components

### CSS

- 별도의 CSS 파일로 작성하지 않고, styled-components 사용하여 작성
- 태그명의 경우, 아래의 규칙을 따름

### 4-1. 태그명

- 태그명은 S+PascalCase로 작성(스타일을 입힌 태그라는 의미의 **S**를 접두사로 붙임)

```jsx
const SDiv = styled.div`
	// code
`;

const SHeader = styled.header`
	// code
`;

const SSection = styled.section`
	// code
`;

const SInput = styled.input`
	// code
`;
```

### 4-2. 최상위 태그

- 감싸는 태그 중 최상위 태그의 경우에는 S+Layout으로 작성

```jsx
const SLayout = styled.div`
	// code
`;
```

### 4-3. 약어

- 풀네임을 쓰는 것을 권장하지만, 약속된 단어의 경우에는 약어 사용 가능
    - ex) SButton → SBtn

```jsx
const SBtn = styled.button`
	// code
`;
```

### 4-4. 중복 사용 태그

- 중복 사용되는 태그가 있다면, 어떤 기능을 가지고 있는지 유추할 수 있는 단어를 함께 작성

```jsx
const SPopUpHeader = styled.header`
	// code
`;

const SHomeHeader = styled.header`
	// code
`;

const SLogInBtn = styled.button`
	// code
`;

const SLogOutBtn = styled.button`
	// code
`;
```

### 4-5. 논 스타일 태그

- 스타일을 넣지 않을 태그는 Styled-components로 선언 자체를 하지 말 것

```jsx
return {
    <SLayout>
        <div>  {/* 의미 없이 컨테이너 역할을 하는 태그는 그냥 div 태그로 사용한다. */}
          <STitle>타이틀</STitle>
          <SDesc>서브타이틀</SDesc>
        </div>
    </SLayout>
}

return {
    <SLayout>
        <TitleBox>  {/* 물론 컨테이너에서 스타일을 적용해야하는 경우, Styled-components로 선언한다. */}
        	<STitle>타이틀</STitle>
        	<SDesc>서브타이틀</SDesc>
        </TitleBox>
    </SLayout>
}
```

# 5. 기타 규칙

- 변수명 작성시 예약어를 사용하지 않는다.

### 파일 트리

- 라우터에서 최초로 렌더링 되는 컴포넌트들은 하나의 폴더로 분리
- 이외의 컴포넌트들은 기능별로 폴더 생성하여 ‘`component`’의 하위 폴더로 분리
- 재사용하는 컴포넌트는 ‘`component/common`’ 폴더에 정리
    - NavBar / Button / Input / Form 등 다른 사람도 가져다 쓸 여지가 있는 컴포넌트만

### 들여쓰기, 세미콜론 등 양식 통일 관련

- 프리티어 사용하여 정리
    - 프리티어는 디자인 리더(이예진)가 초기 설정하여 배포
- 기본 합의사항
    - 들여쓰기 : space 2
    - 세미콜론 : 사용
    - 따옴표 : 쌍따옴표 사용

### VSCode extension

- 기존 VSCode 사용자의 extension 비교하여 사용할 확장 프로그램 정리
- 추가 도입이 필요한 extension의 경우 프론트엔드 담당자 모두가 논의하여 다같이 도입

### 컴포넌트 생성규칙

- 함수형 컴포넌트로 생성

---

# Front-End **Design Style Convention**

### 와이어 프레임

- 최대한 간단하게 논리흐름 위주로 만들기, 디자인적 요소는 반영 X

### 프로토타입

- 완성품과 동일한 수준의 퀄리티로 만들기
    - 할 수 있다면…

### 디자인 리더

- 이예진님
    - 큰 틀에서의 디자인은 리더의 의사 존중
    - 의견 있을시 개선 예시를 만들어 디자인 리더에게 제출

### 스타일 가이드 추가 논의사항

- 기존 사이트 디자인 가이드 or Figma Community에서 괜찮은 샘플 찾아서 한번 더 논의
- 컴포넌트간 간격, 디자인 컬러, 반응형 디자인 여부 등 최대한 세부적인 논의 필요

### 프리티어 설정법

[VSCode 저장시에 자동정렬 설정 (Prettier) - 적용 안됨 고치는법 포함](https://shoney.tistory.com/entry/VSCode-%EC%A0%80%EC%9E%A5%EC%8B%9C%EC%97%90-%EC%9E%90%EB%8F%99%EC%A0%95%EB%A0%AC-%EC%84%A4%EC%A0%95-Prettier-%EC%A0%81%EC%9A%A9-%EC%95%88%EB%90%A8-%EA%B3%A0%EC%B9%98%EB%8A%94%EB%B2%95-%ED%8F%AC%ED%95%A8)

### 환경 변수

- node →  v18.14.2
- react → v18.2.0
- npm → v9.5.0
- recoil → v0.7.7
- styled-components → v5.3.8
- react-dom → v18.2.0
- react-router-dom → v6.8.2

### 확장 프로그램

- Auto Rename Tag
- Bracket Pair Color
- CSS Peek
- Dev Containers
- ESLint
- Editor Config for VS Code
- GitLens
- Prettier
- Live Server
- Reactjs code snippets
- Auto Import