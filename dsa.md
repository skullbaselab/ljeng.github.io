# Data Structures and Algorithms
I do competitive programming and enjoy finding efficient, innovative solutions to data structure and algorithm problems. I have dedicated this page to sharing how I arrived at these solutions.
### [Wildcard Matching](https://leetcode.com/problems/wildcard-matching)
<details markdown="1">
<summary>Problem Statement</summary>
Given an input string (```s```) and a pattern (```p```), implement wildcard pattern matching with support for ```'?'``` and ```'*'```.
```
'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
```
The matching should cover the **entire** input string (not partial).

Notes:
* ```s``` could be empty and contains only lowercase letters ```a-z```.
* ```p``` could be empty and contains only lowercase letters ```a-z```, and characters like ```'?'``` or ```'*'```.

**Example 1:**
<pre>
<b>Input:</b>
s = "aa"
p = "a"
<b>Output:</b> false
Explanation: "a" does not match the entire string "aa".
</pre>
**Example 2:**
<pre>
<b>Input:</b>
s = "aa"
p = "*"
<b>Output:</b> true
Explanation: '*' matches any sequence.
</pre>
**Example 3:**
<pre>
<b>Input:</b>
s = "cb"
p = "?a"
<b>Output:</b> false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
</pre>
**Example 4:**
<pre>
<b>Input:</b>
s = "adceb"
p = "*a*b"
<b>Output:</b> true
Explanation: The first '*' matches the empty sequence, while the second '*' matches the substring "dce".
</pre>
**Example 5:**
<pre>
<b>Input:</b>
s = "acdcb"
p = "a*c?b"
<b>Output:</b> false
</pre>
</details>
<details markdown="1">
<summary>This Python 3 solution's runtime beats 91.74% of submissions.</summary>
In this example, I'll walk through the test case:
```
s = 'mississippi'
p = 'm??*ss*?i*pi'
```
Convert ```s``` and ```p``` into lists so that you can pop them.
```
s = ['m', 'i', 's', 's', 'i', 's', 's', 'i', 'p', 'p', 'i']
p = ['m', '?', '?', '*', 's', 's', '*', '?', 'i', '*', 'p', 'i']
```
If ```s[0] == p[0]```, you could pop the first letters of both strings and get the same result. Likewise, if ```p[0] == '?'```, you could pop the first characters. Continue doing this until you can no longer pop the first characters.
```
s = ['s', 'i', 's', 's', 'i', 'p', 'p', 'i']
p = ['*', 's', 's', '*', '?', 'i', '*', 'p', 'i']
```
Repeat the same process with the other ends of both arrays.
```
s = ['s', 'i', 's', 's', 'i', 'p']
p = ['*', 's', 's', '*', '?', 'i', '*']
```
If ```s``` and ```p``` are both empty, it's a match. If ```s``` is not empty but ```p``` is, it's not a match. If neither ```s``` nor ```p``` is empty, and ```p``` has a character other than ```*``` on either end, it's not a match. If none of these apply, convert ```s``` and ```p``` back into strings so you can use ```split``` and ```re.fullmatch``` on them. Replace all instances of ```?``` in ```p``` with ```.``` for regex matching. Split ```p``` by the ```*```s. If there's more than one ```*``` in a row, they can be merged into one, so we can filter out the empty substrings.
```
s = '*sissip'
p = ['ss', '.i']
```
For each substring in ```p```, we are to find that substring in ```s```. In addition, these substrings must be found in consecutive order and must not overlap.
```'ss'``` exists in ```s``` starting at index 2 and ending at index 3. A match for ```'.i'``` also exists in ```s```, starting at index 3 and ending at index 4. These are consecutive but they overlap, so it's not a match.
```python
import re
def isMatch(s, p):     
	def popBoth(i):
		while s and p and p[i] in ['?', s[i]]:
			s.pop(i)
			p.pop(i)
	s, p = list(s), list(p)
	popBoth(0)
	popBoth(-1)
	if s == p == []: return True
	if s:
		if not p: return False
		if p and not p[0] == p[-1] == '*': return False
	s, p = ''.join(s), [x for x in ''.join(p).replace('?', '.').split('*') if x]
	i = j = 0
	for substring in p:
		for k in range(i + j, len(s)):
			n = len(substring)
			if re.fullmatch(substring, s[k:k + n]):
				i, j = k, n
				break
		else: return False
	return True
```
</details>
### [Permutations](https://leetcode.com/problems/permutations)
<details markdown="1">
<summary>Problem Statement</summary>
Given a collection of distinct integers, return all possible permutations.
<br>
**Example:**
<pre>
<b>Input:</b> [1,2,3]
<b>Output:</b>
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
</pre>
</details>
<details markdown="1">
<summary>This Python 3 solution's runtime beats 99.87% of submissions.</summary>
Python has a built-in permutations iterator.
```python
import itertools
def permute(nums): return list(itertools.permutations(nums))
```
</details>
### [Word Break](https://leetcode.com/problems/word-break)
<details markdown="1">
<summary>Problem Statement</summary>
Given a **non-empty** string *s* and a dictionary *wordDict* containing a list of **non-empty** words, determine if *s* can be segmented into a space-separated sequence of one or more dictionary words.

Notes:
* The same word in the dictionary may be reused multiple times in the segmentation.
* You may assume the dictionary does not contain duplicate words.

**Example 1:**
<pre>
<b>Input:</b> s = "leetcode", wordDict = ["leet", "code"]
<b>Output:</b> true
<b>Explanation:</b> Return true because "leetcode" can be segmented as "leet code".
</pre>
**Example 2:**
<pre>
<b>Input:</b> s = "applepenapple", wordDict = ["apple", "pen"]
<b>Output:</b> true
<b>Explanation:</b> Return true because "applepenapple" can be segmented as "apple pen apple".
             Note that you are allowed to reuse a dictionary word.
</pre>
**Example 3:**
<pre>
<b>Input:</b> s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
<b>Output:</b> false
</pre>
</details>
<details markdown="1">
<summary>This Python 3 solution's runtime beats 98.81% of submissions.</summary>
In this example, I'll walk through the test case:
```
s = 'catsandog'
wordDict = ['cats', 'dog', 'sand', 'and', 'cat']
```
Write a depth-first search function that checks if *s* has a prefix in *wordDict*. 'catsanddog' has two prefixes in ```wordDict```, 'cats' and 'cat.' For each valid prefix, remove that prefix from ```s```, and recursively call ```dfs``` on the remaining suffix. Removing 'cats' from 'catsandog' leaves the suffix 'andog,' so we call ```dfs``` on 'andog'. 'andog' doesn't have a matching prefix, so we move on to 'cat.' Removing 'cat' from 'catsandog' leaves the suffix 'sandog,' so we call ```dfs``` on 'sanddog.' 'sandog' has the matching prefix 'sand'. Removing 'sand' from 'sandog' leaves the suffix 'og,' which doesn't have a matching prefix. Return ```True``` if a suffix matches a prefix in ```wordDict```. Return ```False``` if all possibilities have been explored and a match wasn't found. Use memoization to reduce runtime.
```python
def wordBreak(s, wordDict):
	def dfs(s):
		if s in memo: return memo[s]
		for word in wordDict:
			n = len(word)
			if word == s[:n] and dfs(s[n:]):
				memo[s] = True
				return True
		memo[s] = False
		return False
	memo = {'': True}
	return dfs(s)
```
</details>### [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray)
<details markdown="1">
<summary>Problem Statement</summary>
Given an integer array *nums*, find the contiguous subarray within an array (containing at least one number) which has the largest product.

**Example 1:**
<pre>
<b>Input:</b> [2,3,-2,4]
<b>Output:</b> 6
<b>Explanation:</b> [2,3] has the largest product 6.
</pre>
**Example 2:**
<pre>
<b>Input:</b> [-2,0,-1]
<b>Output:</b> 0
<b>Explanation:</b> The result cannot be 2, because [-2,-1] is not a subarray.
</pre>
</details>
<details markdown="1">
<summary>This Python 3 solution's runtime beats 99.91% of submissions.</summary>
If *A* and *B* are integers and *B* = 0, then *AB* = 0. If *A* and *B* are integers and *B* != 0, then |*AB*| >= |*A*|. The longer the sequence of nonzero integers we multiply, the higher the absolute value of the product will be. But when that sequence is multiplied by 0, the product will become 0. Thus, to maximize the absolute value of the product of a subarray, we start from the beginning of the subarray and continue multiplying until the next number is 0.

In this example, I'll walk through the test case [-2, 0, -1, -4, -3, 0, -2, 0, -4, -3, -2]. First, initialize a variable ```maximum``` to denote the maximum subarray product and set it to the first integer.
```
maximum = -2
```
The subarrays obtained after breaking up the array with 0 as the delimiter are
```
[[-2], [-1, -4, -3], [-2], [-4, -3, -2]]
```
The products of these subarrays are
```
[-2, -12, -2, -24]
```
A negative product can be turned into a positive product if the subarray contains at least one positive integer. The first subarray is [-2]. This can't be turned into a positive product because it doesn't have any positive integers. The next subarray is [-1, -4, -3]. To turn a negative product into a positive product, start from index 0 of the subarray and search rightward until a negative integer is found. We start from index 0 and find -1. Then divide the negative product by all positive integers to the left of this negative integer and the negative integer itself. There are no positive integers to the left of -1, so we just divide -12 by -1 to get 12.
```
a = -12//-1 = 12
```
Then start from the last index of the subarray and search leftward until a negative integer is found. We start from the last index and find -3. Divide the negative product by all positive integers to the right of this negative integer and the negative integer itself. There are no positive integers to the right of -3, so we just divide -12 by -3 to get 4.
```
b = -12//-3 = 4
```
If either ```a``` or ```b``` is greater than ```maximum```, replace ```maximum``` with it.
```
maximum = max(maximum, 12, 4) = max(-2, 12, 4) = 12
```
The next subarray [-2] can't be turned into a positve product. The last subarray is [-4, -3, -2]. Starting from index 0 and searching rightward for a negative number, we get ```a = 6```. Starting from the last index and searching leftward for a negative number, we get ```b = 12```. Neither of these are greater than the current maximum, so return 12.

An edge case where the answer is not ```maximum```is ```nums = [-2,0,-1]```. The split subarrays are ```[-2], [-1]]```. The products of the split subarrays are ```[-2, -1]```, and neither of can be turned positive. At this point, we have ```maximum = -2``` In this edge case, the maximum product is ```max([maximum] + nums)``` because 0 > ```maximum```.
```python
import functools
def maxProduct(nums):
	if len(nums) == 1: return nums[0]
	arr, subarray, maximum = [], [], nums[0]
	for num in nums:
		if num: subarray += [num]
		else:
			arr += [subarray]
			subarray = []
	if subarray: arr += [subarray]
	for subarray in arr:
		product = functools.reduce(lambda x, y: x*y, subarray) if subarray else 0
		if len(subarray) > 1 and product < 0:
			i, n, a = 0, len(subarray), product
			while i < len(subarray) and a < 0:
				a //= subarray[i]
				i += 1
			i, b = n - 1, product
			while i >= 0 and b < 0:
				b //= subarray[i]
				i -= 1
			maximum = max(maximum, a, b)
		else: maximum = max(maximum, product)
	return max([maximum] + nums)
```
</details>
### [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree)
<details markdown="1">
<summary>Problem Statement</summary>
Implement a trie with ```insert```, ```search```, and ```startsWith``` methods.
<br>
**Example:**
```java
Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");   
trie.search("app");     // returns true
```
Notes:
* You may assume that all inputs are consist of lowercase letters ```a-z```.
* All inputs are guaranteed to be non-empty strings.
</details>
<details markdown="1">
<summary>This Python 3 solution's runtime beats 94.93% of submissions.</summary>
<a href="https://leetcode.com/problems/implement-trie-prefix-tree/discuss/58832/AC-JAVA-solution-simple-using-single-array">Implementing a trie</a> would take O(1) time to initialize, O(*k* log *n*) time for ```insert```, O(*k*) time for ```search```, and O(*k*) time for ```startsWith```, where *k* is the number of letters in the word or prefix. I've written an accepted solution where I've used a single array instead of implementing an actual trie that takes O(1) time to initialize, O(*n*) time for ```insert```, O(log *n*) time for ```search``` and O(*k* + log *n*) time for ```startsWith```.
An empty array is initialized.
```python
>>> trie = Trie()
```
```python
self.arr = []
```
Words are inserted in alphabetical order. ```insert``` searches for the insertion point using binary search, then inserts the word.
```python
>>> trie.insert('hello')
```
```python
self.arr = ['hello']
```
```search``` looks for the bisection point using binary search and checks if the word at the bisection point matches the target word.
```python
>>> trie.search('hell')
```
The bisection point of 'hell' is 0 but index 0 of ```self.arr``` isn't 'hell', so return ```False```.
```python
>>> trie.search('helloa')
```
The bisection point of 'helloa' is 1 but index 1 is out of bounds, so return ```False```.
```python
>>> trie.search('hello')
```
The bisection point of 'hello' is 0 and index 0 of ```self.arr``` matches the word, so return ```True```.
```startsWith``` looks for the bisection point using binary search and checks if the word at the bisection point starts with the prefix.
```python
>>> trie.startsWith('hell')
```
The bisection point of 'hell' is 0 and index 0 of ```self.arr``` starts with 'hell', so return ```True```.
```python
>>> trie.startsWith('helloa')
```
The bisection point of 'helloa' is 1 but index 1 is out of bounds, so return ```False```.
```python
>>> trie.startsWith('hello')
```
The bisection point of 'hello' is 0 and index 0 of ```self.arr``` starts with 'hello', so return ```True```.
Although this solution uses more memory, in seconds it's much faster than the solution with the trie, and it's also something different that I wanted to share.
```python
import bisect
class Trie:
	def __init__(self): self.arr = []
	def insert(self, word): bisect.insort(self.arr, word)
	def search(self, word):
		try: return self.arr[bisect.bisect_left(self.arr, word)] == word
		except IndexError: return False
	def startsWith(self, prefix):
		try: word, n = self.arr[bisect.bisect_left(self.arr, prefix)], len(prefix)
		except IndexError: return False
		return len(word) >= n and word[:n] == prefix
```
</details>
### [Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii)
<details markdown="1">
<summary>Problem Statement</summary>
Implement a basic calculator to evaluate a simple expression string.
The expression string contains only non-negative integers, ```+```, ```-```, ```*```, ```/``` operators and empty spaces ``` ```. The integer division should truncate toward zero.
<br>
**Example 1:**
<pre>
<b>Input:</b> "3+2*2"
<b>Output:</b> 7
</pre>
**Example 2:**
<pre>
<b>Input:</b> " 3/2 "
<b>Output:</b> 1
</pre>
**Example 3:**
<pre>
<b>Input:</b> " 3+5 / 2 "
<b>Output:</b> 5
</pre>
Notes:
* You may assume that the given expression is always valid.
* Do not use the ```eval``` built-in library function.
</details>
<details markdown="1">
<summary>This Python 3 solution's runtime beats 99.85% of submissions.</summary>
In this example, I'll walk through the test case ```s = '876-142-978*2/8+4/2*2+40*2+282/2-137+855'```. PEMDAS tells us to multiply and divide before we add and subtract, so split the string by ```+``` and ```-```.
```s.replace('-', '+-').split('+') = ['876', '-142', '-978*2/8', '4/2*2', '40*2', '282/2', '-137', '855']```
Write a recursive function ```multDiv``` that evaluates a string containing only numbers and the operations ```*``` and ```/```. The string could also start with ```-``` to denote a negative result. If a string doesn't contain ```*``` and ```/```, convert that number into an integer.
```multDiv('876') = 876```
If the string contains ```*``` but not ```/```, return the product of each integer it splits into.
```multDiv('40*2') = 40*2 = 80```
If the string contains ```/``` but not ```*```, iteratively divide the integers it splits into starting from the left. Divide the leftmost number, the quotient, by the next number, to get a new quotient. Then divide that number by the next number, and so on. The quotients should truncate toward zero. This isn't built-in, so write a helper function ```divide``` that does that.
```multDiv('282/2') = divide(282, 2) = 141```
If a string contains both ```*``` and ```/```, recursively evaluate the expression starting from the left. To do this, split the expression at the rightmost operator.
```s = '-978*2/8'```
```a = '-978*2'```
```b = '8'```
Recursively call ```multDiv``` on ```a```, then use the appropriate operation on ```a``` and ```b```.
```multDiv('-978*2') = -1956```
```multDiv('-978*2/8') = divide(-1956, 8) = -244```
Repeat the same process for the rest of the array, then find the sum.
```[multDiv(x) for x in s.replace('-', '+-').split('+')] = [876, -142, -244, 4, 80, 141, -137, 855]```
```sum([876, -142, -244, 4, 80, 141, -137, 855]) = 1433```
```python
import functools
def divide(x, y):
    a, b = int(x), int(y)
    quotient = a//b
    if a*b < 0 and a%b: quotient += 1
    return quotient
def multDiv(s):
    if '*' in s:
	if '/' in s:
	    i = len(s) - 1
	    while s[i] not in ['*', '/']: i -= 1
	    a, b = int(multDiv(s[:i])), int(s[i + 1:])
	    return a*b if s[i] == '*' else divide(a, b)
	else: return functools.reduce(lambda x, y: int(x)*int(y), s.split('*'))
    return functools.reduce(divide, s.split('/')) if '/' in s else int(s)
def calculate(s): return sum([multDiv(x) for x in s.replace('-', '+-').split('+')])
```
</details>
### [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings)
<details markdown="1">
<summary>Problem Statement</summary>
Given a string, your task is to count how many palindromic substrings in this string.
	
The substrings with different start indexes or end indexes are counted as different substrings even they consist of same characters.
<br>
**Example 1**:
<pre>
<b>Input:</b> "abc"
<b>Output:</b> 3
<b>Explanation:</b> Three palindromic strings: "a", "b", "c".
</pre>
**Example 2:**
<pre>
<b>Input:</b> "aaa"
<b>Output:</b> 6
<b>Explanation:</b> Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
</pre>
Note: The input string length won't exceed 1000.
</details>
<details markdown="1">
<summary>This Python 3 solution's runtime beats 90.03% of submissions.</summary>
An odd-length palindrome has a center character that is a palindrome. ```s = 'bedededeb'``` is an odd-length palindrome with center character 'd' at index 4. If you radiate outward, you find that the letters on opposite sides of the center are always the same:
```
s[3] = s[5] = 'e'
s[2] = s[6] = 'd'
s[1] = s[7] = 'e'
s[0] = s[8] = 'b'
```
An even-length palindrome has two center characters that are identical, which makes a palindrome. ```s = 'deaaaaed'``` is an even-length palindrome with center characters 'a' at indices 3 and 4. If you radiate outward, you find that the letters on opposite sides of the center are always the same:
```
s[2] = s[5] = 'a'
s[1] = s[6] = 'e'
s[0] = s[7] = 'd'
```
In this example, I'll walk through the test case ```s = 'leet'```.
Iterate through the string. Each character is the center of an odd-length palindrome. Radiate outward until the index is out of bounds or the substring is no longer a palindrome. Every time a palindrome is found, increment the counter. 'l' is a palindrome, and there's nothing to the left of 'l'. 'e' is palindrome, but 'lee' isn't. 'e' is a palindrome, but 'eet' isn't. 't' is a palindrome, and there's nothing to the right of 't'. There are 4 odd-length palindromes. Iterate through the string again. Each pair of characters may or may not be the center of an even-length palindrome. Do the same as before, except this time look for even-length palindromes. 'le' isn't a palindrome. 'ee' is a palindrome but 'leet' isn't. 'et' isn't a palindrome. There's 1 even-length palindrome. Add up the number of odd-length and even-length palindromes to get 5. We could combine the odd-length and even-length palindrome searching functions into a single function that takes ```(i, i)``` for odd-length palindromes and ```(i, j)``` for even-length palindromes.
```python
def countSubstrings(s):
	def fromCenter(i, j):
		counter = 0
		while i >= 0 and j < n and s[i] == s[j]:
			counter += 1
			i -= 1
			j += 1
		return counter
	n = len(s)
	return sum([fromCenter(i, i) + fromCenter(i, i + 1) for i in range(n)])
```
</details>
