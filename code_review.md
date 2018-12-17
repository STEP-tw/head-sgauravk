
### lib.js

long file lib.js
- [ ] parsing related function, error handelling relative function, formating related functions should have separated files not in lib.js 
- [ ] extractBytes, extractLines can be one single function. 
- [ ] line-15 : bad function name, bad variable name
- [ ] line -16 : bad variable name list
- [ ] line-23 : poor function naming, complex logic, bad variable names in function
- [ ] line-40 : poor function name, unnecessory abbreviation, function has bad logic.
- [ ] line 41 : poor variable naming
- [ ] line 51 : misleading function name. complex logic
- [ ] line 64 : bad function name, It doing too much, other fucntions can be extracted from it.
- [ ] line 78 to end : head and tail can be a single file. headReducer and tailReducer can be a single file. 
- [ ] head, tail are doing too much
- [ ] error handeling should not be in lib
- [ ] output model of lib can be array of objects. that can be further formated by some other file
- [ ] line 131 : can be written in a batter way, so that it easy to understand
- [ ] type can have better name
- [ ] length can have better name


### lib_test.js
file name should be in cammel case 
- [ ] line 35 : error in it message.
- [ ] line 38 : for 1 line and more than 1 should be in different it block
- [ ] line 43, 85, 90, 105 : redundent test
- [ ] line 65 : bad it message 
- [ ] line 67, 80, 99, 104, 113, 114 : should have different it block
- [ ] line 84 : misleading it message
- [ ] missing test :extract error should have test related to capital letter as error
- [ ] missing test in head-for single file : 
- [ ]   1.for special character as option
- [ ]   2.for capital letter as option
- [ ]   3.for options like -nt 10 
- [ ]   4.for 0 count
- [ ] all head and tail tests should be in one describe block
- [ ]  -in it, blocks for single, inside it- for correct inputs, for erroneous inputs etc ...
