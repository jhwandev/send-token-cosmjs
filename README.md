# Send Token CosmJS
https://send-token-cosmjs-dev.vercel.app/

## 프로젝트 기획
- A 계정의 토큰을 B 계정으로 보내는 프로그램 ([슈퍼노바](https://docs.supernovaprotocol.xyz/) 테스트넷 + 코스모스 테스트넷)
  - 프론트엔드에는 3개의 text area와 1개의 버튼이 존재
  - 한 text area는 코인을 보내는 지갑의 니모닉이 들어감
  - 다른 text area는 코인을 받는 지갑의 주소가 들어감
  - 마지막 text area는 보내고자 하는 코인의 수량이 들어감
  - 버튼을 누르면 송금이 실행됨



## 개발환경
- React.js
  - react-router-dom
- TypeScript
- Node.js 
- [tailwindCSS](https://tailwindcss.com)
- [cosmJS](https://github.com/cosmos/cosmjs) (코스모스 SDK)


## 시작하기

1. ```npm install``` 의존성 패키지 설치
2. ```npm start``` 개발 모드에서 앱을 실행합니다. (http://localhost:3000)

## 작동방식
  1. 입력한 mnemonic값으로 signer를 생성
  2. rpcurl, signer를 통해 signingClient 생성
  3. signingClinet를 통한 토큰 전송
  
```typescript

// 1. signer (니모닉 키)
const signer = DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'nova' // or cosmos
  });
  
// 2. signingClient (rpc, signer)
signingClient = await SigningStargateClient.connectWithSigner(
  rpcUrl,
  signer
);

// 3. 전송 (sigingClient)
result = await signingClient.sendTokens(
  sender,
  receiver,
  [{ denom: denom, amount: amount }],
  {
    amount: [{ denom: denom, amount: "500" }],
    gas: "200000",
  }
);    
```
 - 상세내용 : [DOCS](https://busy-whimsey-f01.notion.site/send-token-cosmjs-025dbfe3856744d0956f38497d325824)

## 지원체인
- [SuperNova Testnet](https://docs.supernovaprotocol.xyz/)
- [Cosmos Testnet](https://hub.cosmos.network/main/hub-tutorials/join-testnet.html)

## 프로젝트 구조
```
[SEND-TOKEN-COSMJS]
├── node_modules
├── public
├── src 
│    ├── api
│    ├── assets
│    ├── components
│    ├── locale
│    ├── pages
│    ├── styles
│    ├── utils
│    ├── App.tsx
│    └── index.tsx
│
├── config-overrides.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## History

### token-sender-v1 -> token-sender-v2
  - UX 개선
      - [x]  입력되면 안되는 문자의 경우 입력단에서부터 막는 기능 필요
      - [x]  다시 전송버튼 누를경우 기존 결과 메세지 삭제 필요
      - [x]  유효성 검사 후 상황에 맞는 에러 메세지 출력 필요
      - [x]  절못된 경로 접속시 처리 → default 주소로 리다이렉트
      - [x]  한글/영어 다국어 기능 필요
      - [x]  네트워크 변경할 경우, form에 입력된 내용이 있을 경우 confirm 후 처리

  - UI 개선
      - [x]  confirm창 반응형(모바일) 대응
      - [x]  해당토큰 브랜드 컬러 적용하여 버튼 직관적으로 개선
      - [x]  타이틀 디자인 css 배치 오류 수정 필요

  - 코드개선
      - [x]  전체조회 메서드 → 특정토큰 조회 메서드 사용 (getAllBalances → getBalance)
      - [x]  sdk연결 후 disconnect 

## 참고자료

- [Cosmos Developer Portal](https://tutorials.cosmos.network/)
- [CosmJS Github](https://github.com/cosmos/cosmjs)
- [SuperNova Docs](https://docs.supernovaprotocol.xyz/)




