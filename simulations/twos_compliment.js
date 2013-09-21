(function() {
/**
Two's Compliment is a mathematical operation on binary numbers,
as well as a binary signed number representation based on this operation.
Its wide use in computing makes it the most important example of a
radix complement.

The two's complement of an N-bit number is defined as the complement with
respect to 2N, in other words the result of subtracting the number from 2N.
This is also equivalent to taking the ones' complement and then adding one,
since the sum of a number and its ones' complement is all 1 bits.
The two's complement of a number behaves like the negative of the original
number in most arithmetic, and positive and negative numbers can coexist in
a natural way.

https://en.wikipedia.org/wiki/Two%27s_complement

binary      unsigned    2's compliment
0111 1111   127         127
0111 1110   126         126
0000 0000   0           0
1111 1111   255         -1

1000 0010   130         -126
1000 0000   128         -128


To make the 2s complient
* xor number
* add 1
* subtract from 0

100 (4)
011
100
-4

to get the signed value
* xor numer
* add 1
* subtract from 0

11111111
00000000
00000001
-1 decimal

10000010 (130)
01111101
01111110
- 126
 */



})();