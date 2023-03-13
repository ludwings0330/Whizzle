# 자바 코딩 컨벤션

## 1️⃣ 개행, 들여쓰기, 공백 (IntelliJ)

---

[Java-Coding-Convention.xml](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a78ba6a-34fd-4a68-bc84-7a329e693f7b/Java-Coding-Convention.xml)

- Entity, DTO 클래스에서 Field의 사이에는 한 줄의 공백을 둔다.

## 2️⃣ 이름 규칙

---

### 패키지, 클래스

1. 패키지는 `모두 소문자`, 클래스는 `PascalCase`를 사용한다.
2. 패키지 경로와 클래스 이름을 통해 클래스의 역할을 짐작할 수 있도록 한다.

### 필드, 변수, 상수

1. 비상수 필드와 변수는 `camelCase`, 상수는 `UPPER_SNAKE_CASE`를 사용한다.
2. 정의 목적을 이름에 그대로 표현한다.
    - tmp와 같은 임시 변수는 되도록 사용하지 않는다.
    - 논리적인 목적을 가진 변수를 사용하기 보다는 메서드를 분리한다.
3. 일반적으로 `명사/형용사`를 사용한다.
4. 타입에 따른 추가적인 규칙은 다음과 같다.
    1. Boolean 타입은 `is, can, has, exists + 명사/형용사`로 짓는다.
    2. 날짜 타입은 다음 규칙을 따른다.
        - LocalDateTime 타입
            - 변수명의 마지막은 DateTime으로 한다.
            - 기본 DateTimeFormat은 `yyyy-MM-dd'T'hh:mm:ss`로 한다.
        - LocalDate 타입
            - 변수명의 마지막은 Date로 한다.
            - 기본 DateTimeFormat은 `yyyy-MM-dd`로 한다.
        - LocalTime 타입
            - 변수명의 마지막은 Time으로 한다.
            - 기본 DateTimeFormat은 `hh:mm:ss`로 한다.

### 메서드

1. 메서드는 `camelCase`를 사용한다.
2. 수행하는 기능을 이름에 그대로 표현한다.
3. 일반적으로 `동사로 시작`한다.
4. 반환형에 따른 추가적인 규칭은 다음과 같다.
    1. Boolean 타입인 경우 `is, can, has, exists + 명사/형용사`로 짓는다.

### SQL

1. 테이블과 속성 모두 `lower_snake_case`를 사용한다.
2. 테이블 이름은 다음 규칙을 따른다.
    - 집합 명사/복수 명사를 사용한다. 되도록 집합 명사를 사용한다.

          **예시**    employees(복수 명사)보다는 staff(집합 명사)를 사용한다.

    - 관계 테이블의 이름은 비즈니스 로직에서 사용하는 의미에 따른다. 단, 의미가 관계에 있다면 has, relation 등을 활용하여 테이블 이름을 설정한다.
3. 속성 이름은 다음 규칙을 따른다.
    - 단수 명사를 사용한다.
    - 테이블 이름과 겹치지 않아야 한다.

### Controller & Service

1. 기본적으로는 Repository에서 사용하는 메서드 이름을 따른다.
2. API 명세서에 따라서 Controller의 메서드 이름을 정한다.
3. Service의 메서드 이름은 비즈니스 로직에 따라 이름을 정한다.

### Repository (JPA)

1. JPA의 쿼리 메서드를 사용하는 경우 해당 **명명 규칙**을 따른다. 다음의 간단한 주의 사항을 참고하자.
    - INSERT를 할 때, saveAll()을 해도 Bulk Insert를 하지 않는다. Bulk Insert가 필요하다면 SpringJdbcTemplate의 사용을 고려하자.
    - DELETE를 할 때, delete()와 deleteById() 중에서 비즈니스 로직에 따라 선택한다.

          **참고**    [Spring Data JPA에서 delete와 deleteById의 차이](https://www.notion.so/Spring-Data-JPA-delete-deleteById-44d842772e554864a144e025f60a1a46)

2. JPA의 쿼리 메서드를 사용하지 않는 경우 다음 **명명 규칙**을 따른다.

   **SELECT Query**

    - 메서드명의 시작은 목적에 따라 find, exists, count로 한다.
    - 반환형이 Optional<Entity>인 경우 목적어를 사용하지 않고, 반환형이 List<Entity>인 경우 All을 사용한다.

          **참고**    정확한 목적이 있는 경우 All 대신에 FirstN, TopN과 같은 표현을 사용할 수 있다.

        ```java
        Optional<Article> findById(Long id);
        
        List<Article> findAll();
        
        List<Article> findTop10(Sort sort);
        ```

    - Fetch Join을 사용한다면 그래프 탐색이 가능한 필드명을 With로 안내한다.

        ```java
        @Query("SELECT a FROM Article a JOIN FETCH a.comments")
        List<Article> findAllWithComments();
        ```

    - WHERE 절 등의 조건에 사용할 필드명 또는 조건을 By로 안내한다. 만약, With에 사용한 필드인 경우 By는 생략한다. 이래도 메서드명이 길어지면 이다운 호출!!

        ```java
        @Query("SELECT a FROM Article a WHERE a.writer.id = :writerId")
        List<Article> findAllByWriter(@Param("writerId") Long writerId);
        
        @Query("SELECT a FROM Article a JOIN FETCH a.comments WHERE a.id IN :ids")
        List<Article> findAllWithCommentsById(@Param("ids") List<Long> ids);
        
        @Query("SELECT a FROM Article a JOIN FETCH a.writer JOIN FETCH a.comments WHERE a.writer.id = :writerId")
        List<Article> findAllWithWriterAndComments(@Param("writerId") Long writerId);
        
        Optional<Article> findByIdAndTitle(Long id, String title);
        
        boolean existsByTitle(String title);
        ```

    - JPQL에서 Named Parameter를 사용할 때는 `@Parma("name")`을 사용하는 것을 권장한다.

          **참고**    자바8 이상에서는 사용하지 않아도 되는데, [compiler에 -parameters 옵션을 사용](https://zzang9ha.tistory.com/357)해야 한다.


      **INSERT Query**  
    
    - JPA에서는 사실상 save(), saveAll() 외에 새로운 메서드를 만들 필요가 없다.
    - 그럼에도 있으면 이다운 호출!!
    
      **UPDATE Query**  
    
    - Bulk Update가 아니라면 사용하지 않는다.
    - 메서드명의 시작은 update로 한다.
    - 수정하려는 필드명을 목적어로 사용한다.
    - WHERE 절 등의 조건에 사용할 필드명을 By로 안내한다.
    - 수정한 레코드의 개수로 추가적인 로직을 수행하지 않는다면 반환형은 void로 한다.
    
    ```java
    @Modify
    @Query("UPDATE Ariticle a SET a.modifiedDateTime = :modifiedDateTime WHERE a.id BETWEEN beginId AND endId")
    void updateModifiedTimeByIdBetween(Long beginId, Long endId, LocalDateTime modifiedDateTime);
    ```
    
      **DELETE Query**  
    
    - Bulk Delete가 아니라면 되도록 사용하지 않는다.
        
          **참고**    메서드 `deleteAllInBatch(List<Long> ids)`, `deleteAllByIdInBatch(List<Entity> entities)`를 이용하면 Bulk Delete를 직접 정의하지 않아도 된다.
        
    - 메서드명의 시작은 deleteAll로 한다.
    - WHERE 절 등의 조건에 사용할 필드명을 By로 안내한다.
    - 삭제한 레코드의 개수로 추가적인 로직을 수행하지 않는다면 반환형은 void로 한다.
    
    ```java
    @Modifying
    @Query("DELETE FROM Article a WHERE a.id IN :ids")
    void deleteAllById(@Param("ids") List<Long> ids);
    ```

3. 메서드의 **순서는 다음 규칙**을 따른다.
    - DML의 종류에 따라 SELECT, INSERT, UPDATE, DELETE 순으로 나열한다.
    - 메서드의 목적에 따라 유사한 것끼리는 붙여놓는다.
    - 범주가 넓은 것에서 좁은 것 순서로 나열한다.

    ```java
    List<Article> findAll();
    
    Page<Article> findAllByCondition(Pageable pageable, SearchCondition condition);
    
    Slice<Article> findTop10ByCondition(Pageable pageable, SearchCondition condition);
    
    List<Article> findAllByWriter(Long writerId);
    
    List<Article> findAllWithCommentsById(List<Long> ids);
    
    List<Article> findAllWithWriterAndComments(Long writerId)
    
    Optional<Article> findById(Long id);
    
    boolean existsByTitle(String title);
    
    void updateTitleById(List<Long> ids, String title);
    
    void deleteAllById(List<Long> ids);
    ```


## 3️⃣ 애노테이션 규칙

---

- 클래스, 필드, 생성자, 메서드 애노테이션은 다음과 같이 한 줄에 하나씩 기입한다.

    ```java
    @ClassAnotation1
    public class Wolf {
    		
    		@Autowired
    		@Mock
    		private Service service;
    
    		@Override
    		public int hashCode() {
    				...
    		}
    
    }
    ```


## 4️⃣ 예외 규칙

---

### 사용자 예외 활용에 따른 종류 선택

1. Checked Exception  ⇒  extends Exception
    - 최대한 사용하지 않는다. 다음의 경우에만 사용하는 것을 고려한다.

        <aside>
        📢 예외를 처리하는 것이 비즈니스 로직의 일환인 경우 사용할 수 있다.

      예를 들어, ****오픈비두 세션ID 저장할 때, ****서버가 책임을 가지고 반드시 세션ID를 저장해야 한다고 가정하자. 처음에 랜덤하게 생성한 세션ID를 DB에 저장했는데 겹치는 ID가 있어서 예외가 발생했다고 하면, 해당 예외는 서비스 레이어에서 잡아서 다시 세션ID를 저장하도록 재귀적으로 해결해야 한다.

      이처럼 비즈니스 로직의 일환인 경우 서비스 레이어에서 예외를 잡아서 처리해야 하고, 그것을 강제하기 위해 Checked Exception을 사용할 수 있다.

        </aside>

    - Checked Exception을 Unchecked Exception으로 래핑하는 경우 cause를 남기기 위해 발생한 예외를 인자로 넘겨주어야 한다.
2. Unchecked Exception  ⇒  extends RuntimeException
    - 거의 모든 예외에 사용한다.
    - 예외의 원인이 비즈니스 로직과 관련된 경우 관련된 모든 메서드의 Docs에 적어야 한다.

### 예외의 발생과 처리

- 예외를 던지기 전에 Optional이나 null로 반환하는 것이 더 나은지 고민해야 한다.

      **예시**    Controller에서 받은 Model을 View에 전달할 값으로 가공하는 로직에 사용할 경우

- 예외를 던질 때는 예외가 발생한 이유를 메세지에 상세히 적어야 한다.

    ```java
    throw new RuntimeException("이 코드는 실행될 수 없습니다.");
    ```

- 대부분의 RuntimeException은 서비스 레이어에서 처리하지 않고, ControllerAdvice에 위임한다.
    - ControllerAdvice에 위임한 예외 중 API 사용에 영향을 미치는 예외는 Docs에 기록해야 한다.
    - 서비스 레이어에서 처리할 수 있는 예외는 잡아서 처리할 수 있다.
- 비즈니스 로직과 관계 없는 예외는 ControllerAdvice에서 RuntimeException으로 한 번에 처리한다. 다만, 예외별로 다른 로직을 적용해야 하는 경우에는 개별적으로 처리할 수 있다.
- 메서드에서 발생할 수 있는 예외는 구체적으로 적는다. 이때, 발생 가능한 순서대로 적는다.

    ```java
    public void boo() throws Exception1, Exception2, Exceptions3 {
    		if (validate()) {
    				throw new Exception1();
    		}
    
    		optional.OrElseThrow(() -> new Exception2());
    		foo();
    }
    
    public void foo() throws Exception3 {
    		throw new Exception3();
    }
    ```


## 5️⃣ Validation

---

### DTO

- 외부에서 MVC 구조 내부로 데이터를 받아올 때, 경계에서 검증한다.

  ⇒  MVC 구조에서는 Controller에서 요청을 받을 때만 검증하면 된다.

- Controller에서 DTO 검증을 위해 @Valid를 Parameter의 Type 앞에 붙여야 한다.

### Entity

- `@Column`의 속성보다는 `javax.validation`을 사용한다.

      **예시**    `nullable = false` 보다는 `@NotNull`을 사용한다.

- `@PrePersist`와 `@PreUpdate`를 이용하여 데이터를 세팅하거나 검증할 수 있다.

## 6️⃣ JavaDoc으로 설명한다.

---

```java
/**
 * 이 메서드는 이럴 때 사용하는 메서드입니다.
 * @param var1 이 매개변수는 이런 조건을 만족시켜야 합니다. 없으면 적지 않아도 됩니다.
 * @param var2 이 매개변수는 이런 조건을 만족시켜야 합니다.
 * @throws Exception1 이런 상황이면 예외가 발생합니다. 이건 꼭 적어야 합니다.
 * @throws Exception2 이런 상황에도 예외가 발생합니다.
 * @return 반환값이 있다면 무엇을 반환하는지 적습니다.
 */
public void foo(String var1, int var2) throws Exception1, Exception2 {
		...
}
```

## 6️⃣ 변수 선언 및 초기화 규칙

---

- 변수는 한 줄에 하나씩만 선언한다.
- 리터럴 사용 가능한 경우 리터럴을 반드시 사용한다.
- 배열은 Type[] 형태로 선언한다.
- Entity와 DTO의 필드에는 최대한 final을 적용하고 setter 사용을 피한다.

## 7️⃣ Lombok

---

1. Entity에서 `@Data`는 사용하지 않는다.
2. Entity에서 `@ToString`은 주의하여 사용한다.
    - 순환참조 문제가 발생하지 않을 것이 확실한 경우에는 사용할 수 있다.
    - 순환참조 문제가 발생할 가능성이 있다면 해당 필드는 제외하고 사용해야 한다. 즉, Lazy Loading Field는 제외하고 사용한다.

      ⇒  제외할 때는 `@ToString.exclude`를 사용한다.

3. Entity에서 `@EqualsAndHashCode`는 사용하지 않는다.
    - Entity는 모든 필드를 이용하여 Equals와 HashCode를 구현해서는 안 된다.
    - 속성으로 `onlyExplicitlyIncluded = true`를 부여하고 ID에 `@EqualsAndHashCode.Include`를 적용하는 것으로는 비영속 상태인 객체로 인해 발생하는 문제를 해결할 수 없다.
4. JPA에서 데이터 바인딩, Entity의 프록시 생성을 위해 NoArgsConstructor를 사용한다. 이때, 상속을 이용하여 프록시를 생성하므로 접근 제어자를 Protected로 하는 것을 권장한다.
5. @Builder 사용 시 대상 필드를 최소화한다.
    - 직접 생성자를 정의한 후 생성자에 애노테이션을 적용한다.
    - 클래스에 애노테이션을 적용하는 경우에는 기본값이 정해진 필드에 final 키워드를 사용한다.
6. @Embeddable 클래스는 값 타입의 역할을 수행해야 한다. 따라서 @ToString, @EqualsAndHashCode을 사용해야 한다.

## 8️⃣ RestController 반환 규칙

---

1. 대부분의 경우에는 ResponseEntity를 사용할 필요가 없다. 따라서 `@ResponseStatus`와 `return DTO`를 사용한다.
2. 다음의 경우에는 ResponseEntity를 사용할 수 있다.
   - 유연하게 Body에 넣을 객체의 타입을 결정해야 하는 경우에는 사용할 수 있다. 다만 NO_CONTENT를 사용하지 않는다면 대부분은 유연하게 Body에 넣을 객체의 타입을 결정할 일이 잘 없다.
   - 헤더를 따로 설정해야 하는 경우에는 ResponseEntity를 사용할 필요가 있다. 이때는 Generic Type에 Body에 사용할 DTO를 명시한다.
3. ResponseEntity를 사용할 때는 생성자보다는 빌더 패턴을 사용할 것을 권장한다. 예시는 다음과 같다.

    ```java
    ResponseEntity.status(HttpStatus.OK)
                       .contentType(MediaType.APPLICATION_JSON)
                       .header("Authorization", "Bearer " + AccessToken)
                       .body(responseDto)
                       .build()
    ```
## 9️⃣ 로그 규칙

---

### Controller

1. Request로 들어오는 데이터는 info로 로그를 남긴다.
2. Response로 나가는 데이터는 로그를 남기지 않는다.

### Service

1. 비즈니스 로직을 수행하는 기능이 250ms 이상 소요될 경우 debug로 로그를 남긴다.
2. 인자로 들어오는 데이터는 info로 로그를 남긴다.

### Repository

1. DB에서 조회하는 기능이 150ms 이상 소요될 경우 debug로 로그를 남긴다.
2. 에러가 발생할 경우 디버깅에 사용할 목적이 있다면 조회 결과를 로그로 남길 수 있다.

## 🔟 MVC 설계 규칙

---

### 인터페이스 사용

Service와 ServiceImpl로 나누어 구현하는 것이 필요하지 않을 수 있지만 일단은 OCP 원칙을 위해 지켜볼까?요?예?

### Layer 분리

1. DTO는 실제 사용하는 클래스가 있는 패키지에 속하도록 위치시킨다.
2. Model과 View의 결합도를 낮추기 위해 Entity와 DTO의 상호 변환은 Controller에서 하는 것을 권장한다.
    - 성능과 같은 이유로  Service와 Repository에서 DTO를 반환할 수 있다.
    - DTO를 직접 반환할 때는 API 스펙의 변화에 따른 영향을 최소화하기 위해 패키지를 분리한다.
    - 비즈니스 로직에서의 필요성과 같은 이유로 Service에서 DTO를 Entity로 변환할 수 있다.

          **참고**    DTO to Entity는 Entity to DTO에 비하여 상당히 취향을 많이 탄다. 구조적으로는 Controller에서 하는 것이 올바를 수 있으나, 현실적으로는 Service에서 DTO를 인자로 받고 직접 Entity로 변환하는 것이 일반적인 것 같다.

    - DTO를 Entity로 변환하는 것은 API 스펙의 변화보다는 Entity의 변화에 영향을 더 많이 받으므로 굳이 패키지를 분리하지 않는다.

```json
├── member
│		├── controller
│		│		├── MemberController
│		│		└── dto
│		│				├── MemberRequestDto
│		│				├── MemberRequestSaveDto
│		│				└── MemberResponseDto										
│		├──	service 
│		│		├── MemberService
│		│		├── MemberServiceImpl
│		│		└── query
│		│				├── MemberQueryService
│		│				├── MemberQueryServiceImpl
│		│				└── dto
│		│						└── Member[용도]Dto
│		└──	repository
│				├── MemberRepository
│				└── projection
│						├── MemberProjectionRepository
│						└── dto
│								└── Member[용도]Dto
├── domain
│		├──	converter
│		├──	exception
│		└── model
│				├── entity
│				└── type
└──	common
		├── config
		├── filter
		├── interceptor
		├── aop
		└──	util
	
```