// usage

const naverAPI = require('naver-openAPI-wrapper');
const naver = new naverAPI();
// client id, client secret에는 developers.naver.com에서 발급받은 키들 넣으시면 됩니다.
naver.init('client id', 'client secret');

// shortURL
naver.shortURL('https://example.com', false);
// https://example.com -> me2.do/xxxxx

// translation
naver.translation('en', 'ko', 'hello', false);
// hello(en) -> 안녕(ko)

// detect Languages
naver.detectLangs('안녕하세요');
// 안녕하세요 -> ko

// romanize
naver.romanization('홍길동', false);
// 홍길동 -> hong gil dong

/* 
 * 아래부턴 서버 응답에 ' 나 " 가 있으면 에러 발생(대부분 정상 작동)
*/

// search Blog
naver.searchBlog('query', 1~100, false);
// query와 관련된 블로그

// search Book
naver.searchBook('query', 1~100, false);
// query와 관련된 책

// Is adult keyword?
naver.searchAdult('query');
// 성인 검색어인지 여부(일반 검색어|성인검색어)

// search Encyc (백과사전)
naver.searchEncyc('query', 1~100, false);
// query와 관련된 사전

// search Movie
naver.searchMovie('query', 1~100, false);
// query와 관련된 영화

// search Cafe Article 
naver.searchMovie('query', 1~100, false);
// query와 관련된 카페 글

// search Kin (지식인)
naver.searchKin('query', 1~100, false);
// query와 관련된 지식인 질문

// search Local 
naver.searchLocal('query', 1~100, false);
// query에 속하는 업체, 기관

// serach Errata (한/영 키를 잘못 설정하고 입력한 검색어를 올바르게 변환)
naver.searchErrata('query');
// 카zk오 -> 카카오

// search Webkr (웹 문서)
naver.searchWebkr('query', 1~100, false);
// query와 관련된 웹 문서

// search Shop
naver.searchShop('query', 1~100, false);
// query 로 검색한 네이버 쇼핑 결과

// search Image
naver.searchImage('query', 1~100, false);
// query 로 검색한 이미지 결과

// search Doc
naver.searchDoc('query', 1~100, false);
// query 로 검색한 전문자료 결과
