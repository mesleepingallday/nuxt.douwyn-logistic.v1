import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// Cấu hình dayjs
dayjs.extend(utc)
dayjs.extend(timezone)

export const useDate = () => {
  /**
   * Chuyển đổi ngày tháng ISO sang định dạng người dùng
   * @param isoDate - Ngày tháng gốc ở định dạng ISO (ví dụ: 2024-12-11T13:54:59.326Z)
   * @param format - Định dạng mong muốn (ví dụ: DD/MM/YYYY HH:mm)
   * @param timezone - Múi giờ mong muốn (mặc định: Asia/Bangkok)
   * @returns - Ngày tháng được định dạng
   */
  const formatDate = (isoDate: string, format: string = 'DD/MM/YYYY HH:mm', timezoneStr: string = 'Asia/Ho_Chi_Minh') => {
    return dayjs(isoDate).tz(timezoneStr).format(format)
  }

  return {
    formatDate
  }
}
