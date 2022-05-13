<?php
/* Q1   *
        **
        ***
        ****
        *****   ❔ */

// for ($i = 1; $i <= 5; $i++) {
//     for ($j = 1; $j <= $i; $j++) {
//         echo "*";
//     }
//     echo "</br>";
// }

/* Q2.Check whether an iput is palindrome or not ex. "level" is palindrome ❔ */

// function isPalin($str){
//     if(strrev($str) == $str){
//     return "is plaindrome";
// }else{
//     return "not a palindrome";
// }
// }
// echo isPalin("level");

/* Q3. ❔

Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
*/


// function removeDuplicates( &$nums ) {
//    $unique = array_unique($nums);
//    return $unique;
// }

// $nums = [0,0,1,1,1,2,2,3,3,4];
// $k = 0;
// print_r(removeDuplicates($nums));
// //count the number of unique elements in the array
// $k = count(removeDuplicates($nums));
// echo $k;


 function removeDuplicates($nums) {
        // Length of the updated array
        $count = 0;
        // Loop for all the elements in the array
        for ( $i = 0; $i < count($nums); $i++) {
            // If the current element is equal to the next element, we skip
            if ($i < count($nums) - 1 && $nums[$i] == $nums[$i + 1]) {
                continue;
            }
            // We will update the array in place
            $nums[$count] = $nums[$i];
            $count ++;
        }
        return $count;
    };
    echo removeDuplicates([0,0,1,1,1,2,2,3,3,4]);

// Wrte function that return the average of 3 highest grades as an integer. The function takes the 5 subjects grades as parameters ❔

function best_three($sub1, $sub2, $sub3, $sub4, $sub5){
    //first check grades if grades are below 0 return -1 and if grades are above 100 return -2
    if ($sub1 < 0 || $sub2 < 0 || $sub3 < 0 || $sub4 < 0 || $sub5 < 0){
        return -1;
    }
    else if ($sub1 > 100 || $sub2 > 100 || $sub3 > 100 || $sub4 > 100 || $sub5 > 100){
        return -2;
    }
    else{
        $grades = array($sub1, $sub2, $sub3, $sub4, $sub5);
        rsort($grades);
        //take average and return as interger
        $average = ($grades[0] + $grades[1] + $grades[2]) / 3;
        return $average;
    }
}
echo best_three(10, 20, 30, 40, 50);
