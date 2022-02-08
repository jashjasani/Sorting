#include <stdio.h>
#include <bits/stdc++.h>
using namespace std;

void printArray(int arr[], int size);
void swap(int* a, int* b);
int partitionLowPivot (int arr[],int low,int high);
int partitionHighPivot(int arr[],int low,int high);
void quickSortHighPivot(int arr[], int low, int high);
void quickSortLowPivot(int arr[], int low, int high);


int main()
{
	int arr[] = {10, 7, 8, 9, 1, 5};
	int n = sizeof(arr) / sizeof(arr[0]);
    char choice;
    printf("Choices \n1) L -> low pivot implementation \n2) H -> High pivot implementation\n");
    printf("\nEnter choice : ");
    scanf("%c",&choice);
    switch(choice){
    case 'h':
    case 'H':
        printf("\nHigh pivot implementation : \n");
        quickSortHighPivot(arr,0,n-1);
        cout << "\nSorted array: \n";
        printArray(arr,n);
        break;
    case 'l' :
    case 'L' :
        printf("\nLow pivot implementation : \n\n");
        quickSortLowPivot(arr,0,n-1);
        cout << "\nSorted array: \n";
        printArray(arr,n);
        break;
    }
	return 0;
}

int partitionLowPivot (int arr[],int low,int high){
    int pivot=arr[low];
    int j=high+1;
    printArray(arr,6);
    for(int i=high;i>0;i--){
        if(arr[i]>pivot){
            j--;
            swap(&arr[i],&arr[j]);
        }
        printf(" j = %d  i= %d \n",j,i);
    }
    swap(&arr[j-1],&arr[low]);
    return (j-1);
}

int partitionHighPivot(int arr[],int low,int high){
    int pivot=arr[high];
    int i =  (low-1);
    printArray(arr,6);
    for(int j=low;j<=high-1;j++){
        if(arr[j]<pivot){
            i++;
            swap(&arr[i],&arr[j]);
        }
        printf(" j = %d  i= %d \n",j,i);
    }
    swap(&arr[i+1],&arr[high]);
    return (i+1);
}

void quickSortLowPivot(int arr[], int low, int high)
{
	if (low < high)
	{
		int pi = partitionLowPivot(arr, low, high);
		quickSortLowPivot(arr, low, pi - 1);
		quickSortLowPivot(arr, pi + 1, high);
	}
}
void quickSortHighPivot(int arr[], int low, int high)
{
	if (low < high)
	{
		int pi = partitionHighPivot(arr, low, high);
		quickSortHighPivot(arr, low, pi - 1);
		quickSortHighPivot(arr, pi + 1, high);
	}
}

void swap(int* a, int* b)
{
	int t = *a;
	*a = *b;
	*b = t;
}


void printArray(int arr[], int size)
{
	int i;
	for (i = 0; i < size; i++)
		cout << arr[i] << " ";
	cout << endl;
}
