export default class Utils {
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
}