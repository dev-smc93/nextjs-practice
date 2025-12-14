This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 프로젝트 개요

이 프로젝트는 Next.js를 사용하여 만든 카운터와 할 일 목록 관리 앱입니다. React의 `useState` 훅과 배열 메서드(`map`, `filter`), 스프레드 연산자를 활용하여 상태 관리를 구현했습니다.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new
font family for Vercel.

---

## 코드 상세 설명

### 1. Interface (타입 정의)

```typescript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
```

**설명:**

- `interface`는 TypeScript에서 객체의 구조를 정의하는 방법입니다.
- `Todo` 인터페이스는 할 일 항목이 가져야 할 속성들을 명시합니다:
  - `id`: 각 할 일을 고유하게 식별하는 숫자
  - `text`: 할 일의 내용 (문자열)
  - `completed`: 완료 여부 (불린 값)

**예시:**

```typescript
// 올바른 Todo 객체
const todo1: Todo = {
  id: 1234567890,
  text: "리액트 공부하기",
  completed: false,
};

// 타입 오류 발생 (id가 없음)
const todo2: Todo = {
  text: "타입스크립트 공부하기",
  completed: false,
}; // ❌ Error: Property 'id' is missing
```

**왜 사용하나요?**

- 타입 안정성: 잘못된 데이터 구조를 미리 방지
- 자동완성: IDE에서 속성 이름을 자동으로 제안
- 문서화: 코드만 봐도 데이터 구조를 이해 가능

---

### 2. 스프레드 연산자 (Spread Operator)

스프레드 연산자(`...`)는 배열이나 객체의 모든 요소를 펼쳐서 새로운 배열이나 객체를 만드는 연산자입니다.

#### 배열에서의 스프레드 연산자

```typescript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
// arr2 = [1, 2, 3, 4, 5]

// 기존 배열을 변경하지 않고 새 배열 생성
const arr3 = [...arr1]; // arr1의 복사본
```

**예시:**

```typescript
// 기존 배열
const todos = [
  { id: 1, text: "공부하기", completed: false },
  { id: 2, text: "운동하기", completed: true },
];

// 스프레드 연산자로 새 항목 추가
const newTodos = [...todos, { id: 3, text: "독서하기", completed: false }];
// 결과: 기존 2개 항목 + 새 항목 1개 = 총 3개

// 원본 배열은 변경되지 않음
console.log(todos.length); // 2 (그대로)
console.log(newTodos.length); // 3 (새 배열)
```

#### 객체에서의 스프레드 연산자

```typescript
const todo = { id: 1, text: "공부하기", completed: false };
const updatedTodo = { ...todo, completed: true };
// 결과: { id: 1, text: "공부하기", completed: true }
```

**왜 사용하나요?**

- React에서 상태를 불변(immutable)하게 유지하기 위해 필수적
- 원본 데이터를 변경하지 않고 새로운 데이터 생성
- React가 변경사항을 감지하고 리렌더링할 수 있게 함

---

### 3. addTodo 함수 (15-21줄)

```typescript
const addTodo = () => {
  if (input.trim()) {
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  }
};
```

**동작 원리:**

1. **`input.trim()`**: 입력값의 앞뒤 공백을 제거하고, 빈 문자열인지 확인

   ```typescript
   "  공부하기  ".trim(); // "공부하기"
   "   ".trim(); // "" (빈 문자열)
   ```

2. **조건문**: 빈 문자열이 아닐 때만 실행

   ```typescript
   if (input.trim()) {
     // input이 "공부하기"면 → true → 실행
     // input이 "   "면 → false → 실행 안 됨
   }
   ```

3. **새 할 일 추가**: 스프레드 연산자로 기존 배열을 펼치고 새 항목 추가

   ```typescript
   // 기존 상태
   todos = [{ id: 100, text: "운동하기", completed: false }];

   // 사용자가 "공부하기" 입력 후 추가 버튼 클릭
   input = "공부하기";

   // 실행 과정
   setTodos([
     ...todos, // 기존 배열 펼치기: { id: 100, text: "운동하기", completed: false }
     {
       id: Date.now(), // 현재 시간을 밀리초로 변환 (예: 1703123456789)
       text: input, // "공부하기"
       completed: false, // 새 항목은 항상 미완료 상태
     },
   ]);

   // 결과
   todos = [
     { id: 100, text: "운동하기", completed: false },
     { id: 1703123456789, text: "공부하기", completed: false },
   ];
   ```

4. **입력 필드 초기화**: `setInput("")`로 입력창을 비움

**실행 예시:**

```typescript
// 초기 상태
todos = [];
input = "리액트 공부하기";

// addTodo() 실행
// 1. input.trim() = "리액트 공부하기" (공백 없음) → true
// 2. Date.now() = 1703123456789 (예시)
// 3. 새 배열 생성: [...[], { id: 1703123456789, text: "리액트 공부하기", completed: false }]
// 4. todos = [{ id: 1703123456789, text: "리액트 공부하기", completed: false }]
// 5. input = "" (입력창 비움)
```

---

### 4. toggleTodo 함수 (23-25줄)

```typescript
const toggleTodo = (id: number) => {
  setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
};
```

**동작 원리:**

1. **`map()` 메서드**: 배열의 각 요소를 변환하여 새 배열 생성

   ```typescript
   [1, 2, 3].map((x) => x * 2); // [2, 4, 6]
   ```

2. **삼항 연산자**: 조건에 따라 다른 값 반환

   ```typescript
   조건 ? 참일 때 값 : 거짓일 때 값
   ```

3. **전체 동작 과정:**

   ```typescript
   // 기존 상태
   todos = [
     { id: 1, text: "공부하기", completed: false },
     { id: 2, text: "운동하기", completed: true },
     { id: 3, text: "독서하기", completed: false },
   ];

   // id가 1인 항목의 체크박스 클릭
   toggleTodo(1);

   // map 실행 과정
   todos.map((todo) => {
     if (todo.id === 1) {
       // 일치하는 항목: completed 값을 반대로 변경
       return { ...todo, completed: !todo.completed };
       // { ...{ id: 1, text: "공부하기", completed: false }, completed: true }
       // = { id: 1, text: "공부하기", completed: true }
     } else {
       // 일치하지 않는 항목: 그대로 반환
       return todo;
     }
   });

   // 결과
   todos = [
     { id: 1, text: "공부하기", completed: true }, // ✅ 변경됨
     { id: 2, text: "운동하기", completed: true }, // 그대로
     { id: 3, text: "독서하기", completed: false }, // 그대로
   ];
   ```

**스프레드 연산자의 역할:**

```typescript
// ❌ 잘못된 방법 (원본 객체 직접 수정)
{ todo, completed: !todo.completed }  // 나머지 속성들이 사라질 수 있음

// ✅ 올바른 방법 (새 객체 생성)
{ ...todo, completed: !todo.completed }
// 기존 속성들(id, text)은 유지하고 completed만 변경
```

**실행 예시:**

```typescript
// 초기 상태
todos = [{ id: 100, text: "공부하기", completed: false }];

// 체크박스 클릭 → toggleTodo(100) 실행
// 1. todos.map() 시작
// 2. todo.id (100) === id (100) → true
// 3. { ...todo, completed: !false } = { ...todo, completed: true }
// 4. 결과: [{ id: 100, text: "공부하기", completed: true }]
```

---

### 5. deleteTodo 함수 (27-29줄)

```typescript
const deleteTodo = (id: number) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};
```

**동작 원리:**

1. **`filter()` 메서드**: 조건을 만족하는 요소만 남겨서 새 배열 생성

   ```typescript
   [1, 2, 3, 4].filter((x) => x > 2); // [3, 4]
   ```

2. **`!==` 연산자**: "같지 않다"를 의미

   ```typescript
   todo.id !== id; // todo.id가 id와 다르면 true
   ```

3. **전체 동작 과정:**

   ```typescript
   // 기존 상태
   todos = [
     { id: 1, text: "공부하기", completed: false },
     { id: 2, text: "운동하기", completed: true },
     { id: 3, text: "독서하기", completed: false },
   ];

   // id가 2인 항목의 삭제 버튼 클릭
   deleteTodo(2);

   // filter 실행 과정
   todos.filter((todo) => {
     return todo.id !== 2;
     // id가 2가 아닌 항목만 남김
   });

   // 각 항목 확인
   // todo.id = 1, id = 2 → 1 !== 2 → true → 유지 ✅
   // todo.id = 2, id = 2 → 2 !== 2 → false → 제거 ❌
   // todo.id = 3, id = 2 → 3 !== 2 → true → 유지 ✅

   // 결과
   todos = [
     { id: 1, text: "공부하기", completed: false },
     { id: 3, text: "독서하기", completed: false },
   ];
   ```

**실행 예시:**

```typescript
// 초기 상태
todos = [
  { id: 100, text: "공부하기", completed: false },
  { id: 200, text: "운동하기", completed: true },
  { id: 300, text: "독서하기", completed: false },
];

// id가 200인 항목 삭제 버튼 클릭 → deleteTodo(200) 실행
// 1. todos.filter() 시작
// 2. id가 200이 아닌 항목만 필터링
//    - id: 100 → 100 !== 200 → true → 유지
//    - id: 200 → 200 !== 200 → false → 제거
//    - id: 300 → 300 !== 200 → true → 유지
// 3. 결과: [{ id: 100, ... }, { id: 300, ... }]
```

---

## 핵심 개념 정리

### 불변성 (Immutability)

React에서 상태를 변경할 때는 항상 새로운 배열/객체를 생성해야 합니다.

```typescript
// ❌ 잘못된 방법 (원본 직접 수정)
todos.push(newTodo); // 원본 배열 변경
todo.completed = true; // 원본 객체 변경

// ✅ 올바른 방법 (새 배열/객체 생성)
setTodos([...todos, newTodo]); // 새 배열 생성
setTodos(todos.map((todo) => ({ ...todo, completed: true }))); // 새 배열 생성
```

### 배열 메서드 비교

| 메서드     | 용도                    | 반환값    | 원본 변경 |
| ---------- | ----------------------- | --------- | --------- |
| `map()`    | 각 요소 변환            | 새 배열   | ❌        |
| `filter()` | 조건에 맞는 요소만 선택 | 새 배열   | ❌        |
| `push()`   | 배열 끝에 추가          | 배열 길이 | ✅        |

### 스프레드 연산자 사용 시나리오

```typescript
// 1. 배열 복사
const copy = [...original];

// 2. 배열에 항목 추가
const newArray = [...oldArray, newItem];

// 3. 객체 속성 변경
const updated = { ...oldObject, property: newValue };

// 4. 여러 배열 합치기
const combined = [...array1, ...array2];
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
