<a name="module_prop"></a>

## prop
`npm install prop-ops`

`prop-ops` assists in performing CRUD operations on javascript objects and arrays
in an uncertain world. `prop-ops` operates in an immutable way by default, with the
option of transforming objects in place

**Authors**: [Matthew Meyers](https://github.com/mgmeyers), [Sunyoung Kim](https://github.com/SunyoungKim508)  
**License**: MIT  

* [prop](#module_prop)
    * [.get(obj, propString, [fallBack])](#module_prop.get) ⇒ <code>Any</code>
    * [.set(obj, propString, value)](#module_prop.set) ⇒ <code>Object</code> \| <code>Array</code>
        * [.mutate(obj, propString, value)](#module_prop.set.mutate)
    * [.has(obj, propString)](#module_prop.has) ⇒ <code>Boolean</code>
    * [.del(obj, propString)](#module_prop.del) ⇒ <code>Object</code>
        * [.mutate(obj, propString)](#module_prop.del.mutate)

<a name="module_prop.get"></a>

### prop.get(obj, propString, [fallBack]) ⇒ <code>Any</code>
Safely access deeply nested properties of unstructured objects

**Kind**: static method of [<code>prop</code>](#module_prop)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> |  | the object or array to traverse |
| propString | <code>String</code> |  | the path to the desired property |
| [fallBack] | <code>Any</code> | <code></code> | a fall back value to return if the property is not found |

**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: { b: 'c' } }
prop.get(objA, 'a.b')
// > 'c'

// Specify a value to return if a property is not found
prop.get(objA, 'a.nope')
// > null
prop.get(objA, 'a.nope', 24)
// > 24

// Traverse an array
const objB = { a: [{ b: 'c' }] }
prop.get(objB, 'a.[0].b')
// > 'c'
```
<a name="module_prop.set"></a>

### prop.set(obj, propString, value) ⇒ <code>Object</code> \| <code>Array</code>
Sets deeply nested object properties. `set` will generate objects (or arrays)
to reach the final destination of the input path

**Kind**: static method of [<code>prop</code>](#module_prop)  
**Returns**: <code>Object</code> \| <code>Array</code> - an updated version of the `obj`  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | the object or array to traverse |
| propString | <code>String</code> | the path to the desired property |
| value | <code>Any</code> | the value to set |

**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: { b: 'c' } }
const updatedA = prop.set(objA, 'a.c', 'd')
// > objA     == { a: { b: 'c' } }
// > updatedA == { a: { b: 'c', c: 'd' } }
```
<a name="module_prop.set.mutate"></a>

#### set.mutate(obj, propString, value)
Like `set`, but will modify the original object

**Kind**: static method of [<code>set</code>](#module_prop.set)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> \| <code>Array</code> | the object or array to traverse |
| propString | <code>String</code> | the path to the desired property |
| value | <code>Any</code> | the value to set |

**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: { b: 'c' } }
prop.setMutable(objA, 'a.c', 'd')
// Also: prop.set.mutate(objA, 'a.c', 'd')
// > objA == { a: { b: 'c', c: 'd' } }

const emptyObj = {}
prop.setMutable(emptyObj, 'a.[0].b.c', 12)
// > emptyObj == { a: [{ b: { c: 12 } }] }
```
<a name="module_prop.has"></a>

### prop.has(obj, propString) ⇒ <code>Boolean</code>
Check if an object or array has a property

**Kind**: static method of [<code>prop</code>](#module_prop)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to traverse |
| propString | <code>String</code> | the path to the desired property |

**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: [{ b: { c: 'd' } }] }
prop.has(objA, 'a.b')
// > false
prop.has(objA, 'a.[0].b.c')
// > true
```
<a name="module_prop.del"></a>

### prop.del(obj, propString) ⇒ <code>Object</code>
Deletes deeply nested object properties

**Kind**: static method of [<code>prop</code>](#module_prop)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to traverse |
| propString | <code>String</code> | the path to the desired property |

**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: { b: { c: 'd' } } }
const updatedA = prop.del(objA, 'a.b')
// > objA     == { a: { b: { c: 'd' } } }
// > updatedA == { a: {} }
```
<a name="module_prop.del.mutate"></a>

#### del.mutate(obj, propString)
Like `del`, but will modify the original object

**Kind**: static method of [<code>del</code>](#module_prop.del)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object to traverse |
| propString | <code>String</code> | the path to the desired property |

**Example**  
```js
import * as prop from 'prop-ops'

const objA = { a: [{ b: { c: 'd' } }] }
prop.delMutable(objA, 'a.b')
// Also: prop.del.mutate(objA, 'a.b')
// noop
prop.delMutable(objA, 'a.[0].b')
// objA == { a: [{}] }
```
