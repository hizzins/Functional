import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Root);

// 이 코드는 변화가 발생 했을 때, 모듈 업데이트를 허용해주고, 해당 모듈의 하위 모듈들의 업데이트도 허용해줍니다.
if (module.hot) {
  module.hot.accept('./Root', () => {
    // console.log('Update Root');
    render(Root);
  });
}