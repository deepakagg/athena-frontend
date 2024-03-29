export default class Utils {
    static getRouteInfo(navTree: any, path: any): any {
		if( navTree.path === path ){
		  return navTree;
		}
		let route; 
		for (let p in navTree) {
		  if( navTree.hasOwnProperty(p) && typeof navTree[p] === 'object' ) {
				route = this.getRouteInfo(navTree[p], path);
				if(route){
					return route;
				}
		  }
		}
		return route;
	}	
    
    static getColorContrast(hex: any){
		if(!hex) {
			return 'dark'
		}
		const threshold = 130;
		const hRed = hexToR(hex);
		const hGreen = hexToG(hex);
		const hBlue = hexToB(hex);
		function hexToR(h: any) {return parseInt((cutHex(h)).substring(0,2),16)}
		function hexToG(h: any) {return parseInt((cutHex(h)).substring(2,4),16)}
		function hexToB(h: any) {return parseInt((cutHex(h)).substring(4,6),16)}
		function cutHex(h: string) {return (h.charAt(0) === '#') ? h.substring(1,7):h}
		const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
		if (cBrightness > threshold){
			return 'dark'
		} else { 
			return 'light'
		}	
	}

	static wildCardSearch(list: any[], input: { toString: () => string; }) {
		const searchText = (item: { [x: string]: { toString: () => string; }; }) => {
			for (let key in item) {
				if (item[key] == null) {
					continue;
				}
				if (item[key].toString().toUpperCase().indexOf(input.toString().toUpperCase()) !== -1) {
					return true;
				}
			}
		};
		list = list.filter(value => searchText(value));
		return list;
	}

	static deleteArrayRow(list: any[], key: string, value: any) {
		let data = list
		if(list) {
			data = list.filter(item => item[key] !== value)
		}
		return data
	}
}