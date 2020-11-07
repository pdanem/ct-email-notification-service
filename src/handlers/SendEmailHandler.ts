import { ScheduleEmailInput } from '../models/ScheduleEmailInput'
import { sendEmail } from './SendEmail'

export const handle = async (event: ScheduleEmailInput) => {
  return sendEmail(event)
}
