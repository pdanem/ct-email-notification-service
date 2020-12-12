import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayEventRequestContextWithAuthorizer,
} from 'aws-lambda/common/api-gateway'
import AWS from 'aws-sdk'
import AWSMock from 'aws-sdk-mock'
import { scheduleEmail } from './ScheduleEmail'

describe('scheduleEmail', () => {
  it('starts execution of step function and returns execution arn', async () => {
    AWSMock.setSDKInstance(AWS)
    AWSMock.mock('StepFunctions', 'startExecution', async () => {
      return {
        executionArn: 'testExecutionArn',
      }
    })
    const event = {
      body: JSON.stringify({}),
      headers: {
        Authorization: '',
      },
      httpMethod: 'GET',
      isBase64Encoded: false,
      path: '',
      pathParameters: {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: {},
      multiValueHeaders: {},
      resource: '',
      requestContext: {} as APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>,
    }

    const result = await scheduleEmail(event)
    expect(result).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify({
        arn: 'testExecutionArn',
      }),
    })

    AWSMock.restore('StepFunctions')
  })

  it('returns status code 500 when an exception occurs', async () => {
    AWSMock.setSDKInstance(AWS)
    AWSMock.mock('StepFunctions', 'startExecution', async () => {
      throw Error
    })
    const event = {
      body: JSON.stringify({}),
      headers: {
        Authorization: '',
      },
      httpMethod: 'GET',
      isBase64Encoded: false,
      path: '',
      pathParameters: {},
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: {},
      multiValueHeaders: {},
      resource: '',
      requestContext: {} as APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>,
    }

    const result = await scheduleEmail(event)
    expect(result.statusCode).toBe(500)
    AWSMock.restore('StepFunctions')
  })
})
