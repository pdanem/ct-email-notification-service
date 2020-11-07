import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import { scheduleEmail } from './ScheduleEmail'

export const handle: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  return scheduleEmail(event)
}
