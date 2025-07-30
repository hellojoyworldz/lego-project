# todo-app-nodejs

## 기능

1. 할 일을 추가할 수 있다.<br/>
   <img src="./assets/create.gif">
2. 할 일 리스트를 볼 수 있다.<br/>
   <img src="./assets/read.png">
3. 할 일에 대해 끝남,안끝남 표시를 할 수 있다.<br/>
   <img src="./assets/update.gif">
4. 할 일을 삭제할 수 있다.<br/>
   <img src="./assets/delete.gif">
5. 회원가입

- 정보: 이메일, 패스워드, 이름
- 이미 가입된 유저 확인
- 패스워드 암호화 시켜 저장

6. 로그인

- 백엔드

  - 이메일과 패스워드를 입력해서 보냄
  - 해당 이메일과 패스워드를 가진 유저가 있는지 확인
    - 없으면 로그인 실패
    - 있다면 유저정보 + 토큰

- 프론트엔드

  - 유저는 로그인을 할 수 있다.
  - 로그인이 실패한 경우 에러메세지를 로그인창 상단에 보여준다.
  - 로그인 성공할 경우 유저정보를 state에 저장한다.
  - 로그인이 성공한 경우 토큰값을 session storage에 저장한다
  - 로그인이 성공한 경우 api 헤더에 토큰값을 디폴트로 설정해둔다.
  - 로그인이 성공한 경우 할일페이지 /로 넘어간다

7. 유저 권한 확인 (todo page 로그인한 유저만 들어갈 수 있다.)

- 백엔드
- 토큰이 만료되지 않고, 토큰을 해독했을 때 유저 ID가 있는지 확인
- 토큰이 사용 가능하면, 토큰을 바탕으로 유저 객체를 보내준다

- 프론트엔드

  - 로그인을 했다면 로그인 페이지로 들아갈 수 없다

    - 로그인을 했으면 토큰을 저장한다
    - 토큰값을 읽어온다
    - 토큰이 사용 가능한 토크인지 체크한다(백엔드에 요청)
    - 유저값을 저장한다
    - 유저가 있다면 투두페이지를 보여준다

  - 로그인을 안했다면 투두페이지로 들어갈 수 없다.

8. 로그인한 유저라면 todo page로 이동

## 백엔드

1. 기본 세팅: npm, express, mongoose, app listener

- npm install express mongoose body-parser cors dotenv bcryptjs jsonwebtoken

2. 라우터 주소 정의: restful API(주소 + http명령어)

- 추가: /tasks post
- 목록: /tasks get
- 수정: /tasks/:id put
- 삭제: /tasks/:id delete

3. 데이터베이스 스키마 정의

- Task
  | task | isComplete|
  |--|--|
  |string|boolean|

- User
  |name|email|password|
  |--|--|--|
  |string|string|string|

4. 기능 정의: CRUD
5. 테스트: postman

## 프론트엔드

1. UI: git clone
2. 기능 만들기: CRUD
3. 테스트

## 배포

1. 데이터베이스: Mongodb Altas
2. 백엔드: AWS Elastic Beanstalk
3. 프론트엔드: Netlify
