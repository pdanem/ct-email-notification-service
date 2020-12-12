import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy'
import { StepFunctions } from 'aws-sdk'
import { CancelScheduledEmailInput } from '../models/CancelScheduledEmailInput'

export const cancelScheduledEmail = async (event: APIGatewayProxyEvent) => {
  const stepFunctions = new StepFunctions()
  const requestBody = JSON.parse(event.body ?? '') as CancelScheduledEmailInput

  try {
    const result = await stepFunctions
      .stopExecution({
        executionArn: requestBody.arn,
      } as StepFunctions.StopExecutionInput)
      .promise()

    console.log(
      'Email scheduling state machine execution has been stopped',
      result
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
