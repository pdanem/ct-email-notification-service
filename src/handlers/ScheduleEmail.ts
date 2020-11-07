import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { StepFunctions } from 'aws-sdk'
import { ScheduleEmailInput } from '../models/ScheduleEmailInput'
import { ScheduleEmailReponse } from '../models/ScheduleEmailResponse'

const stepFunctions = new StepFunctions()

export const scheduleEmail = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const requestBody = JSON.parse(event.body ?? '') as ScheduleEmailInput
  const EmailSchedulingStateMachineArn =
    process.env.EMAIL_SCHEDULING_STATE_MACHINE_ARN ?? ''

  try {
    const result = await stepFunctions
      .startExecution({
        stateMachineArn: EmailSchedulingStateMachineArn,
        input: JSON.stringify(requestBody),
      })
      .promise()

    console.log('Email scheduling state machine has been initiated', result)
    return {
      statusCode: 200,
      body: JSON.stringify({
        arn: result.executionArn,
      } as ScheduleEmailReponse),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
