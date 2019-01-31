import React, { Component } from 'react';
import utils from 'lib/util';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const nums = [1, 2, 3, 4, 5];
    const products = [
      {name: '반팔티', price: 15000},
      {name: '긴팔티', price: 20000},
      {name: '핸드폰케이스', price: 30000},
      {name: '바지', price: 25000}
    ];
    const add = (a, b) => a + b;
    console.log('map', utils.map(p => p.name, products));
    console.log('filter', utils.filter(p => p.price < 20000, products));
    console.log('reduce', utils.reduce(add, 0, nums));
    console.log('map filter reduce 중첩',
      utils.reduce(
    		add,
        utils.map(p=> p.price, utils.filter(p => p.price < 20000, products))
      )
    );

    console.log(
      utils.go(
        0,
        a => a +1,
        a => a + 10,
        a => a + 100
      )
    );

    console.log(
      utils.pipe(
        a => a +1,
        a => a + 10,
        a => a + 100
      )
    );

    return (
      <div>
        유틸리티
      </div>
    );
  }
}

export default App;
