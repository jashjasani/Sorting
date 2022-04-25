class MergeSort{
	public static void main(String[] args){
		int[] a={5,4,3,2,1};
		sort(a);
		printArr(a);
	
	}
	public static void sort(int[] a){
		int mid = (a.length)/2;
		if(a.length<2) return;

		int[] L = new int[mid];
		int[] R = new int[a.length-mid];

		for(int i=0;i<mid;i++) L[i]=a[i];
		for(int j=0;j<a.length-mid;j++) R[j]=a[j+mid];
		printArr(L);
		printArr(R);
		sort(L);
		sort(R);

		merge(a,L,R);
		printArr(a);
	}
	public static void merge(int[] a,int[] L,int[] R){
		int i=0,j=0,k=0;
		while(i<L.length && j<R.length){
			if(L[i]<R[j]) a[k++]=L[i++];

			else a[k++]=R[j++];
		}
		
		while(i<L.length) a[k++]=L[i++];
		while(j<R.length) a[k++]=R[j++];
	}
	public static void printArr(int[] a){
		for(int i=0;i<a.length;i++){
			System.out.print(a[i]+" ");
		}
		System.out.println(" ");
	}
}