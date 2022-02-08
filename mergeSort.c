#include <stdio.h>
#include <stdlib.h>

void printArray(int *a,int n);
void merge(int *A,int *L,int *R,int sizeOfLeft,int sizeOfRight);
void sort(int *arr,int n);

int main(){
    int arr[]={7,3,4,5,2,9,6,8};
    int size=sizeof(arr)/sizeof(arr[0]);
    sort(arr,size);
    printArray(arr,size);
}

void merge(int *A,int *L,int *R,int sizeOfLeft,int sizeOfRight){
    int i=0,j=0,k=0;

    while(i<sizeOfLeft && j<sizeOfRight){

        if(L[i]<R[j]) A[k++]=L[i++];

        else A[k++]=R[j++];
    }

    while(i<sizeOfLeft)A[k++]=L[i++];
    while(j<sizeOfRight) A[k++]=R[j++];
}

void sort(int *arr,int n){
    int mid = n/2;

    if(n<2) return;

    int *L = (int*) malloc(sizeof(int)*mid);
    int *R = (int*) malloc(sizeof(int)*n-mid);

    for(int i=0;i<mid;i++) L[i]=arr[i];
    for(int j=0;j<n-mid;j++) R[j]=arr[j+mid];

    sort(L,mid);
    sort(R,n-mid);

    merge(arr,L,R,mid,n-mid);

    free(L);
    free(R);
}

void printArray(int *a,int n){
    for(int i=0;i<n;i++) printf(" %d ",a[i]);
}
