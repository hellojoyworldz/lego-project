# todo-app-nodejs

## 기능

1. 할 일을 추가할 수 있다.
2. 할 일 리스트를 볼 수 있다.
3. 할 일에 대해 끝남,안끝남 표시를 할 수 있다.
4. 할 일을 삭제할 수 있다.

## 백엔드 준비

1. 기본 세팅: npm, express, mongoose, app listener

- npm install express mongoose body-parser

2. 라우터 주소 정의: restful API(주소 + http명령어)

- 추가: /tasks post
- 목록: /tasks get
- 수정: /tasks/:id put
- 삭제: /tasks/:id delete

3. 데이터베이스 스키마 정의
4. 기능 정의: CRUD
5. 테스트: postman

## 프론트엔드 준비

1. UI: git clone
2. 기능 만들기: CRUD
3. 테스트
