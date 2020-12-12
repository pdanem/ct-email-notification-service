import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayEventRequestContextWithAuthorizer,
} from 'aws-lambda/common/api-gateway'
import AWS from 'aws-sdk'
import AWSMock from 'aws-sdk-mock'
import { cancelScheduledEmail } from './CancelScheduledEmail'

describe('cancelScheduledEmail', () => {
  it('cancels execution of step function', async () => {
    AWSMock.setSDKInstance(AWS)
    AWSMock.mock('StepFunctions', 'stopExecution', async () => {
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

    const result = await cancelScheduledEmail(event)
    expect(result).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
    })

    AWSMock.restore('StepFunctions')
  })

  it('returns status code 500 when an exception occurs', async () => {
    AWSMock.setSDKInstance(AWS)
    AWSMock.mock('StepFunctions', 'stopExecution', async () => {
      throw Error
    })
    const event = {
      body: JSON.stringify({
        arn: 'someArn',
      }),
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

    const result = await cancelScheduledEmail(event)
    expect(result.statusCode).toBe(500)
    AWSMock.restore('StepFunctions')
  })
})
