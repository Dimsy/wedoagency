import {Map, List, OrderedSet, OrderedMap, fromJS} from 'immutable'

export function arrToOrderedMap(arr, Model){
	return arr.reduce((acc, el) => acc.set(el.menu_order, new Model(el)), new Map({}));
}

export function arrToMap(arr, Model){
	return arr.reduce((acc, el) => acc.set(el.id, new Model(el)), new Map({}));
}

export function arrToOrderedMapDate(arr, Model){
 	return arr.reduce((acc, el) => acc.set(el.acf.date, new Model(el)), Map({}));
}


export function mapToArr(map){
	return Object.keys(map).map(id => map[id])
}

export function arrToOrderedSet(arr, Model){
	return arr.reduce((acc, el) => acc.add(new Model(el)), new OrderedSet([]))
}

