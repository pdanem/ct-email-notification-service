import { SES } from 'aws-sdk'
import { EmailDetails } from '../models/EmailDetails'
import { ScheduleEmailInput } from '../models/ScheduleEmailInput'

const { SENDER_EMAIL_ADDRESS } = process.env

export const sendEmail = async (event: ScheduleEmailInput) => {
  const email: EmailDetails = {
    ...event.email,
  }

  try {
    const result = await send(email)
    console.log('Email reminder sent!', email)
    return result
  } catch (error) {
    return error
  }
}

const send = async (email: EmailDetails) => {
  const Ses = new SES()
  const params: SES.SendEmailRequest = {
    Destination: {
      ToAddresses: email.to,
    },
    Message: {
      Subject: {
        Data: email.subject,
      },
      Body: {
        Html: {
          Data: email.htmlBody ?? email.textBody ?? '',
        },
        Text: {
          Data: email.htmlBody ?? email.textBody ?? '',
        },
      },
    },
    Source: SENDER_EMAIL_ADDRESS ?? '',
  }

  return Ses.sendEmail(params).promise()
}
