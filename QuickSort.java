class QuickSort{
	public static void main(String[] args){
		int[] a={5,3,4,2,1};
		printArr(a);
		quickSort(a,0,a.length-1);
		printArr(a);
	}
	public static void quickSort(int[] a,int low, int high){
		if(low<high){
			int pi = partition(a,low,high);
			quickSort(a,low,pi-1);
			quickSort(a,pi+1,high);
		}
	}
	public static int partition(int[] a,int low,int high){
		int pivot = a[high];
		int i=-1,temp;
		printArr(a);
		for(int j=0;j<=high-1;j++){
			if(pivot>a[j]){
				i++;
				temp=a[j];
				a[j]=a[i];
				a[i]=temp;
			}
			System.out.println("i="+i+" "+"j="+j);
		}
		temp=a[i+1];
		a[i+1]=a[high];
		a[high]=temp;

		return(i+1);
	}
	public static void printArr(int[] a){
		for(int i=0;i<a.length;i++){
			System.out.print(a[i]+" ");
		}
		System.out.println("");
	}
}