# Send Token CosmJS
https://send-token-cosmjs.vercel.app/

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

## 작동방식 요약
```typescript

// 1. signer (니모닉 키)
const signer = DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'nova' // or cosmos
  });
  
// 2. signingClient (rpc, signer)
signingClient = await SigningStargateClient.connectWithSigner(
  "rpc.sentry-01.theta-testnet.polypore.xyz:26657" //cosmos testnet
  signer
);

// 3. 전송 (sigingClient)
result = await signingClient.sendTokens(
  sender,
  receiver,
  [{ denom: 'nova', amount: amount }],
  {
    amount: [{ denom: 'nova', amount: "500" }],
    gas: "200000",
  }
);    
```

## 프로젝트 구조
```
SEND-TOKEN-COSMJS

├── node_modules
├── public
└── src 
     ├── api
     ├── assets
     ├── components
     ├── pages
     ├── styles
     └── utils
```

## 참고자료

- [Cosmos Developer Portal](https://tutorials.cosmos.network/)
- [CosmJS Github](https://github.com/cosmos/cosmjs)
- [SuperNova Docs](https://docs.supernovaprotocol.xyz/)




