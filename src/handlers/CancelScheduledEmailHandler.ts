import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'
import { cancelScheduledEmailHandler } from './CancelScheduledEmail'

export const handle: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  return cancelScheduledEmailHandler(event)
}
