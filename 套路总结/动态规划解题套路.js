/* 
首先，动态规划问题的一般形式就是求最值。动态规划其实是运筹学的一种最优化方法，
只不过在计算机问题上应用比较多，比如说让你求最长递增子序列呀，最小编辑距离呀等等。
既然是要求最值，核心问题是什么呢？求解动态规划的核心问题是穷举。因为要求最值，肯定要把所有可行的答案穷举出来，然后在其中找最值呗。
! 对动态规划问题，直接套我们以前多次强调的框架即可：
! 这个问题有什么「状态」，有什么「选择」，然后穷举。


! 前文「最长公共子序列」说过，解决两个字符串的动态规划问题，
! 一般都是用两个指针 i,j 分别指向两个字符串的最后，然后一步步往前走，缩小问题的规模。



*不知道读者有没有发现，有关动态规划的问题，大多是让你求最值的，
*比如最长子序列，最小编辑距离，最长公共子串等等等。
*这就是规律，因为动态规划本身就是运筹学里的一种求最值的算法。

首先，动态规划的穷举有点特别，因为这类问题存在「重叠子问题」，
如果暴力穷举的话效率会极其低下，所以需要「备忘录」或者「DP table」来优化穷举过程，
避免不必要的计算。
! 而且，动态规划问题一定会具备「最优子结构」，才能通过子问题的最值得到原问题的最值。
* 只有列出正确的「状态转移方程」才能正确地穷举。
*/

/* 
! 动态规划三要素。
! 1.重叠子问题
! 2.最优子结构
! 3.状态转移方程 (一般比较难)
*/
//! 我来提供我研究出来的一个思维框架，辅助你思考状态转移方程：
// * 明确 base case -> 明确「状态」-> 明确「选择」 -> 定义 dp 数组/函数的含义。

/* 
! PS：但凡遇到需要递归的问题，最好都画出递归树，
! 这对你分析算法的复杂度，寻找算法低效的原因都有巨大帮助。
*/
/* 
?    初始化 base case
?    dp[0][0][...] = base
?    # 进行状态转移
?    for 状态1 in 状态1的所有取值：
?        for 状态2 in 状态2的所有取值：
?             for ...
?                 dp[状态1][状态2][...] = 求最值(选择1，选择2...)
 */

/* 
!带备忘录的递归解法  ---进行存储
一般使用一个数组充当这个「备忘录」，当然你也可以使用哈希表（字典），思想都是一样的。
*/
function fib(N) {
  let dp=new Array(N).fill(0)
  // base case
  dp[1] = dp[2] = 1;
  for (let i = 3; i <= N; i++)
      dp[i] = dp[i - 1] + dp[i - 2];
  return dp[N];
}
/* 
至此，带备忘录的递归解法的效率已经和迭代的动态规划解法一样了。
实际上，这种解法和迭代的动态规划已经差不多了，只不过这种方法叫做「自顶向下」，动态规划叫做「自底向上」。
? 啥叫「自顶向下」？
   注意我们刚才画的递归树（或者说图），是从上向下延伸，都是从一个规模较大的原问题比如说 f(20)，
   向下逐渐分解规模，直到 f(1) 和 f(2) 这两个 base case，然后逐层返回答案，这就叫「自顶向下」。
? 啥叫「自底向上」？
   反过来，我们直接从最底下，最简单，问题规模最小的 f(1) 和 f(2) 开始往上推，直到推到我们想要的答案 f(20)，
   这就是动态规划的思路，这也是为什么动态规划一般都脱离了递归，而是由循环迭代完成计算。
*/


// ! 状态压缩？  比如斐波那契数列，其实不需要一整个数组来存储值，只需要存储之前的两个状态不断叠加即可
// !             最后的空间复杂度就从O(N)  ---> O(1)

function fib(n) {
  if (n == 2 || n == 1) 
      return 1;
  let prev = 1, curr = 1;
  for (let i = 3; i <= n; i++) {
      let sum = prev + curr;
      prev = curr;
      curr = sum;
  }
  return curr;
}


//! 最优子结构
//  例如最少硬币问题
// 因为硬币的数量是没有限制的，所以子问题之间没有相互制，是互相独立的。

// dp 数组的定义：当目标金额为 i 时，至少需要 dp[i] 枚硬币凑出。
// 核心: 计算每增加一步的可能性，取最小值
function coinChange(coins,amount) {
  // 数组大小为 amount + 1，初始值也为 amount + 1
  // var dp = Array.from({length:amount+1}, (val,key)=>key);
  var dp =new Array(amount+1).fill(amount+1);
  console.log(dp);
  // base case
  dp[0] = 0;
  // 外层 for 循环在遍历所有状态的所有取值
  for (let i = 0; i < dp.length; i++) {
      // 内层 for 循环在求所有选择的最小值
      for (let coin of coins) { //[1,2,5]
          // 子问题无解，跳过
          // 每增加一块钱，都判断一下，如果没有零钱找，就跳过，有则取最小值
          if (i - coin < 0) continue;
          dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
  }
  console.log(dp);
/* 
[
  0, 1, 1, 2, 2,
  1, 2, 2, 3, 3,
  2, 3
]
*/ 
// 如果有解，必然不相等
  return (dp[amount] == amount + 1) ? -1 : dp[amount];
}
// console.log(coinChange([1,2,5],11));
console.log(coinChange([1],0));



/* 
计算机解决问题其实没有任何奇技淫巧，它唯一的解决办法就是穷举，穷举所有可能性。
算法设计无非就是先思考“如何穷举”，然后再追求“如何聪明地穷举”。
列出动态转移方程，就是在解决“如何穷举”的问题。之所以说它难，
一是因为很多穷举需要递归实现，
二是因为有的问题本身的解空间复杂，不那么容易穷举完整。
备忘录、DP table 就是在追求“如何聪明地穷举”。用空间换时间的思路，是降低时间复杂度的不二法门，
除此之外，试问，还能玩出啥花活？
*/