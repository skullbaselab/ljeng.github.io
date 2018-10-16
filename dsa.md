<dl>
	<table>
		<tr>
			<td width="25%"><a href = "/index.md">Home</a></td>
			<td width="25%"><a href = "/resume.md">Résumé</a></td>
			<td width="25%"><a href = "/projects.md">Projects</a></td>
			<td width="25%"><a href = "/dsa.md">Data Structures and Algorithms</a></td>
		</tr>
	</table>
</dl>
# Data Structures and Algorithms
I enjoy finding creative, efficient solutions to data structure and algorithm problems, particularly ones that very few people have thought of previously. I have dedicated this page to sharing my most innovative solutions with you.
### [Wildcard Matching](https://leetcode.com/problems/wildcard-matching)
<details>
<summary>Problem Statement</summary>
Given an input string (<code>s</code>) and a pattern (<code>p</code>), implement wildcard pattern matching with support for <code>'?'</code> and <code>'*'</code>.
<pre>
'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
</pre>
The matching should cover the <b>entire</b> input string (not partial).

Notes:
<ul>
<li><code>s</code> could be empty and contains only lowercase letters <code>a-z</code>.</li>
<li><code>p</code> could be empty and contains only lowercase letters <code>a-z</code>, and characters like <code>'?'</code> or <code>'*'</code>.</li>
</ul>
<b>Example 1:</b>
<pre>
<b>Input:</b>
s = "aa"
p = "a"
<b>Output:</b> false
Explanation: "a" does not match the entire string "aa".
</pre>
<b>Example 2:</b>
<pre>
<b>Input:</b>
s = "aa"
p = "*"
<b>Output:</b> true
Explanation: '*' matches any sequence.
</pre>
<b>Example 3:</b>
<pre>
<b>Input:</b>
s = "cb"
p = "?a"
<b>Output:</b> false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
</pre>
<b>Example 4:</b>
<pre>
<b>Input:</b>
s = "adceb"
p = "*a*b"
<b>Output:</b> true
Explanation: The first '*' matches the empty sequence, while the second '*' matches the substring "dce".
</pre>
<b>Example 5:</b>
<pre>
<b>Input:</b>
s = "acdcb"
p = "a*c?b"
<b>Output:</b> false
</pre>
</details>
<details>
<summary>This Python 3 solution's runtime beats 93.83% of submissions.</summary>
In this example, I'll walk through the test case:
<pre>s = 'mississippi'</pre>
<pre>p = 'm??*ss*?i*pi'</pre>
Convert <code>s</code> and <code>p</code> into lists so that you can pop them.
<pre>
s = ['m', 'i', 's', 's', 'i', 's', 's', 'i', 'p', 'p', 'i']
p = ['m', '?', '?', '*', 's', 's', '*', '?', 'i', '*', 'p', 'i']
</pre>
If <code>s[0] == p[0]</code>, you could pop the first letters of both strings and get the same result. Likewise, if <code>p[0] == '?'</code>, you could pop the first characters. Continue doing this until you can no longer pop the first characters.
<pre>
s = ['s', 'i', 's', 's', 'i', 'p', 'p', 'i']
p = ['*', 's', 's', '*', '?', 'i', '*', 'p', 'i']
</pre>
Repeat the same process with the other ends of both arrays.
<pre>
s = ['s', 'i', 's', 's', 'i', 'p']
p = ['*', 's', 's', '*', '?', 'i', '*']
</pre>
If <code>s</code> and <code>p</code> are both empty, it's a match. If <code>s</code> is not empty but <code>p</code> is, it's not a match. If neither <code>s</code> nor <code>p</code> is empty, and <code>p</code> has a character other than <code>*</code> on either end, it's not a match. If none of these apply, convert <code>s</code> and <code>p</code> back into strings so you can use <code>split</code> and <code>re.fullmatch</code> on them. Replace all instances of <code>?</code> in <code>p</code> with <code>.</code> for regex matching. Split <code>p</code> by the <code>*</code>s. If there's more than one <code>*</code> in a row, they can be merged into one, so we can filter out the empty substrings.
<pre>
s = '*sissip'
p = ['ss', '.i']
</pre>
For each substring in <code>p</code>, we are to find that substring in <code>s</code>. In addition, these substrings must be found in consecutive order and must not overlap.
<code>'ss'</code> exists in <code>s</code> starting at index 2 and ending at index 3. A match for <code>'.i'</code> also exists in <code>s</code>, starting at index 3 and ending at index 4. These are consecutive but they overlap, so it's not a match.
<pre>   
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
</pre>
</details>
### [Permutations](https://leetcode.com/problems/permutations)
<details>
<summary>Problem Statement</summary>
Given a collection of distinct integers, return all possible permutations.
<br>
<b>Example:</b>
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
<details>
<summary>This Python 3 solution's runtime beats 100.00% of submissions.</summary>
Python has a built-in permutations iterator.
<pre>
def permute(nums): return list(itertools.permutations(nums))
</pre>
</details>
### [Word Break](https://leetcode.com/problems/word-break)
<details>
<summary>Problem Statement</summary>
Given a <b>non-empty</b> string <i>s</i> and a dictionary <i>wordDict</i> containing a list of <b>non-empty</b> words, determine if <i>s</i> can be segmented into a space-separated sequence of one or more dictionary words.

Notes:
<ul>
<li>The same word in the dictionary may be reused multiple times in the segmentation.</li>
<li>You may assume the dictionary does not contain duplicate words.</li>
</ul>
<b>Example 1:</b>
<pre>
<b>Input:</b> s = "leetcode", wordDict = ["leet", "code"]
<b>Output:</b> true
<b>Explanation:</b> Return true because "leetcode" can be segmented as "leet code".
</pre>
<b>Example 2:</b>
<pre>
<b>Input:</b> s = "applepenapple", wordDict = ["apple", "pen"]
<b>Output:</b> true
<b>Explanation:</b> Return true because "applepenapple" can be segmented as "apple pen apple".
             Note that you are allowed to reuse a dictionary word.
</pre>
<b>Example 3:</b>
<pre>
<b>Input:</b> s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
<b>Output:</b> false
</pre>
</details>
<details>
<summary>This Python 3 solution's runtime beats 99.82% of submissions.</summary>
In this example, I'll walk through the test case:
<pre>s = 'catsandog'</pre>
<pre>wordDict = ['cats', 'dog', 'sand', 'and', 'cat']</pre>
Write a depth-first search function that checks if <i>s</i> has a prefix in <i>wordDict</i>. 'catsanddog' has two prefixes in <code>wordDict</code>, 'cats' and 'cat.' For each valid prefix, remove that prefix from <code>s</code>, and recursively call <code>dfs</code> on the remaining suffix. Removing 'cats' from 'catsandog' leaves the suffix 'andog,' so we call <code>dfs</code> on 'andog'. 'andog' doesn't have a matching prefix, so we move on to 'cat.' Removing 'cat' from 'catsandog' leaves the suffix 'sandog,' so we call <code>dfs</code> on 'sanddog.' 'sandog' has the matching prefix 'sand'. Removing 'sand' from 'sandog' leaves the suffix 'og,' which doesn't have a matching prefix. Return <code>True</code> if a suffix matches a prefix in <code>wordDict</code>. Return <code>False</code> if all possibilities have been explored and a match wasn't found. Use memoization to reduce runtime.
<pre>
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
</pre>
</details>
### [Maximum Gap](https://leetcode.com/problems/maximum-gap)
<details>
<summary>Problem Statement</summary>
Given an unsorted array, find the maximum difference between the successive elements in its sorted form.

Return 0 if the array contains less than 2 elements.
<br>
<b>Example 1:</b>
<pre>
<b>Input:</b> [3,6,9,1]
<b>Output:</b> 3
<b>Explanation:</b> The sorted form of the array is [1,3,6,9].
             Either (3,6) or (6,9) has the maximum difference 3.
</pre>
<b>Example 2:</b>
<pre>
<b>Input:</b> [10]
<b>Output:</b> 0
<b>Explanation:</b> The array contains less than 2 elements, therefore return 0.
</pre>
Notes:
<ul>
<li>You may assume all elements in the array are non-negative integers and fit in the 32-bit signed integer range.</li>
<li>Try to solve it in linear time/space.</li>
</ul>
</details>
<details>
<summary>This Python 3 solution's runtime beats 96.08% of submissions.</summary>
I interpret "Try to solve it in linear time/space" as "linear time <i>or</i> space." If this is the case, <code>nums.sort()</code> takes O(<i>n</i> log <i>n</i>) time but only O(<i>n</i>) space, so we could sort it and then find the maximum gap between the sorted values.
<pre>
def maximumGap(nums):
	nums.sort()
	return max([0] + [nums[i] - nums[i - 1] for i in range(1, len(nums))])
</pre>
If we interpret "Try to solve it in linear time/space" as "linear time <i>and</i> space," we could use radix sort instead of the built-in timsort.
</details>
### [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree)
<details>
<summary>Problem Statement</summary>
Implement a trie with <code>insert</code>, <code>search</code>, and <code>startsWith</code> methods.
<br>
<b>Example:</b>
<pre>
Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");   
trie.search("app");     // returns true
</pre>
Notes:
<ul>
<li>You may assume that all inputs are consist of lowercase letters <code>a-z</code>.</li>
<li>All inputs are guaranteed to be non-empty strings.</li>
</ul>
</details>
<details>
<summary>This Python 3 solution's runtime beats 100.00% of submissions.</summary>
<a href="https://leetcode.com/problems/implement-trie-prefix-tree/discuss/58832/AC-JAVA-solution-simple-using-single-array">Implementing a trie</a> would take O(1) time to initialize, O(<i>k</i> log <i>n</i>) time for <code>insert</code>, O(<i>k</i>) time for <code>search</code>, and O(<i>k</i>) time for <code>startsWith</code>, where <i>k</i> is the number of letters in the word or prefix. I've written an accepted solution where I've used a single array instead of implementing an actual trie that takes O(1) time to initialize, O(<i>n</i>) time for <code>insert</code>, O(log <i>n</i>) time for <code>search</code> and O(<i>k</i> + log <i>n</i>) time for <code>startsWith</code>.
An empty array is initialized.
<pre>>>> trie = Trie()</pre>
<pre>self.arr = []</pre>
Words are inserted in alphabetical order. <code>insert</code> searches for the insertion point using binary search, then inserts the word.
<pre>>>> trie.insert('hello')</pre>
<pre>self.arr = ['hello']</pre>
<code>search</code> looks for the bisection point using binary search and checks if the word at the bisection point matches the target word.
<pre>>>> trie.search('hell')</pre>
The bisection point of 'hell' is 0 but index 0 of <code>self.arr</code> isn't 'hell', so return <code>False</code>.
<pre>>>> trie.search('helloa')</pre>
The bisection point of 'helloa' is 1 but index 1 is out of bounds, so return <code>False</code>.
<pre>>>> trie.search('hello')</pre>
The bisection point of 'hello' is 0 and index 0 of <code>self.arr</code> matches the word, so return <code>True</code>.
<code>startsWith</code> looks for the bisection point using binary search and checks if the word at the bisection point starts with the prefix.
<pre>>>> trie.startsWith('hell')</pre>
The bisection point of 'hell' is 0 and index 0 of <code>self.arr</code> starts with 'hell', so return <code>True</code>.
<pre>>>> trie.startsWith('helloa')</pre>
The bisection point of 'helloa' is 1 but index 1 is out of bounds, so return <code>False</code>.
<pre>>>> trie.startsWith('hello')</pre>
The bisection point of 'hello' is 0 and index 0 of <code>self.arr</code> starts with 'hello', so return <code>True</code>.
Although this solution uses more memory, in seconds it's much faster than the solution with the trie, and it's also something different that I wanted to share.
<pre>
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
</pre>
</details>
### [Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii)
<details>
<summary>Problem Statement</summary>
Implement a basic calculator to evaluate a simple expression string.
The expression string contains only non-negative integers, <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> operators and empty spaces<code> </code>. The integer division should truncate toward zero.
<br>
<b>Example 1:</b>
<pre>
<b>Input:</b> "3+2*2"
<b>Output:</b> 7
</pre>
<b>Example 2:</b>
<pre>
<b>Input:</b> " 3/2 "
<b>Output:</b> 1
</pre>
<b>Example 3:</b>
<pre>
<b>Input:</b> " 3+5 / 2 "
<b>Output:</b> 5
</pre>
Notes:
<ul>
<li>You may assume that the given expression is always valid.</li>
<li>Do not use the <code>eval</code> built-in library function.</li>
</ul>
</details>
<details>
<summary>This Python 3 solution's runtime beats 100.00% of submissions.</summary>
In this example, I'll walk through the test case <code>s = '876-142-978*2/8+4/2*2+40*2+282/2-137+855'</code>. PEMDAS tells us to multiply and divide before we add and subtract, so split the string by <code>+</code> and <code>-</code>.
<pre>s.replace('-', '+-').split('+') = ['876', '-142', '-978*2/8', '4/2*2', '40*2', '282/2', '-137', '855']</pre>
Write a recursive function <code>multDiv</code> that evaluates a string containing only numbers and the operations <code>*</code> and <code>/</code>. The string could also start with <code>-</code> to denote a negative result. If a string doesn't contain <code>*</code> and <code>/</code>, convert that number into an integer.
<pre>multDiv('876') = 876</pre>
If the string contains <code>*</code> but not <code>/</code>, return the product of each integer it splits into.
<pre>multDiv('40*2') = 40*2 = 80</pre>
If the string contains <code>/</code> but not <code>*</code>, iteratively divide the integers it splits into starting from the left. Divide the leftmost number, the quotient, by the next number, to get a new quotient. Then divide that number by the next number, and so on. The quotients should truncate toward zero. This isn't built-in, so write a helper function <code>divide</code> that does that.
<pre>multDiv('282/2') = divide(282, 2) = 141</pre>
If a string contains both <code>*</code> and <code>/</code>, recursively evaluate the expression starting from the left. To do this, split the expression at the rightmost operator.
<pre>s = '-978*2/8'</pre>
<pre>a = '-978*2'</pre>
<pre>b = '8'</pre>
Recursively call <code>multDiv</code> on <code>a</code>, then use the appropriate operation on <code>a</code> and <code>b</code>.
<pre>multDiv('-978*2') = -1956</pre>
<pre>multDiv('-978*2/8') = divide(-1956, 8) = -244</pre>
Repeat the same process for the rest of the array, then find the sum.
<pre>[multDiv(x) for x in s.replace('-', '+-').split('+')] = [876, -142, -244, 4, 80, 141, -137, 855]</pre>
<pre>sum([876, -142, -244, 4, 80, 141, -137, 855]) = 1433</pre>
<pre>
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
    if '/' in s: return functools.reduce(divide, s.split('/'))
    else: return int(s)
def calculate(s): return sum([multDiv(x) for x in s.replace('-', '+-').split('+')])
</pre>
</details>
### [Number of Digit One](https://leetcode.com/problems/number-of-digit-one)
<details>
<summary>Problem Statement</summary>
Given an integer <i>n</i>, count the total number of digit 1 appearing in all non-negative integers less than or equal to <i>n</i>.
<br>
<b>Example:</b>
<pre>
<b>Input:</b> 13
<b>Output:</b> 6 
<b>Explanation:</b> Digit 1 occurred in the following numbers: 1, 10, 11, 12, 13.
</pre>
</details>
### [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings)
<details>
<summary>Problem Statement</summary>
Given a string, your task is to count how many palindromic substrings in this string.
	
The substrings with different start indexes or end indexes are counted as different substrings even they consist of same characters.
<br>
<b>Example 1</b>:
<pre>
<b>Input:</b> "abc"
<b>Output:</b> 3
<b>Explanation:</b> Three palindromic strings: "a", "b", "c".
</pre>
<b>Example 2:</b>
<pre>
<b>Input:</b> "aaa"
<b>Output:</b> 6
<b>Explanation:</b> Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
</pre>
Note: The input string length won't exceed 1000.
</details>
<details>
<summary>This Python 3 solution's runtime beats 93.72% of submissions.</summary>
An odd-length palindrome has a center character that is a palindrome. <code>s = 'bedededeb'</code> is an odd-length palindrome with center character 'd' at index 4. If you radiate outward, you find that the letters on opposite sides of the center are always the same:
<pre>
s[3] = s[5] = 'e'
s[2] = s[6] = 'd'
s[1] = s[7] = 'e'
s[0] = s[8] = 'b'
</pre>
An even-length palindrome has two center characters that are identical, which makes a palindrome. <code>s = 'deaaaaed'</code> is an even-length palindrome with center characters 'a' at indices 3 and 4. If you radiate outward, you find that the letters on opposite sides of the center are always the same:
<pre>
s[2] = s[5] = 'a'
s[1] = s[6] = 'e'
s[0] = s[7] = 'd'
</pre>
In this example, I'll walk through the test case <code>s = 'leet'</code>.
Iterate through the string. Each character is the center of an odd-length palindrome. Radiate outward until the index is out of bounds or the substring is no longer a palindrome. Every time a palindrome is found, increment the counter. 'l' is a palindrome, and there's nothing to the left of 'l'. 'e' is palindrome, but 'lee' isn't. 'e' is a palindrome, but 'eet' isn't. 't' is a palindrome, and there's nothing to the right of 't'. There are 4 odd-length palindromes. Iterate through the string again. Each pair of characters may or may not be the center of an even-length palindrome. Do the same as before, except this time look for even-length palindromes. 'le' isn't a palindrome. 'ee' is a palindrome but 'leet' isn't. 'et' isn't a palindrome. There's 1 even-length palindrome. Add up the number of odd-length and even-length palindromes to get 5. We could combine the odd-length and even-length palindrome searching functions into a single function that takes <code>(i, i)</code> for odd-length palindromes and <code>(i, j)</code> for even-length palindromes.
<pre>
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
</pre>
</details>
