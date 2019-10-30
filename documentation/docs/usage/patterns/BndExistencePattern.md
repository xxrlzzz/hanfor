<!-- Auto generated file, do not make any changes here. -->

## BndExistencePattern

### BndExistencePattern Globally
```
Globally, transitions to states in which "Q" holds occur at most twice
```
```
true;⌈Q⌉;⌈!Q⌉;⌈Q⌉;⌈!Q⌉;⌈Q⌉;true
```
![](../../img/patterns/BndExistencePattern_Globally.svg)
### BndExistencePattern Before
```
Before "Q", transitions to states in which "R" holds occur at most twice
```
```
⌈!Q⌉;⌈(!Q && R)⌉;⌈(!Q && !R)⌉;⌈(!Q && R)⌉;⌈(!Q && !R)⌉;⌈(!Q && R)⌉;true
```
![](../../img/patterns/BndExistencePattern_Before.svg)
### BndExistencePattern After
```
After "Q", transitions to states in which "R" holds occur at most twice
```
```
true;⌈Q⌉;true;⌈R⌉;⌈!R⌉;⌈R⌉;⌈!R⌉;⌈R⌉;true
```
![](../../img/patterns/BndExistencePattern_After.svg)
### BndExistencePattern Between
```
Between "Q" and "R", transitions to states in which "S" holds occur at most twice
```
```
true;⌈(Q && !R)⌉;⌈!R⌉;⌈(!R && S)⌉;⌈(!R && !S)⌉;⌈(!R && S)⌉;⌈(!R && !S)⌉;⌈(!R && S)⌉;⌈!R⌉;⌈R⌉;true
```
![](../../img/patterns/BndExistencePattern_Between.svg)
### BndExistencePattern AfterUntil
```
After "Q" until "R", transitions to states in which "S" holds occur at most twice
```
```
true;⌈(Q && !R)⌉;⌈!R⌉;⌈(!R && S)⌉;⌈(!R && !S)⌉;⌈(!R && S)⌉;⌈(!R && !S)⌉;⌈(!R && S)⌉;⌈!R⌉;true
```
![](../../img/patterns/BndExistencePattern_AfterUntil.svg)