import AWS from 'aws-sdk'
import AWSMock from 'aws-sdk-mock'
import { sendEmail } from './SendEmail'

describe('sendEmail', () => {
  it('sends email with the provided parameters from payload', async () => {
    let sendEmailCalled = false
    AWSMock.setSDKInstance(AWS)
    AWSMock.mock('SES', 'sendEmail', async () => {
      sendEmailCalled = true
      return {
        statusCode: 200,
        body: '',
      }
    })

    await sendEmail({
      email: {
        to: ['test@email.com'],
        subject: 'Test Subject',
        textBody: 'Sample Text Body',
        htmlBody: '',
      },
    })
    expect(sendEmailCalled).toBeTruthy()
  })
})
