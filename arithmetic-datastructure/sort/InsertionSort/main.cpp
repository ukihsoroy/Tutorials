#include <iostream>




using namespace std;

template <typename T>
void insertionSort (T ary[], int n)
{
    for (int i = 1; i < n; i ++) {

        //1. 寻找元素ary[i]合适的插入位置
        for (int j = i; j > 0 && ary[j - 1] > ary[j]; j --) {
            swap(ary[j], ary[j-1]);
        }
    }
}







int main() {
    return 0;
}