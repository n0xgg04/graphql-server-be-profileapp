import BaseException from '@/common/exceptions/handler/BaseException'
import HttpStatusCode from '@/common/constants/HttpStatusCode'
import { ErrorDetail } from '@/common/interface/Error'

export default class BadRequestException extends BaseException {
  constructor(description: string | ErrorDetail) {
    super({
      description,
      statusCode: HttpStatusCode.BAD_REQUEST,
    })
  }
}
