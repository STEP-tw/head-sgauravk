
### lib.js

long file lib.js
- [x] parsing related function, error handelling relative function, formating related functions should have separated files not in lib.js 
- [x] extractBytes, extractLines can be one single function. 
- [x] line-15 : bad function name, bad variable name
- [x] line -16 : bad variable name list
- [x] line-23 : poor function naming, complex logic, bad variable names in function
- [x] line-40 : poor function name, unnecessory abbreviation, function has bad logic.
- [x] line 41 : poor variable naming
- [x] line 51 : misleading function name. complex logic
- [x] line 64 : bad function name, It doing too much, other fucntions can be extracted from it.
- [x] line 78 to end : head and tail can be a single file. headReducer and tailReducer can be a single file. 
- [x] head, tail are doing too much
- [x] error handeling should not be in lib
- [x] output model of lib can be array of objects. that can be further formated by some other file
- [x] line 131 : can be written in a batter way, so that it easy to understand
- [x] type can have better name
- [x] length can have better name


### libTest.js

file name should be in cammel case 
- [x] line 35 : error in it message.
- [ ] line 38 : for 1 line and more than 1 should be in different it block
- [x] line 43, 85, 90, 105 : redundent test
- [x] line 65 : bad it message 
- [ ] line 67, 80, 99, 104, 113, 114 : should have different it block
- [x] line 84 : misleading it message
- [x] missing test :extract error should have test related to capital letter as error
- [ ] missing test in head-for single file : 
- [ ]   1.for special character as option
- [ ]   2.for capital letter as option
- [x]   3.for options like -nt 10 
- [x]   4.for 0 count
- [x] all head and tail tests should be in one describe block
- [ ]  -in it, blocks for single, inside it- for correct inputs, for erroneous inputs etc ...
