# 1. REST 란?

REST(REpresentational State Transfer) 는 로이 필딩이 자신의 2000년도 박사 학위 논문에 정의한 `네트워크 소프트웨어 아키텍처`이다. 쉽게말해 ‘네트워크에서 통신을 구성할 때 이런 구조로 설계하라는 지침’ 정도로 볼 수 있다. `*HTTP URL` 을 통해서 자원을 명시하고 `HTTP METHOD` 를 통해 해당 자원에 대한 행위를 요청*한다.

REST = 네트워크 소프트웨어 아키텍처, **HTTP 의 장점을 살리고자 하는 통신규약**

본디 네트워크 통신을 위해 제시하였으나, 현실적으로 온라인 '네트워크'의 지분 중 태반을 차지하는게 월드와이드 웹 이기 때문에 **'웹' 기반의 전송을 위해 쓰이는 경우가 대부분**이다. 태생 자체가 `데이터 송수신에 최적화` 되어 있다보니 이를 위한 `웹 API` 쪽에서 굉장히 많이 쓰인다. 이를 '`REST API`'라고 부르는데, 이제는 그냥 '웹 API'와 동일하다고 볼 수 있을 정도로 보편화되었다. 어디선가 HTTP기반의 웹 API를 구현한다면 십중팔구는 REST를 준수하는 RESTful API라고 보면 된다.

---

# 2. 조건

- Client-server
    - 클라이언트와 서버로 분리되어 서로에게 의존성이 없어야한다.
- stateless
    - 상태 정보를 따로 저장하지 않으며 이용자가 누구인지, 어디서 접근하는지와 관계없이 결과가 동일해야한다.
    - 요청시에 해당 요청을 처리하기 위한 모든 정보가 담겨있어야 한다.
- cache
    - HTTP 를 비롯한 네트워크 프로토콜에서 제공하는 캐싱 기능을 적용할 수 있어야한다.
- Uniform interface
    - 데이터가 표준 형식으로 전송될 수 있도록 구성 요소 간 통합 인터페이스를 사용한다. (URL, 응답 코드, method)
    - 데이터를 식별 가능하게 해야한다는 원칙
    - URL만 보고도 어느 데이터를 어떤 식으로 전송해야 하는지 구별할 수 있어야한다.
- Layered System
    - 요청된 정보를 검색하는데 있어 계층 구조로 분리되어야 한다.
- Self-descriptiveness
    - API 를 통해 전송되는 내용은 별도의 문서 없이도 이해할 수 있도록 `자체 표현 구조`를 지녀야한다.

<aside>
💡 REST 사용하는 이유
- HTTP 통신에서 명확한 의미를 지니는 자원(URL), 메서드(HTTP METHOD) 를 통해 별도의 문서 없이 요청만 보더라도 클라이언트측에서 무엇을 원하는지 쉽게 파악할 수 있다. (요청 의도가 명확히 알 수 있음)

</aside>

---

# 3. REST 구성요소

1. 자원(Resource) : `HTTP URL`
2. 자원에 대한 행위 : `HTTP Method`
3. 자원에 대한 표현 : `Representation`

---

# 4. URL 네이밍 규칙

1. 명사 사용

    ```
    http://localhost/get/users **(X) - 명사 사용하기**
    http://localhost/users
    ```

2. 소문자 사용

    ```
    http://localhost/Users **(X) - 소문자 사용하기**
    http://localhost/users (O)
    ```

3. 복수형 사용

    ```
    http://localhost/user **(X) - 복수형 사용하기**
    http://localhost/users (O)
    ```

4. 구분자는 “_”(언더바) 대신  “-” (하이픈) 사용

    ```
    http://localhost/post_comments **(X) - 언더바 대신 하이픈 사용하기**
    http://localhost/post-comments (O)
    ```

5. url 의 마지막엔 슬래쉬를 포함하지 않음

    ```
    http://localhost/users/teams/names/ **(X) - url 마지막엔 슬래쉬를 포함하지 않음**
    http://localhost/users/teams/names (O)
    ```

6. 행위를 포함하지 않음

    ```
    GET http://localhost/users/comments/post/1 **(X) - 행위는 Method 사용하기**
    POST http://localhost/users/comments/1 (O)
    ```

7. 파일의 확장자는 포함하지 않음

    ```
    http://localhost/photos/image.jpg **(X) - 파일의 확장자는 제외하기**
    http://localhost/photos/image (O)
    ```


---

# 5. 요약

REST API 는 HTTP 를 사용한 통신에서 HTTP의 특징을 살려 효과적으로 통신하기 위한 통신 지침이다.

구성요소로 Resource, Method, Message 가 있으며 각각 URL, HTTP METHOD, Request, Reponse Message 를 의미한다.

RESTful 한 API 를 작성함으로써, 요청 자체를 가지고 해당 요청에서 필요로 하는 것이 무엇인지 명확히 알 수 있다.