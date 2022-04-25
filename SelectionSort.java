class SelectionSort{
	public static void main(String args[]){
		int[] arr= {4,5,2,3,1};
		selectionSort(arr);
		for(int i=0;i<arr.length;i++){
			System.out.println(arr[i]);
		}
		
	}	
	public static void selectionSort(int[] a){
		for(int i=0;i<a.length;i++){
			int min=i,temp;
			printArr(a);
			for(int j=i;j<a.length;j++){
				if(a[min]>a[j]){
				min=j;
				}
			}

			temp=a[i];
			a[i]=a[min];
			a[min]=temp;
		}
	}

	public static void printArr(int[] a){
		for(int i=0;i<a.length;i++){
			System.out.print(a[i]+" ");
		}
		System.out.println(" ");
	}
}










