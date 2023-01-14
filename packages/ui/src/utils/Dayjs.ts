import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/es";

class Dayjs {
  private static instance: Dayjs;
  private _userTimezone: string;

  private constructor() {
    dayjs.extend(timezone);

    this._userTimezone = "America/Lima";
    dayjs.locale("es");
    dayjs.tz.setDefault(this._userTimezone);
  }

  public static getInstance(): Dayjs {
    if (!Dayjs.instance) {
      Dayjs.instance = new Dayjs();
    }

    return Dayjs.instance;
  }

  public formatMoney = (number: number): string => {
    const currencyFormatter = new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
    });

    return `${currencyFormatter.format(number)}`;
  };

  public dayjs = dayjs;
}

export default Dayjs.getInstance();
