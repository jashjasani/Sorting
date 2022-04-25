class BubbleSort{
	public static void main(String a[]){
		int[] arr={5,4,2,3,1};
		bubbleSort(arr);		
	}
	
	public static void bubbleSort(int[] a){
		for(int i=0;i<a.length;i++){
			int temp;
			printArr(a);
			for(int j=0;j<a.length-i-1;j++){
				if(a[j]>a[j+1]){
					temp=a[j];
					a[j]=a[j+1];
					a[j+1]=temp;
				}
			}
		
		}
	}
	public static void printArr(int[] a){
		for(int i=0;i<a.length;i++){
			System.out.print(a[i]);
		}
		System.out.println("");
	}
}