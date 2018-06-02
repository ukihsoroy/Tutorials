//
// Created by Administrator on 2018/6/2.
//

#ifndef ARITHMETIC_DATASTRUCTURE_SORTTESTHELPER_H
#define ARITHMETIC_DATASTRUCTURE_SORTTESTHELPER_H

#include <iostream>
#include <ctime>
#include <cassert>

using namespace std;

namespace SortTestHelper
{
    /**
     * 生成有n个元素的随机数组, 每个元素的随机范围为[rangeL, rangeR]
     * @param n 数组长度
     * @param rangeL 最小
     * @param rangeR 最大
     * @return
     */
    int* generateRandomArray (int n, int rangeL, int rangeR) {

        assert( rangeL <= rangeR);
        int *arr = new int[n];
        srand(time(NULL));
        for (int i = 0; i < n; ++i) {
            arr[i] = rand() % ( rangeR - rangeL + 1 ) + rangeL;
        }
        return arr;
    }

    template<typename T>
    void printArray (T ary[], int n)
    {
        for (int i = 0; i < n; i ++)
            cout << ary[i] << " ";
        cout << endl;

        return;
    }

}


#endif //ARITHMETIC_DATASTRUCTURE_SORTTESTHELPER_H
