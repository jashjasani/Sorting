#include <iostream>
using namespace std;

void swap(int* a,int* b);
void selectionSort(int arr[],int size);
void printArray(int arr[],int size);
int main()
{
    int arr[]={5,3,7,2,8};
    int size=sizeof(arr)/sizeof(arr[0]);
    selectionSort(arr,size);
    printf("Sorted array : ");
    printArray(arr,size);
    return 0;
}

void printArray(int arr[],int size){
    for(int i=0;i<size;i++){
        printf("%d ",arr[i]);
    }
    printf("\n");
}
void selectionSort(int arr[],int size){
    int min_index;
    for(int i=0;i<size;i++){
        min_index=i;
        for(int j=i+1;j<size;j++){
            if(arr[j]<arr[min_index]){
                min_index=j;
            }
        }
        printArray(arr,size);
        swap(&arr[min_index],&arr[i]);
    }
}

void swap(int* a,int* b){
    int temp=*a;
    *a=*b;
    *b=temp;
}
