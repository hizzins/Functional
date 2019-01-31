/**
 * functional util
 * @Author Shin Hee Jin (hizzin413@gmail.com)
 */

const map = (f, iter) => {
  let res= [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
}

const filter = (f, iter) => {
	let res = [];
	for (const a of iter) {
		if (f(a)) res.push(a);
	}
	return res;
}

const reduce = (f, acc, iter) => {
	// reduce(add, [1,2,3,4,5]로 호출시에도 작동
	if (!iter) {
		iter= acc[Symbol.iterator]();
		acc = iter.next().value;
	}
	for (const a of iter) {
		acc = f(acc, a);
	}
	return acc;
}

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = () => {

}

export default {
  map,
  filter,
  reduce,
	go,
	pipe
}