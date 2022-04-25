class InsertionSort{
	public static void main(String[] args){
		int[] a={4,5,2,3,1};
		insertionSort(a);
	}

	public static void insertionSort(int[] a){
		int key,j;
		for(int i=1;i<a.length;i++){
		
			key=a[i];
			j=i-1;
			while(j>=0 && a[j]>key){
				a[j+1]=a[j];
				j--;
			}
			a[j+1]=key;
			printArr(a);
		}
	}
	public static void printArr(int[] a){
		for(int i=0;i<a.length;i++){
			System.out.print(a[i]+" ");
		}
		System.out.println(" ");
	}

}