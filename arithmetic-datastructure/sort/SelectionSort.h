//
// Created by K.O on 2018/6/3.
//

#ifndef ARITHMETIC_DATASTRUCTURE_SELECTIONSORT_H
#define ARITHMETIC_DATASTRUCTURE_SELECTIONSORT_H

#include <iostream>

using namespace std;

/**
 * 选择排序
 * @param ary
 * @param n
 */
template <typename T>
void selectionSort (T ary[], int n)
{
    for (int i = 0; i < n; i ++)
    {
        // 1. 寻找[i, n) 区间里的最小值
        int minIndex = i;
        for (int j = i + 1; j < n; j ++)
        {
            // 2. 如果当前的值小于ary[j], 记录j的索引到minIndex
            if (ary[j] < ary[minIndex])
            {
                minIndex = j;
            }
        }
        //3. 交换值
        swap(ary[i], ary[minIndex]);

    }
}

#endif //ARITHMETIC_DATASTRUCTURE_SELECTIONSORT_H
