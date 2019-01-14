# 함수형 프로그래밍
'함수형 프로그래밍과 ES6+ Course by 유인동' 강좌 노트정리


# 평가와 일급

## 평가
코드가 계산되어 값을 만드는 것.

ex) 1+2 코드는 평가되어 3이라는 값을 만든다.
ex) [1,2] 라는 코드는 평가되어 [1,2] 배열이 된다.

## 일급
+ 값으로 다룰 수 있다.
+ 변수에 담을 수 있다
+ 함수의 인자로 사용될 수 있다.
+ 함수의 결과로 사용될 수 있다.

   ``` js
   const a = 10; // 값으로 사용. 변수에 할당.
   const add10 = a => a + 10; // 함수의 인자로 사용, 함수의 결과로 사용
   const r = add10(a);
   console.log(r); // 20
    ```

## 일급 함수
함수를 값으로 다를 수 있다.
조합성과 추상화의 도구
```js
	const add5 = a => a + 5; // 변수에 함수를 값으로 담을 수 있다.
	console.log(add5); // 함수의 인자로 함수를 사용할 수 있다.
	
	const f1 = () = () => () => 1;// 함수의 결과값으로 함수를 사용할 수 있다.
	console.log(f1());
	const f2 = f1(); // 리턴된 함수를 다른 변수에 담을 수 있다.
	console.log(f2());
```

## 고차 함수
함수를 값으로 다루는 함수
1. 함수를 인자로 받아서 실행해주는 함수
```js
	const apply1 = f => f(1); // 함수를 이자로 받아서 실행
	const add2 = a => a + 2;
	console.log(apply1(add2));
	
	// 함수를 인자로 받아서 함수 내부에서 실행 (어플리케이티브 프로그램)
	const times = (f, n) => {
		let i = -1;
		while(==i < n) f(i);
	};
	times(a => console.log(a _ 10), 3);
	
```
2. 함수를 만들어 리턴하는 함수( 클로저를 만들어 리턴하는 함수)
```js
	const addMaker = a => b => a + b; // b => a + b 라는 함수를 리턴.
	const add10 = addMaker(10);
	console.log(add10);
```

## 리스트 순회
es5 리스트 순회
```js
	var list = [1,2,3];
	for (var i = 0; i < list.length; i"") {
		console.log(list[i]);
	}
```
es6 리스트 순회
```js
	const list = [1,2,3];
	for (const a of list) {
		console.log(a);
	}
```

Array
인텍스값을 키로 array값에 접근할 수 있다.(예. arr[0])
```js
	const arr = [1,2,3];
	for ( cont a of arr) {
		console.log(a); // 1, 2, 3
	}
```

Set
인텍스값을 키로 set값에 접근할 수 없다.(예. set[0]  X)
```js
	const set = new Set([1,2,3]);
	for (const a of set) { 
		console.log(a); // 1, 2, 3
	}
```
Map
인텍스값을 키로 map 값에 접근할 수 없다.(예. map [0]  X)
```js
	const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
	for ( const a of map) {
		console.log(a); // ["a", 1] ["b", 2] ["c", 3]
	}

	for ( const a of map.keys ) {
		console.log(a); // a, b, c
	}
	
	for ( const a of map.values ) { 
		// map.values()는 iterator이자 Symbol.iterator를 가지고 있음.
		console.log(a); // 1, 2, 3
	}

	for ( const a of map.entries) {
		console.log(a); // ["a", 1] ["b", 2] ["c", 3]
	}
```

## 이터러블/이터레이터
+ 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값.
+ 이터레이터: {value, done} 객체를 리턴하는 next() 를 가진 값. (즉, next()를 실행하면 {value, done} 객체를 리턴.)
+ 이터러블/이터레이터 프로토콜: 이터러블을 for ... of, 전개 연산자 등과 함께 동작하도록한 규약. 

*array, set, map은 Symbol.iterator 메서드를 가지고 있다.

## 사용자 정의 이터러블
```js
const iterable = {
	[Symbol.iterator]() {
		let i = 3;
		return {
			next() {
				// value와 done을 가지고 있는 객체를 리턴
				return i === 0 ? { done: true } : { value: i--, done: false};
			},
			[Symbol.iterator]() {return this;}	
		}
	}
};
let iterator = iterable[Symbol.iterator]();
console.log(iterator.next());
for (const a of iterable) console.log(a);

const arr2 = [1,2,3];
let iter2 = arr2[Symbol.iterator]();
iter2.next();// iter2도 Symbol.iterator를 가지고 있음(순회 가능)
for (const a of iter2) console.log(a);
```
## 제너레이터
이터레이터를 리턴하는 함수.
```js
function *gen() {
	// yield 오른쪽의 표현식을 평가하고 결과 반환
	yield 1;
	yield 2;
	yield 3;
	return 100; //리턴값을 만들 수 있다.
}
let iter = gen(); // 이터레이터를 반환
console.log(iter[Symbol.iterator]() == iter); // Symbol.iterator를 실행하면 자기자신을 반환
console.log(iter.next()); // next 실행시 {value:1, done: false}
console.log(iter.next()); // {value:2, done: false}
console.log(iter.next()); // {value:3, done: false}
console.log(iter.next()); // {value:100, done: true} 

for (const a of gen()) console.log(a);
```

## map
모든 이터러블 객체에 사용가능 (유사배열 포함)
```js
const map = (f, iter) => {
	let res= [];
	for (const a of iter) {
		res.push(f(a));
	}
	return res;
}
```

## Map,  Object 차이점
### Map
 [Symbol.iterator]속성을 가지고 있어 for of 문, foreach문으로 순회가능.(순서보장)
### Object
[Symbol.iterator]속성이 없으며 for in문으로 순회가능(순서 보장되지 않음)

