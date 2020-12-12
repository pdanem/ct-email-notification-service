import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import { cancelScheduledEmail } from './CancelScheduledEmail'

export const handle: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  return cancelScheduledEmail(event)
}
