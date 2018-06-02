#include <iostream>
#include "SortTestHelper.h"

using namespace std;

/**
 * 选择排序
 * @tparam T
 * @param ary
 * @param n
 */
template<typename T>
void selectionSort (T ary[], int n)
{
    for (int i = 0; i < n; i ++)
    {
        //1. 寻找[i, n)区间里的最小值
        int minIndex = i;
        for (int j = i + 1; j < n; j ++)
            if (ary[j] < ary[minIndex])
                minIndex = j;
        swap(ary[i], ary[minIndex]);
    }
}


int main()
{
    int n = 10000;
    int *ary = SortTestHelper::generateRandomArray(n, 0, n);
    selectionSort(ary, n);
    SortTestHelper::printArray(ary, n);

    delete[] ary;

    return 0;
}