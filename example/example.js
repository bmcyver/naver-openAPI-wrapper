// 자세한 API의 사용방법은 https://developers.naver.com 을 참고하세요.

const naverAPI = require('naver-openAPI-wrapper');
const naver = new naverAPI();
naver.init('your client id', 'your client key');

// shortURL(string)
naver.shortURL('URL', false);

// translation(string)
naver.translation('source', 'target', 'text', false);

// detect Languages(string)
naver.detectLangs('text');

// romanize(object)
naver.romanization('text', false);
