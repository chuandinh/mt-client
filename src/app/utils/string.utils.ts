export class StringUtils {
    static isInteger(str: string): boolean {
      const integerRegExp = /^[-+]?\d+$/;
      return integerRegExp.test(str);
    }
  
    static stringToInt(str: string): number {
      const num = parseInt(str, 10);
      if (isNaN(num)) {
        return 0;
      }
      return num;
    }
  
    static isNumber(str: string): boolean {
      return !isNaN(parseInt(str, 10)) || !isNaN(parseFloat(str));
    }

    static getCurrentDateTime(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
      
        return `${year}${month}${day}${hours}${minutes}`;
    }   
  }
  